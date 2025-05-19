// Question.js
import React, { useState } from 'react';
import './Question.css';

const Question = () => {
   const [currentQuestion, setCurrentQuestion] = useState(2); // Simulating the second question
   const [selectedOption, setSelectedOption] = useState(null);
   const totalQuestions = 3;

   const questions = [
       {
           text: "How do you judge what should be added in the next version of the app?",
           options: [
               "Data Analysis",
               "User's feedback",
               "Copy from similar product",
               "Make a questionary",
               "Personal feeling"
           ],
           image: "/question-image.png" // Add your image path here
       }
   ];

   const handleNext = () => {
       if (currentQuestion < totalQuestions) {
           setCurrentQuestion(currentQuestion + 1);
           setSelectedOption(null);
       }
   };

   const handleOptionSelect = (index) => {
       setSelectedOption(index);
   };

   return (
       <div className="question-container">
           <div className="svg-background"></div>
           <header className="question-header">
               <img src="/bck.png" alt="Upraised Logo" className="logo" />
           </header>

           <div className="progress-section">
               <div className="question-progress">
                   <div className="progress-circle">
                       <svg viewBox="0 0 36 36" className="progress-ring">
                           <path
                               d="M18 2.0845
                               a 15.9155 15.9155 0 0 1 0 31.831
                               a 15.9155 15.9155 0 0 1 0 -31.831"
                               fill="none"
                               stroke="#eee"
                               strokeWidth="3"
                           />
                           <path
                               d="M18 2.0845
                               a 15.9155 15.9155 0 0 1 0 31.831
                               a 15.9155 15.9155 0 0 1 0 -31.831"
                               fill="none"
                               stroke="#4CAF50"
                               strokeWidth="3"
                               strokeDasharray={`${(currentQuestion / totalQuestions) * 100}, 100`}
                           />
                       </svg>
                       <div className="question-number">
                           <span>{currentQuestion}</span>/{totalQuestions}
                       </div>
                   </div>
               </div>
           </div>

           <div className="question-content">
               <h2>{questions[0].text}</h2>

               {/* Add space here for the image */}
               <div className="question-image-container">
                   <img src={questions[0].image} alt="Question related" className="question-image" />
               </div>

               <div className="options-container">
                   {questions[0].options.map((option, index) => (
                       <button
                           key={index}
                           className={`option-btn ${selectedOption === index ? 'selected' : ''}`}
                           onClick={() => handleOptionSelect(index)}
                       >
                           <div className="option-circle">
                               {selectedOption === index && <div className="checkmark"></div>}
                           </div>
                           {option}
                       </button>
                   ))}
               </div>

               <button className="next-btn" onClick={handleNext}>
                   Next
                   <span className="arrow">&rarr;</span>
               </button>
           </div>
       </div>
   );
};

export default Question;
