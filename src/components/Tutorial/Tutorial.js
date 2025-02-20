import React, { useState } from 'react';
import './Tutorial.css';

const Tutorial = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: "Today",
      icon: "cursor-icon",
      heading: "Ova Section",
      description: "All your conversation with Ova will appear here. Just Call: "Hey Ova", give my past 1 day summary"
    },
    // Add more steps as needed
  ];

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="tutorial-overlay">
      <div className="skip-tutorial">
        <button onClick={onComplete}>Skip Tutorial</button>
      </div>
      
      <div className="tutorial-content">
        <div className="tutorial-step">
          {tutorialSteps[currentStep].icon === 'cursor-icon' && (
            <div className="cursor-animation">
              <svg viewBox="0 0 24 24" className="cursor-icon">
                <path d="M5 2l7 19 3-7 7-3L5 2z" fill="currentColor"/>
              </svg>
            </div>
          )}
          
          <h2>{tutorialSteps[currentStep].title}</h2>
          <h1>{tutorialSteps[currentStep].heading}</h1>
          <p>{tutorialSteps[currentStep].description}</p>
          
          <button className="next-button" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tutorial; 