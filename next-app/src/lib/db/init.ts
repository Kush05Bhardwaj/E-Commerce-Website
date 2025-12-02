import { readFileSync } from 'fs';
import { join } from 'path';
import { query } from './config';

export const initializeDatabase = async () => {
  try {
    console.log('🔄 Initializing PostgreSQL database...');
    
    const schemaPath = join(process.cwd(), 'src', 'lib', 'db', 'schema.sql');
    const schema = readFileSync(schemaPath, 'utf-8');
    
    await query(schema);
    
    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize database:', error);
    throw error;
  }
};

export const healthCheck = async () => {
  try {
    const result = await query('SELECT NOW() as now');
    return {
      status: 'healthy',
      timestamp: result.rows[0].now,
      message: 'Database connection successful'
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
