import React, { useRef } from 'react';
import { useChat } from '../../context/ChatContext';
import './SearchBar.css';

const SearchBar = () => {
  const fileInputRef = useRef(null);
  const { handleUserMessage, searchInput, setSearchInput } = useChat();

  const handleSendMessage = () => {
    if (searchInput.trim()) {
      handleUserMessage(searchInput.trim(), 'text');
      setSearchInput(''); // Clear input after sending
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          handleUserMessage(e.target.result, 'image', file.name);
        };
        reader.readAsDataURL(file);
      } else {
        handleUserMessage(file.name, 'file', file.name);
      }
    }
    event.target.value = '';
  };

  return (
    <div className="chat-search-container">
      <div className="chat-input-wrapper">
        <button className="chat-clip-button" onClick={handleFileClick}>
          <svg className="chat-clip-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z" fill="currentColor"/>
          </svg>
        </button>
        <input 
          type="text" 
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message"
          className="chat-message-input"
        />
        <input
          type="file"
          ref={fileInputRef}
          className="chat-file-input"
          onChange={handleFileChange}
          accept="*/*"
        />
      </div>
      <button 
        className="chat-send-button"
        onClick={handleSendMessage}
        disabled={!searchInput.trim()}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" fill="white"/>
        </svg>
      </button>
    </div>
  );
};

export default SearchBar; 