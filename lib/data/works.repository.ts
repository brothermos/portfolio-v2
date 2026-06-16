import { getPool } from '../config/database.js';
import type { WorkContent } from '../models/works.types.js';

export const getPublishedWorksFromDatabase = async (): Promise<WorkContent[] | null> => {
  const client = getPool();
  if (!client) {
    return null;
  }

  const result = await client.query<WorkContent>(
    `SELECT
      number,
      title,
      company,
      description,
      tech,
      sort_order AS "sortOrder",
      published
    FROM works
    WHERE published = true
    ORDER BY sort_order ASC`,
  );

  return result.rows;
};
