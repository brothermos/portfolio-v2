import pg from 'pg';

const { Pool } = pg;

type WorkContent = {
  number: string;
  title: string;
  company: string;
  description: string;
  tech: string[];
  sortOrder: number;
  published: boolean;
};

type ApiRequest = {
  method?: string;
};

type ApiResponse = {
  setHeader: (name: string, value: string) => void;
  status: (statusCode: number) => {
    json: (body: unknown) => void;
  };
};

const fallbackWorks: WorkContent[] = [
  {
    number: '01',
    title: 'FINOVA',
    company: 'Odd-e Thailand × TTB Bank',
    description: "Core banking web app replacing a legacy system for TTB Bank's financial operations",
    tech: ['React', 'TypeScript'],
    sortOrder: 1,
    published: true,
  },
  {
    number: '02',
    title: 'Corporate Value Up',
    company: 'Odd-e Thailand × SET',
    description: "Multi-step form platform under the Stock Exchange of Thailand's Corporate Value Up initiative",
    tech: ['React', 'TypeScript'],
    sortOrder: 2,
    published: true,
  },
  {
    number: '03',
    title: 'LiVE Exchange',
    company: 'Odd-e Thailand × SET',
    description: 'Digital fundraising platform supporting SMEs and startups listed on SET',
    tech: ['Next.js', 'TypeScript'],
    sortOrder: 3,
    published: true,
  },
  {
    number: '04',
    title: 'SET LiVE Platform',
    company: 'Odd-e Thailand × SET',
    description: 'Full UI revamp of the LiVE Platform with mobile-first responsive design',
    tech: ['Next.js', 'TypeScript'],
    sortOrder: 4,
    published: true,
  },
  {
    number: '05',
    title: 'BKK FOOD BANK',
    company: 'BKK FOOD BANK',
    description:
      'Developed a web application for managing food donations and distributions to underprivileged communities, using React, Typescript',
    tech: ['React', 'TypeScript'],
    sortOrder: 5,
    published: true,
  },
  {
    number: '06',
    title: 'INSKRU',
    company: 'INSKRU.com',
    description:
      'Educational community platform for teachers to share classroom ideas and resources',
    tech: ['Next.js', 'TypeScript'],
    sortOrder: 6,
    published: true,
  },
  {
    number: '07',
    title: 'SKL (Siam Kubota Leasing)',
    company: 'Dosetech Co., Ltd.',
    description: 'Website for agricultural and construction machinery loans and leasing services',
    tech: ['Vue.js', 'LIFF'],
    sortOrder: 7,
    published: true,
  },
];

let pool: InstanceType<typeof Pool> | undefined;

const getPool = (): InstanceType<typeof Pool> | null => {
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

const getWorksFromDatabase = async (): Promise<WorkContent[] | null> => {
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

export default async function handler(req: ApiRequest, res: ApiResponse): Promise<void> {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const dbWorks = await getWorksFromDatabase();
    if (dbWorks?.length) {
      res.status(200).json({ source: 'database', data: dbWorks });
      return;
    }

    res.status(200).json({ source: 'fallback', data: fallbackWorks });
  } catch (error) {
    res.status(200).json({
      source: 'fallback',
      data: fallbackWorks,
      warning: error instanceof Error ? error.message : 'Failed to read from database',
    });
  }
}
