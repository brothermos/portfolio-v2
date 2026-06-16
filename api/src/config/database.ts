import pg from 'pg';

const { Pool } = pg;

let pool: InstanceType<typeof Pool> | undefined;

export const getPool = (): InstanceType<typeof Pool> | null => {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'development' ? false : { rejectUnauthorized: false },
    });
  }

  return pool;
};
