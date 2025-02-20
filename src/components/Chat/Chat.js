import React, { useRef, useEffect, useState } from 'react';
import { useChat } from '../../context/ChatContext';
import EmptyState from '../EmptyState/EmptyState';
import './Chat.css';

const Chat = ({ activeSection }) => {
  const { messages } = useChat();
  const chatContainerRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [expandedMessages, setExpandedMessages] = useState(new Set());

  // Filter messages based on activeSection
  const filteredMessages = messages.filter(message => {
    if (activeSection === 'drive') {
      return message.type === 'transcription';
    }
    return message.type !== 'transcription';
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [filteredMessages]);

  const toggleMessage = (messageId) => {
    setExpandedMessages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(messageId)) {
        newSet.delete(messageId);
      } else {
        newSet.add(messageId);
      }
      return newSet;
    });
  };

  const MessageContent = ({ content, messageId }) => {
    const isExpanded = expandedMessages.has(messageId);
    const [shouldShowReadMore, setShouldShowReadMore] = useState(false);
    const textRef = useRef(null);

    useEffect(() => {
      if (textRef.current) {
        const lineHeight = parseInt(window.getComputedStyle(textRef.current).lineHeight);
        const height = textRef.current.clientHeight;
        setShouldShowReadMore(height > lineHeight * 2);
      }
    }, [content]);

    const handleMessageClick = () => {
      if (isExpanded) {
        toggleMessage(messageId);
      }
    };

    return (
      <div className="message-text">
        <p 
          ref={textRef} 
          className={`message-content-text ${!isExpanded ? 'collapsed' : ''}`}
          onClick={handleMessageClick}
        >
          {content}
        </p>
        {shouldShowReadMore && (
          <button 
            className="read-more-btn"
            onClick={() => toggleMessage(messageId)}
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>
        )}
      </div>
    );
  };

  const ImageModal = ({ src, onClose }) => (
    <div className="image-modal" onClick={onClose}>
      <div className="modal-content">
        <img src={src} alt="Full size" />
        <button className="modal-close" onClick={onClose}>×</button>
      </div>
    </div>
  );

  const MessageItem = ({ message }) => (
    <div className={`message-container ${message.sender === 'user' ? 'user' : 'ai'}`}>
      <div className="message-content">
        {message.type === 'text' && (
          <MessageContent content={message.content} messageId={message.id} />
        )}
        {message.type === 'transcription' && (
          <div className="transcription-content">
            <svg className="transcription-icon" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" fill="currentColor"/>
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.44 6 6.93V21h2v-3.07c3.39-.49 6-3.4 6-6.93h-2z" fill="currentColor"/>
            </svg>
            <MessageContent content={message.content} messageId={message.id} />
          </div>
        )}
        {message.type === 'image' && (
          <div className="message-image-container">
            <img 
              src={message.content} 
              alt="Shared" 
              className="message-image"
              onClick={() => setSelectedImage(message.content)}
            />
          </div>
        )}
        {message.type === 'file' && (
          <div className="file-attachment">
            <svg className="file-icon" viewBox="0 0 24 24">
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" fill="currentColor"/>
            </svg>
            <span>{message.fileName}</span>
          </div>
        )}
      </div>
      <div className="message-timestamp">{message.timestamp}</div>
    </div>
  );

  return (
    <>
      <div className="chat-container" ref={chatContainerRef}>
        {filteredMessages.length > 0 ? (
          filteredMessages.map((message, index) => (
            <MessageItem key={index} message={message} />
          ))
        ) : (
          <EmptyState />
        )}
      </div>
      {selectedImage && (
        <ImageModal 
          src={selectedImage} 
          onClose={() => setSelectedImage(null)} 
        />
      )}
    </>
  );
};

export default Chat; 