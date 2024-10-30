import React from 'react';

const JobCard = ({ job, addFilter }) => {
  // Add filter to SearchInput
  const handleFilter = (filter) => {
    addFilter(filter);
  };

  return (
    <div className={
      `flex flex-col lg:flex-row lg:justify-between bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-md p-6 mb-7 job-container ${job.featured ? 'border-l-4 border-desaturated-dark-cyan' : ''}`
    }>
      <div className="flex items-center job-info">
        <img src={job.logo} alt={job.company} title={job.company} className="w-14 h-14 md:w-16 md:h-16 mr-4 job-image" />
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <p className="text-desaturated-dark-cyan font-bold mr-4">{job.company}</p>
            {
              job.new && (
                <span className="bg-desaturated-dark-cyan text-white text-xs font-bold px-2 py-1 rounded-full mr-2">
                  NEW!
                </span>
              )
            }
            {
              job.featured && (
                <span className="bg-very-dark-grayish-cyan text-white text-xs font-bold px-2 py-1 rounded-full">
                  FEATURED
                </span>
              )
            }
          </div>
          <h2
            onClick={() => handleFilter(job.position)}
            className="text-lg md:text-xl font-semibold text-very-dark-grayish-cyan mb-2 font-spartan cursor-pointer hover:text-desaturated-dark-cyan transition-all duration-300">
            {job.position}
          </h2>
          <p className="text-dark-grayish-cyan font-spartan">
            {job.postedAt} • {job.contract} • {job.location}
          </p>
        </div>
      </div>
      <div className="lg:hidden sm:block pt-3 md:pb-3"><hr className="divider border border-blacks " /></div>
      <div className="flex flex-wrap items-center mt-4 md:mt-0">
        <span
          onClick={() => handleFilter(job.role)}
          className="bg-light-grayish-cyan-filter text-desaturated-dark-cyan font-bold px-2 py-1 mr-2 mb-2 rounded-md cursor-pointer hover:bg-desaturated-dark-cyan hover:text-white transition-all duration-300">
          {job.role}
        </span>
        <span
          onClick={() => handleFilter(job.level)}
          className="bg-light-grayish-cyan-filter text-desaturated-dark-cyan font-bold px-2 py-1 mr-2 mb-2 rounded-md cursor-pointer hover:bg-desaturated-dark-cyan hover:text-white transition-all duration-300">
          {job.level}
        </span>
        {
          job.languages.map((language, index) => (
            <span
              key={index}
              onClick={() => handleFilter(language)}
              className="bg-light-grayish-cyan-filter text-desaturated-dark-cyan font-bold px-2 py-1 mr-2 mb-2 rounded-md cursor-pointer hover:bg-desaturated-dark-cyan hover:text-white transition-all duration-300">
              {language}
            </span>
          ))
        }
        {
          job.tools.map((tool, index) => (
            <span
              key={index}
              onClick={() => handleFilter(tool)}
              className="bg-light-grayish-cyan-filter text-desaturated-dark-cyan font-bold px-2 py-1 mr-2 mb-2 rounded-md cursor-pointer hover:bg-desaturated-dark-cyan hover:text-white transition-all duration-300">
              {tool}
            </span>
          ))
        }
      </div>
    </div>
  );
};

export default JobCard;
