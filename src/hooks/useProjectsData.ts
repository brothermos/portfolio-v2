import { useEffect, useState } from 'react';
import {
  PROJECTS,
  PROJECT_CONTENT_FALLBACK,
  mergeProjectsWithContent,
  type Project,
  type ProjectContent,
} from '@/data/projects';

type WorksApiResponse = {
  data?: ProjectContent[];
};

const parseWorksResponse = (payload: unknown): ProjectContent[] | null => {
  if (Array.isArray(payload)) {
    return payload as ProjectContent[];
  }

  if (payload && typeof payload === 'object' && Array.isArray((payload as WorksApiResponse).data)) {
    return (payload as WorksApiResponse).data ?? null;
  }

  return null;
};

const useProjectsData = () => {
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/works', { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Failed to fetch works: ${response.status}`);
        }

        const payload = await response.json();
        const content = parseWorksResponse(payload);
        if (!content?.length) {
          throw new Error('Works response does not contain data');
        }

        setProjects(mergeProjectsWithContent(content));
      } catch {
        setProjects(mergeProjectsWithContent(PROJECT_CONTENT_FALLBACK));
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProjects();

    return () => controller.abort();
  }, []);

  return { projects, loading };
};

export default useProjectsData;
