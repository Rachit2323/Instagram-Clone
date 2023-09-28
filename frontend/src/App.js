import React  from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './Components/user/Auth.js';
import "./App.css";
import Dashboard from './Components/Dashboard/Dashboard.js';
import Setting from './Components/SettingUser/Setting.js';
import Profile from './Components/Profile/Profile.js';


const App = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth/>}/>
        <Route path="/post" element={<Dashboard/>}/>
        <Route path="/setting" element={<Setting/>}/>
        <Route path="/:usernameprofile" element={<Profile/>} />

  
      </Routes>
    </Router>
  );
}

export default App;

