import React, { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';
import SearchInput from '../components/SearchInput';
import useFetchJobs from '@/hooks/useFetchJobs';

export default function Home() {
  const { jobs, error } = useFetchJobs();
  const [filters, setFilters] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>('');

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
    const jobDetails = [
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
      jobDetails.some(jobDetail => jobDetail.includes(filter))
    );

    return matchesFilters;
  });

  return (
    <>
      {/* Header */}
      <header className="header h-64 bg-desaturated-dark-cyan"></header>

      {/* Main container */}
      <div className="
        bg-light-grayish-cyan
        container
        mx-auto
        py-4
        px-5
        sm:px-6
        main-container
      ">
        {/* Search Input */}
        <SearchInput
          searchText={searchText}
          setSearchText={setSearchText}
          filters={filters}
          removeFilter={removeFilter}
          clearFilters={clearFilters}
          handleKeyDown={handleKeyDown}
        />

        {/* Jobs List */}
        {
          error ? (
            <div className="bg-light-grayish-cyan-filter text-center p-6 rounded shadow-md">
              <h2 className="text-xl text-desaturated-dark-cyan font-bold">{error}</h2>
            </div>
          ) : filteredJobs.length === 0 ? (
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
