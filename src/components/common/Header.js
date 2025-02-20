import React from 'react';
import { useChat } from '../../context/ChatContext';
import { ReactComponent as OvaLogo } from '../../assets/ova-logo.svg';
import './Header.css';

const Header = ({ activeSection, setActiveSection, onToggleSidebar }) => {
  const { messages } = useChat();
  const isChatEmpty = messages.length === 0;

  return (
    <header className="app-header">
      {activeSection === 'drive' && (
        <button className="history-btn" onClick={onToggleSidebar}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* History icon - Stack of papers */}
            <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="button-label">Recording History</span>
        </button>
      )}
      <div className="section-tabs">
        <button
          className={`tab ${activeSection === 'ova' ? 'active' : ''}`}
          onClick={() => setActiveSection('ova')}
        >
          <div className="ova-logo-container">
            <OvaLogo className="logo" />
            <span>VA</span>
          </div>
        </button>
        <button
          className={`tab ${activeSection === 'drive' ? 'active' : ''}`}
          onClick={() => setActiveSection('drive')}
        >
          <span>DRIVE</span>
        </button>
      </div>
      {isChatEmpty && (
        <button className="refresh-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Refresh icon - Circular arrow */}
            <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M12 3C13.9819 3 15.7951 3.74316 17.2249 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M19.5 2.5V5.5H16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="button-label">Refresh page</span>
        </button>
      )}
    </header>
  );
};

export default Header;