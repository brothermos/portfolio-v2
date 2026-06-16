import { fallbackWorks } from '../data/works.fallback';
import { getPublishedWorksFromDatabase } from '../data/works.repository';
import type { WorksResult } from '../models/works.types';

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
