import React, { useState } from 'react';
import { debounce } from 'lodash';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    const query = event.target.value;
    setQuery(query);
    debouncedSearch(query);
  };

  // Debounce the search function
  const debouncedSearch = debounce((query) => {
    onSearch(query);
  }, 500); // 500ms debounce

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
