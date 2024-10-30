import React from 'react';

const SearchInput = ({
  searchText,
  setSearchText,
  filters,
  removeFilter,
  clearFilters,
  handleKeyDown
}) => {
  return (
    <div className="
      bg-white
      flex
      items-center
      justify-between
      rounded-lg
      p-4
      mb-8
      shadow-md
    ">
      <div className="flex flex-wrap items-center w-full">
        {
          filters.map((filter, index) => (
            <div
              key={index}
              className="
                bg-light-grayish-cyan-filter
                text-desaturated-dark-cyan
                font-bold
                flex
                items-center
                mr-4
                mb-2
                rounded-md
              "
            >
              <span className="px-2">{filter}</span>
              <button
                onClick={() => removeFilter(filter)}
                className="
                  bg-desaturated-dark-cyan
                  text-white
                  px-2
                  py-1
                  rounded-r-md
                  hover:bg-very-dark-grayish-cyan
                "
              >
                <img src="/images/icon-remove.svg" alt="Remove" className="w-4 h-4" />
              </button>
            </div>
          ))
        }
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="
            flex-grow
            p-1
            border-none
            outline-none
            text-desaturated-dark-cyan
            font-bold
          "
        />
      </div>
      {
        filters.length > 0 && (
          <button
            onClick={clearFilters}
            className="
              text-dark-grayish-cyan
              font-bold
              hover:underline
              hover:text-desaturated-dark-cyan
            "
          >
            Clear
          </button>
        )
      }
    </div>
  );
};

export default SearchInput;
