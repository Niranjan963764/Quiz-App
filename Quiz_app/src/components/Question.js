import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Question.css';

const Question = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);

    // Check if quiz data exists
    if (!location.state?.quizData) {
        return (
            <div className="error-container">
                <h2>Error: Quiz data not found</h2>
                <button onClick={() => navigate('/')}>Return to Home</button>
            </div>
        );
    }

    const { quizData } = location.state;
    const totalQuestions = quizData.questions.length;

    const handleOptionSelect = (index) => {
        setSelectedOption(index);
    };

    const submitAnswer = async () => {
        if (selectedOption === null) {
            setError('Please select an option before proceeding');
            return;
        }

        setIsSubmitting(true);
        setError(null);
        const question = quizData.questions[currentQuestion];

        try {
            if (selectedOption === question.correctOption) {
                setScore(prevScore => prevScore + 1);
            }

            const answerPayload = {
                questionId: question.id,
                selectedOption,
                timeTaken: 10,
                isCorrect: selectedOption === question.correctOption
            };

            console.log('Submitting answer:', answerPayload);

            const response = await fetch('http://localhost:5000/answer', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(answerPayload)
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Answer submitted successfully:', responseData);

            if (currentQuestion < totalQuestions - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedOption(null);
            } else {
                finishQuiz();
            }
        } catch (error) {
            console.error('Error submitting answer:', error);
            setError(`Failed to submit answer: ${error.message}. Please try again.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const finishQuiz = () => {
        navigate('/result', { 
            state: { 
                score, 
                totalQuestions,
                quizData 
            } 
        });
    };

    const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100;

    return (
        <div className="question-container">
            <header className="question-header">
                <img src="/bck.png" alt="Logo" className="logo" />
            </header>

            <div className="progress-bar" style={{ width: `${progressPercentage}%`, height: '10px', background: '#4caf50' }} />

            <div className="question-content">
                <h2>Question {currentQuestion + 1} of {totalQuestions}</h2>
                <h3>{quizData.questions[currentQuestion].text}</h3>

                {quizData.questions[currentQuestion].image && (
                    <div className="question-image-container">
                        <img 
                            src={quizData.questions[currentQuestion].image} 
                            alt="Question" 
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/placeholder-image.png';
                            }}
                        />
                    </div>
                )}

                {error && (
                    <div className="error-message">
                        {error}
                        <p className="error-help">
                            If this error persists, please try refreshing the page.
                        </p>
                    </div>
                )}

                <div className="options-container">
                    {quizData.questions[currentQuestion].options.map((option, index) => (
                        <button
                            key={index}
                            className={`option-btn ${selectedOption === index ? 'selected' : ''}`}
                            onClick={() => handleOptionSelect(index)}
                            disabled={isSubmitting}
                        >
                            <div className="option-circle">
                                {selectedOption === index && <div className="checkmark"></div>}
                            </div>
                            {option}
                        </button>
                    ))}
                </div>
                <button 
                    className="next-btn" 
                    onClick={submitAnswer}
                    disabled={isSubmitting || selectedOption === null}
                >
                    {isSubmitting ? 'Submitting...' : currentQuestion < totalQuestions - 1 ? 'Next' : 'Finish'}
                    <span className="arrow">&rarr;</span>
                </button>
            </div>
        </div>
    );
};

export default Question;
