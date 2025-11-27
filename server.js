#!/usr/bin/env node
/**
 * This is a simple wrapper to run the API server directly with Node.js
 * It changes the working directory to the API folder and runs the compiled server
 */

const path = require('path');
const { spawn } = require('child_process');

// Change to the API directory
const apiDir = path.join(__dirname, 'apps', 'api');

console.log('Starting API server...');
console.log('API directory:', apiDir);

// Check if we need to build first
const fs = require('fs');
const distPath = path.join(apiDir, 'dist', 'server.js');

if (!fs.existsSync(distPath)) {
  console.log('Building API server first...');
  const buildProcess = spawn('npm', ['run', 'build'], {
    cwd: apiDir,
    stdio: 'inherit',
    shell: true
  });

  buildProcess.on('close', (code) => {
    if (code !== 0) {
      console.error('Build failed with code', code);
      process.exit(code);
    }
    startServer();
  });
} else {
  startServer();
}

function startServer() {
  // Run the compiled server
  const serverProcess = spawn('node', ['dist/server.js'], {
    cwd: apiDir,
    stdio: 'inherit',
    shell: true
  });

  serverProcess.on('close', (code) => {
    console.log('Server exited with code', code);
    process.exit(code);
  });

  // Handle termination signals
  process.on('SIGINT', () => {
    console.log('\nShutting down server...');
    serverProcess.kill('SIGINT');
  });

  process.on('SIGTERM', () => {
    serverProcess.kill('SIGTERM');
  });
}
