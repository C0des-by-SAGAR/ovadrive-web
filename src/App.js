import React, { useState } from 'react';
import Header from './components/common/Header';
import EmptyState from './components/EmptyState/EmptyState';
import SearchBar from './components/SearchBar/SearchBar';
import DriveSection from './components/Drive/DriveSection';
import SearchMemories from './components/SearchMemories/SearchMemories';
import BottomNav from './components/Navigation/BottomNav';
import Sidebar from './components/Sidebar/Sidebar';
import AnimatedBackground from './components/Background/AnimatedBackground';
import { ChatProvider } from './context/ChatContext';
import Chat from './components/Chat/Chat';
import './styles/fonts.css';
import './styles/App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('ova');

  const handleToggleSidebar = () => {
    if (activeSection === 'drive') {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <ChatProvider>
      <AnimatedBackground />
      <div className="app">
        <Header 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          onToggleSidebar={handleToggleSidebar}
        />
        {activeSection === 'drive' && (
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        )}
        <main className="main-content">
          {activeSection === 'ova' ? (
            <Chat activeSection={activeSection} />
          ) : (
            <DriveSection activeSection={activeSection} />
          )}
        </main>
        {activeSection === 'ova' ? (
          <SearchBar />
        ) : (
          <SearchMemories />
        )}
        <BottomNav 
          activeSection={activeSection} 
          onSectionChange={handleSectionChange}
        />
      </div>
    </ChatProvider>
  );
}

export default App;
