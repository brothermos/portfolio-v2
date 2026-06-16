export type WorkContent = {
  number: string;
  title: string;
  company: string;
  description: string;
  tech: string[];
  sortOrder: number;
  published: boolean;
};

export type WorksResult =
  | { source: 'database'; data: WorkContent[] }
  | { source: 'fallback'; data: WorkContent[]; warning?: string };
