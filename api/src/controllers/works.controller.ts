import { getWorksContent } from '../services/works.service';
import type { ApiRequest, ApiResponse } from '../types/http.types';

export const worksHandler = async (req: ApiRequest, res: ApiResponse): Promise<void> => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const result = await getWorksContent();
  res.status(200).json(result);
};
