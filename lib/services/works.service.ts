import { fallbackWorks } from '../data/works.fallback.js';
import { getPublishedWorksFromDatabase } from '../data/works.repository.js';
import type { WorksResult } from '../models/works.types.js';

export const getWorksContent = async (): Promise<WorksResult> => {
  try {
    const dbWorks = await getPublishedWorksFromDatabase();
    if (dbWorks?.length) {
      return { source: 'database', data: dbWorks };
    }

    return { source: 'fallback', data: fallbackWorks };
  } catch (error) {
    return {
      source: 'fallback',
      data: fallbackWorks,
      warning: error instanceof Error ? error.message : 'Failed to read from database',
    };
  }
};
