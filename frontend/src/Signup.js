import React from "react";
import "./Signup.css";
import { BiLogoGoogle } from "react-icons/bi";

const Signup = () => {
  return (
    <div className="signup_page_outer_wrapper">
      <div className="signup_wrapper_main_00">
        <span>Signup</span>
        <button className="signup_wrapper_main_01">
          <BiLogoGoogle style={{ paddingRight: "6px" }} /> Sign up with Google
        </button>
        <section></section>
        <div className="signup_wrapper_main_02">
          <div className="signup_wrapper_main_02_button">
            <span>Enter Username</span>
            <input
              type="text"
              placeholder="Username"
              style={{ color: "white" }}
            />
          </div>
          <div className="signup_wrapper_main_02_button">
            <span>Create a new password</span>
            <input
              type="password"
              placeholder="Password"
              style={{ color: "white" }}
            />
          </div>
        </div>
        <div className="signup_wrapper_main_03">
          <button>Create Account</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
