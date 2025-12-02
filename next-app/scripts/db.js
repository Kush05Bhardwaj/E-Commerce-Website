#!/usr/bin/env node

/**
 * Database Management Script
 * Run with: npm run db:init or npm run db:seed
 */

const { initializeDatabase } = require('./src/lib/db/init');
const { seedDatabase } = require('./src/lib/db/seed');

const command = process.argv[2];

async function main() {
  try {
    switch (command) {
      case 'init':
        console.log('🔄 Initializing database...');
        await initializeDatabase();
        break;

      case 'seed':
        console.log('🌱 Seeding database...');
        await seedDatabase();
        break;

      case 'reset':
        console.log('🔄 Resetting database...');
        await initializeDatabase();
        await seedDatabase();
        break;

      default:
        console.log('📖 Usage:');
        console.log('  npm run db:init  - Initialize database schema');
        console.log('  npm run db:seed  - Seed database with sample data');
        console.log('  npm run db:reset - Reset and seed database');
        process.exit(1);
    }

    console.log('✅ Done!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();
