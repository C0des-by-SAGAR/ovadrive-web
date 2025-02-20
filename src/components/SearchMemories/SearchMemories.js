import React, { useRef } from 'react';
import './SearchMemories.css';

const SearchMemories = ({ onSearch }) => {
  const fileInputRef = useRef(null);
  const [searchInput, setSearchInput] = React.useState('');

  const handleSearch = () => {
    if (searchInput.trim()) {
      onSearch?.(searchInput.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="chat-search-container">
      <div className="chat-input-wrapper">
        <input 
          type="text" 
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search in memories"
          className="chat-message-input"
        />
      </div>
      <button 
        className="chat-send-button"
        onClick={handleSearch}
        disabled={!searchInput.trim()}
      >
        <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor"/>
        </svg>
      </button>
    </div>
  );
};

export default SearchMemories; 