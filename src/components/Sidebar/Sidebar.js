import React from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Recording History</h2>
          <button className="close-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
            </svg>
          </button>
        </div>

        <div className="sidebar-sections">
          <div className="section">
            <h3>Today</h3>
            <div className="history-items">
              <div className="history-item">
                <span className="item-title">Voice Recording 1</span>
                <span className="item-time">2:30 PM</span>
              </div>
              <div className="history-item">
                <span className="item-title">Meeting Audio</span>
                <span className="item-time">11:45 AM</span>
              </div>
            </div>
          </div>

          <div className="section">
            <h3>Previous 7 Days</h3>
            <div className="history-items">
              <div className="history-item">
                <span className="item-title">Team Discussion</span>
                <span className="item-time">Yesterday</span>
              </div>
              <div className="history-item">
                <span className="item-title">Project Notes</span>
                <span className="item-time">2 days ago</span>
              </div>
            </div>
          </div>

          <div className="section">
            <h3>Previous 30 Days</h3>
            <div className="history-items">
              <div className="history-item">
                <span className="item-title">Client Meeting</span>
                <span className="item-time">Last week</span>
              </div>
              <div className="history-item">
                <span className="item-title">Voice Memo</span>
                <span className="item-time">2 weeks ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
    </>
  );
};

export default Sidebar; 