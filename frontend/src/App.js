import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Discover from './Discover';
import Signup from './Signup';
import Signin from './Sigin.js';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Discover />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </Router>
  );
}

export default App;

