import React, { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';
import SearchInput from '../components/SearchInput';

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

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    // Get jobs api
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        const data = await response.json();

        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  // Add filter on click
  const addFilter = (filter: string) => {
    if (!filters.includes(filter)) {
      setFilters([...filters, filter]);
    }
  };

  // Remove search filter
  const removeFilter = (filter: string) => {
    setFilters(filters.filter((f) => f !== filter));
  };

  // Clear search input
  const clearFilters = () => {
    setFilters([]);
    setSearchText('');
  };

  // Search on enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === 'Enter' &&
      searchText.trim() !== ''
    ) {
      addFilter(searchText.trim());
      setSearchText('');
    }
  };

  const filteredJobs = jobs.filter((job) => {
    // Combine all job details and convert to lowercase
    const jobFilters = [
      job.company,
      job.position,
      job.role,
      job.level,
      job.contract,
      job.location,
      ...job.languages,
      ...job.tools
    ].map(item => item.toLowerCase());

    // Convert search filters to lowercase
    const lowerCaseFilters = filters.map(filter => filter.toLowerCase());

    // Check if any job detail match any of the search filters partially
    const matchesFilters = lowerCaseFilters.every((filter) =>
      jobFilters.some(jobDetail => jobDetail.includes(filter))
    );

    return matchesFilters;
  });

  return (
    <>
      {/* Header with Background Image */}
      <header className="header h-64 bg-desaturated-dark-cyan"></header>
      <div className="bg-light-grayish-cyan container mx-auto py-4 px-5 sm:px-6 main-container">
        <SearchInput
          searchText={searchText}
          setSearchText={setSearchText}
          addFilter={addFilter}
          filters={filters}
          removeFilter={removeFilter}
          clearFilters={clearFilters}
          handleKeyDown={handleKeyDown}
        />

        {
          filteredJobs.length === 0 ? (
            <div className="bg-light-grayish-cyan-filter text-center p-6 rounded shadow-md">
              <h2 className="text-xl text-desaturated-dark-cyan font-bold ">No Jobs Found!</h2>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} addFilter={addFilter} />
            ))
          )
        }
      </div>
    </>
  );
}
