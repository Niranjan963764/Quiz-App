//Home.js
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const startQuiz = async () => {
        setIsLoading(true);
        setError(null);
        try {
            console.log('Fetching quiz data...');
            const response = await fetch('http://localhost:5000/quiz', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response status:', response.status);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const quizData = await response.json();
            console.log('Quiz data received:', quizData);

            if (!quizData || !quizData.questions || !Array.isArray(quizData.questions)) {
                throw new Error('Invalid quiz data format');
            }

            navigate('/question', { state: { quizData } });
        } catch (error) {
            console.error('Failed to start the quiz:', error);
            setError(`Failed to start the quiz: ${error.message}. Please make sure the JSON server is running.`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <div className='logo-container'>
                    <img src="/UpraisedLogo.png" alt="Upraised Logo" style={{ width: '100px', height: 'auto' }} />
                </div>
            </header>
            <div className="quiz-start-section">
                <div className="quiz-circle">
                    <h1>Quiz</h1>
                </div>
                {error && (
                    <div className="error-message">
                        {error}
                        <p className="error-help">
                            Make sure to run: <code>json-server --watch db.json --port 5000</code>
                        </p>
                    </div>
                )}
                <button 
                    className="start-btn" 
                    onClick={startQuiz}
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Start'}
                </button>
            </div>
        </div>
    );
};

export default Home;
