import React from "react";
import "./Discover.css";
import { useNavigate } from 'react-router-dom'; 

const Discover = () => {
  const navigate = useNavigate(); 

  const navigateToSignup = () => {
    navigate('/signup'); // Use navigate to navigate
  };

  return (
    <div className="discover_page_outer_wrapper">
      <div>
        <div className="discover_page_outer_wrapper_00">Logo</div>
        <div className="discover_page_outer_wrapper_01">
          Discover
          <span>
            Sign up and begin your quest for love, understanding, and
            self-discovery!
          </span>
        </div>
        <div className="discover_page_outer_wrapper_02">
          <button onClick={navigateToSignup}>Sign-Up</button> 
          <button>Sign-in</button>
        </div>
      </div>
    </div>
  );
};

export default Discover;
