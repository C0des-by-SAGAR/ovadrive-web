import React from 'react';
import './MainContent.css';

const MainContent = ({ activeSection }) => {
  const EmptyState = ({ message }) => (
    <div className="empty-state">
      <div className="info-circle">
        <i className="fas fa-info"></i>
      </div>
      <p className="empty-message">{message}</p>
    </div>
  );

  return (
    <main className="main-content">
      <div className="container content-container">
        {activeSection === 'ova' ? (
          <div className="chat-section">
            <EmptyState message="Can't find any Chat, create some or refresh the page" />
            <div className="input-container">
              <div className="message-input">
                <i className="fas fa-paperclip"></i>
                <input type="text" placeholder="Type a message" />
                <button className="send-btn">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="drive-section">
            <EmptyState message="Can't find any transcriptions, turn on the mic to start saving or refresh the page" />
            <div className="search-container">
              <div className="search-input">
                <input type="text" placeholder="Search in memories" />
                <button className="search-btn">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default MainContent; 