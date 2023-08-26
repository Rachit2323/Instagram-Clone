import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Discover from './Discover';
import Signup from './Signup';
import Signin from './Sigin.js';
import { GoogleOAuthProvider } from '@react-oauth/google';



const App = () => {
  
  // useEffect(()=>{
  //   function start(){
  //     gapi.client.init({
  //       clientId:clientId,
  //       scope:""
  //     })
  //   };
  //   gapi.load('client:auth2',start);
  // })
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

