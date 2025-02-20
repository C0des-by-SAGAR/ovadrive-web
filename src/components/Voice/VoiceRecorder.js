import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '../../context/ChatContext';
import './VoiceRecorder.css';

const VoiceRecorder = ({ activeSection }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [tempTranscript, setTempTranscript] = useState('');
  const { addMessage, setSearchInput } = useChat();
  const pauseTimer = useRef(null);
  const lastTranscriptRef = useRef('');
  const PAUSE_THRESHOLD = 3000; // 3 seconds
  
  // Language detection state
  const [detectedLanguage, setDetectedLanguage] = useState('');

  // Define fact-checking rules
  const FACTS = {
    'taj mahal': {
      location: 'Agra, Uttar Pradesh, India',
      incorrectLocations: ['chennai', 'china', 'delhi', 'mumbai', 'bangalore', 'kolkata', 'pakistan', 'dubai'],
      getCorrection: (wrongLocation) => `You're wrong! The Taj Mahal is located in Agra, Uttar Pradesh, India, not in ${wrongLocation}.`
    }
    // Add more landmarks/facts here as needed
  };

  useEffect(() => {
    return () => {
      cleanupRecognition();
    };
  }, []);

  const cleanupRecognition = () => {
    if (recognition) {
      recognition.stop();
      setRecognition(null);
    }
    if (pauseTimer.current) {
      clearTimeout(pauseTimer.current);
    }
  };

  const handleFactCheck = (transcript) => {
    const lowerTranscript = transcript.toLowerCase();
    
    // Check for Taj Mahal related facts
    if (lowerTranscript.includes('taj mahal')) {
      const factData = FACTS['taj mahal'];
      const mentionedWrongLocation = factData.incorrectLocations.find(location => 
        lowerTranscript.includes(location)
      );

      if (mentionedWrongLocation) {
        setTimeout(() => {
          addMessage({
            type: 'correction',
            content: factData.getCorrection(mentionedWrongLocation),
            sender: 'ova',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          });
        }, 500);
      }
    }
  };

  const handleTranscriptEnd = (finalTranscript) => {
    const transcript = finalTranscript || tempTranscript;
    if (transcript.trim() && transcript !== lastTranscriptRef.current) {
      lastTranscriptRef.current = transcript;

      // Always add to DRIVE section
      addMessage({
        type: 'transcription',
        content: transcript.trim(),
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: detectedLanguage // Include detected language
      });

      // Check for factual errors regardless of active section
      handleFactCheck(transcript);

      // Update OVA search input if active
      if (activeSection === 'ova') {
        setSearchInput(transcript.trim());
      }

      setTempTranscript('');
    }
  };

  const startRecording = async () => {
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        console.error('Speech recognition not supported');
        return;
      }

      const newRecognition = new SpeechRecognition();
      newRecognition.continuous = true;
      newRecognition.interimResults = true;
      newRecognition.lang = ''; // Enable automatic language detection

      setTempTranscript('');
      lastTranscriptRef.current = '';

      newRecognition.onresult = (event) => {
        if (pauseTimer.current) {
          clearTimeout(pauseTimer.current);
        }

        const result = event.results[event.results.length - 1];
        const transcript = result[0].transcript;

        if (result.isFinal) {
          handleTranscriptEnd(transcript);
          
          // Set timer for next pause
          pauseTimer.current = setTimeout(() => {
            setTempTranscript('');
          }, PAUSE_THRESHOLD);
        } else {
          setTempTranscript(transcript);
          // Update OVA search input in real-time if active
          if (activeSection === 'ova') {
            setSearchInput(transcript);
          }
        }
      };

      newRecognition.onend = () => {
        setIsRecording(false);
        if (pauseTimer.current) {
          clearTimeout(pauseTimer.current);
        }
        if (tempTranscript) {
          handleTranscriptEnd();
        }
      };

      newRecognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        if (pauseTimer.current) {
          clearTimeout(pauseTimer.current);
        }
      };

      // Language detection
      newRecognition.onlanguagechange = (event) => {
        setDetectedLanguage(event.language);
        console.log('Language detected:', event.language);
      };

      await newRecognition.start();
      setRecognition(newRecognition);
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    cleanupRecognition();
  };

  const handleVoiceButton = () => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  return (
    <button 
      className={`voice-button ${isRecording ? 'recording' : ''}`}
      onClick={handleVoiceButton}
      aria-label={isRecording ? 'Stop recording' : 'Start recording'}
    >
      <div className="mic-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" fill="currentColor"/>
          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.44 6 6.93V21h2v-3.07c3.39-.49 6-3.4 6-6.93h-2z" fill="currentColor"/>
        </svg>
      </div>
      {isRecording && (
        <div className="recording-indicator">
          <div className="recording-pulse"></div>
        </div>
      )}
    </button>
  );
};

export default VoiceRecorder; 