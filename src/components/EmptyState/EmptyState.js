import React from 'react';
import './EmptyState.css';

const EmptyState = () => {
  return (
    <div className="empty-state-container">
      <div className="empty-state">
        <div className="info-circle">i</div>
        <p className="empty-message">
          Can't find any Chat, create some<br />or refresh the page
        </p>
      </div>
    </div>
  );
};

export default EmptyState; 