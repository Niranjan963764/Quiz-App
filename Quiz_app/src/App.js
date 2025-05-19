// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Question from './components/Question';
import Result from './components/Result'; // Import the Result component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/question" element={<Question />} />
                <Route path="/result" element={<Result />} /> {/* Route for Result */}
            </Routes>
        </Router>
    );
}

export default App;
