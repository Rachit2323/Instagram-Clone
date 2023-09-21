import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './Components/user/Auth.js';

import { GoogleOAuthProvider } from '@react-oauth/google';
import "./App.css";
import Dashboard from './Components/Dashboard/Dashboard.js';

const App = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth/>}/>
        <Route path="/post" element={<Dashboard/>}/>
        


      </Routes>
    </Router>
  );
}

export default App;

