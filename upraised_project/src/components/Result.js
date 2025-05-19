// Result.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Result.css'; // Add any relevant styles for the Result component

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Check if we have the required data
    if (!location.state?.score || !location.state?.totalQuestions) {
        return (
            <div className="error-container">
                <h2>Error: Results not found</h2>
                <button onClick={() => navigate('/')}>Return to Home</button>
            </div>
        );
    }

    const { score, totalQuestions, quizData } = location.state;
    const accuracy = (score / totalQuestions) * 100;

    const getAccuracyColor = (accuracy) => {
        if (accuracy >= 80) return '#4caf50'; // Green
        if (accuracy >= 60) return '#ffa726'; // Orange
        return '#f44336'; // Red
    };

    const handleRestart = () => {
        navigate('/');
    };

    const getFeedback = (accuracy) => {
        if (accuracy >= 80) return "Excellent! You're a quiz master!";
        if (accuracy >= 60) return "Good job! Keep practicing!";
        return "Keep trying! You'll get better!";
    };

    return (
        <div className="result-container">
            <header className="result-header">
                <h1>Quiz Results</h1>
            </header>
            
            <div className="accuracy-circle">
                <svg viewBox="0 0 36 36" className="accuracy-ring">
                    {/* Background Circle */}
                    <circle
                        cx="18"
                        cy="18"
                        r="15.9"
                        fill="transparent"
                        stroke="#e6e6e6"
                        strokeWidth="2"
                    />
                    {/* Accuracy Circle */}
                    <circle
                        cx="18"
                        cy="18"
                        r="15.9"
                        fill="transparent"
                        stroke={getAccuracyColor(accuracy)}
                        strokeWidth="2"
                        strokeDasharray={`${accuracy}, 100`}
                        strokeDashoffset="25"
                    />
                </svg>
                <div className="accuracy-text">{accuracy.toFixed(1)}%</div>
            </div>

            <div className="feedback-message">
                {getFeedback(accuracy)}
            </div>

            <div className="result-stats">
                <div className="stat-row">
                    <span>Correct Answers:</span>
                    <span className="correct">{score}</span>
                </div>
                <div className="stat-row">
                    <span>Wrong Answers:</span>
                    <span className="wrong">{totalQuestions - score}</span>
                </div>
                <div className="stat-row">
                    <span>Total Questions:</span>
                    <span>{totalQuestions}</span>
                </div>
            </div>

            {quizData && (
                <div className="quiz-summary">
                    <h3>Quiz Summary</h3>
                    <div className="summary-list">
                        {quizData.questions.map((question, index) => (
                            <div key={question.id} className="summary-item">
                                <span className="question-number">Q{index + 1}:</span>
                                <span className="question-text">{question.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <button className="restart-btn" onClick={handleRestart}>
                Start New Quiz
            </button>
        </div>
    );
};

export default Result;
