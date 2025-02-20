import React, { useState, useCallback } from 'react';
import { useVoiceRecognition } from '../../hooks/useVoiceRecognition';
import './VoiceAssistant.css';

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  
  const onResult = useCallback((result) => {
    setTranscript(result);
  }, []);

  const { startListening, stopListening } = useVoiceRecognition({
    onResult,
    continuous: true,
    wakeWord: 'hey ova'
  });

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
    setIsListening(!isListening);
  };

  return (
    <div className="voice-assistant">
      <div className="container spacing-responsive">
        <div className="flex flex-column items-center">
          <button 
            className={`voice-button ${isListening ? 'listening' : ''} br-100`}
            onClick={toggleListening}
            aria-label={isListening ? 'Stop listening' : 'Start listening'}
          >
            <div className="pulse-ring"></div>
          </button>
          
          <div className="transcript-container">
            <p className="text-base ma0">
              {transcript || 'Say "Hey Ova" to start...'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant; 