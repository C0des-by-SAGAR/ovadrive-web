import React, { createContext, useState, useContext } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const addMessage = (message) => {
    const newMessage = {
      ...message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      id: Date.now()
    };
    console.log('Adding message:', newMessage);
    setMessages(prev => {
      const updatedMessages = [...prev, newMessage];
      console.log('Updated messages:', updatedMessages);
      return updatedMessages;
    });
  };

  const handleUserMessage = async (content, type = 'text', fileName = null) => {
    console.log('handleUserMessage called with:', { content, type, fileName });
    
    // Add user message
    addMessage({
      content,
      type,
      fileName,
      sender: 'user'
    });

    // Simulate AI response
    setTimeout(() => {
      addMessage({
        content: `Received your ${type}: ${content}`,
        type: 'text',
        sender: 'ai'
      });
    }, 1000);
  };

  const contextValue = {
    messages,
    handleUserMessage,
    addMessage,
    searchInput,
    setSearchInput,
  };

  console.log('ChatContext current state:', messages);

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}; 