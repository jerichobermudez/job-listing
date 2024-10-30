import { useState, useEffect } from 'react';

interface Job {
  id: number;
  company: string;
  position: string;
  role: string;
  level: string;
  contract: string;
  location: string;
  languages: string[];
  tools: string[];
}

const useFetchJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs');

        if (!response.ok) throw new Error('Something went wrong!');

        const data = await response.json();

        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);

        setError('Failed to fetch jobs');
      }
    };

    fetchJobs();
  }, []);

  return { jobs, error };
};

export default useFetchJobs;