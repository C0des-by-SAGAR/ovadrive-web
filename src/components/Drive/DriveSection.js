import React, { useRef, useEffect } from 'react';
import { useChat } from '../../context/ChatContext';
import SearchMemories from '../SearchMemories/SearchMemories';
import EmptyState from '../EmptyState/EmptyState';
import './DriveSection.css';

const DriveSection = ({ activeSection }) => {
  const { messages } = useChat();
  const driveContainerRef = useRef(null);

  // Filter only transcription messages
  const transcriptions = messages.filter(message => message.type === 'transcription');

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (driveContainerRef.current) {
      driveContainerRef.current.scrollTop = driveContainerRef.current.scrollHeight;
    }
  }, [transcriptions]);

  const TranscriptionItem = ({ message }) => (
    <div className="transcription-container">
      <div className="transcription-content">
        <svg className="transcription-icon" viewBox="0 0 24 24">
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" fill="currentColor"/>
          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.44 6 6.93V21h2v-3.07c3.39-.49 6-3.4 6-6.93h-2z" fill="currentColor"/>
        </svg>
        <div className="transcription-text">{message.content}</div>
      </div>
      <div className="transcription-timestamp">{message.timestamp}</div>
    </div>
  );

  return (
    <div className="drive-container" ref={driveContainerRef}>
      {transcriptions.length > 0 ? (
        transcriptions.map((message, index) => (
          <TranscriptionItem key={index} message={message} />
        ))
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default DriveSection; 