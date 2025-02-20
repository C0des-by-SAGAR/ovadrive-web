import { useEffect, useCallback, useRef } from 'react';

export const useVoiceRecognition = ({ onResult, continuous = true, wakeWord }) => {
  const recognition = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      recognition.current = new window.webkitSpeechRecognition();
      recognition.current.continuous = continuous;
      recognition.current.interimResults = true;

      recognition.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');

        if (wakeWord && transcript.toLowerCase().includes(wakeWord.toLowerCase())) {
          // Trigger wake word detection
          onResult(transcript);
        } else if (!wakeWord) {
          onResult(transcript);
        }
      };

      recognition.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };
    }

    return () => {
      if (recognition.current) {
        recognition.current.stop();
      }
    };
  }, [continuous, onResult, wakeWord]);

  const startListening = useCallback(() => {
    if (recognition.current) {
      recognition.current.start();
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognition.current) {
      recognition.current.stop();
    }
  }, []);

  return { startListening, stopListening };
}; 