import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Signup.css";
import { BiUser, BiLogoGoogle } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import { signupUser,signinUser  } from "./Reducers/auth.js";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import {decodeJwt } from 'jose';
import { GoogleLogin } from "@react-oauth/google";

const Signup = () => {
  const [usernameIconVisible, setUsernameIconVisible] = useState(true);
  const [emailIconVisible, setEmailIconVisible] = useState(true);
  const [passwordIconVisible, setPasswordIconVisible] = useState(true);

  const dispatch = useDispatch();
  const { message, error } = useSelector((state) => state);

  const handleIconVisibility = (setIconVisible, value, inputValue) => {
    if (!inputValue) {
      setIconVisible(value);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser(formData));
  };

  const navigateToSignin = () => {
    // Implement your navigation logic here
  };

  const onSuccess = (res) => {
    console.log(res);
  };

  const onFailure = (res) => {
    console.log(res);
  };

  {
    //      <GoogleLogin
    //   onSuccess={credentialResponse => {
    //     console.log(credentialResponse);
    //   }}
    //   onError={() => {
    //     console.log('Login Failed');
    //   }}
    //   useOneTap
    // />;
  }
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  return (
    <div>
      <div className="Signup_page_main_outer_wrapper_00">
        <div className="Signup_page_main_outer_wrapper_01">
          <span>Signup Form</span>
          <div className="Signup_page_main_outer_wrapper_01_both_pages">
            <div className="Signup_page_main_outer_wrapper_01_left">
              <div className="Signup_page_main_outer_wrapper_01_left_page">
                <span>Hello, Friend! </span>
                <section>
                  <span>Username</span>
                  <div className="input-container">
                    {usernameIconVisible && (
                      <span className="icon">
                        <BiUser style={{ color: "blue", paddingLeft: "8px" }} />
                      </span>
                    )}
                    <input
                      type="text"
                      name="username"
                      onFocus={() =>
                        handleIconVisibility(
                          setUsernameIconVisible,
                          false,
                          formData.username
                        )
                      }
                      onBlur={() =>
                        handleIconVisibility(
                          setUsernameIconVisible,
                          true,
                          formData.username
                        )
                      }
                      onChange={handleChange}
                      value={formData.username}
                    />
                  </div>
                </section>
                <section>
                  <span>Email</span>
                  <div className="input-container">
                    {emailIconVisible && (
                      <span className="icon">
                        <AiOutlineMail
                          style={{ color: "blue", paddingLeft: "8px" }}
                        />
                      </span>
                    )}
                    <input
                      type="email"
                      name="email"
                      onFocus={() =>
                        handleIconVisibility(
                          setEmailIconVisible,
                          false,
                          formData.email
                        )
                      }
                      onBlur={() =>
                        handleIconVisibility(
                          setEmailIconVisible,
                          true,
                          formData.email
                        )
                      }
                      onChange={handleChange}
                      value={formData.email}
                    />
                  </div>
                </section>
                <section>
                  <span>Password</span>
                  <div className="input-container">
                    {passwordIconVisible && (
                      <span className="icon">
                        <RiLockPasswordLine
                          style={{ color: "blue", paddingLeft: "8px" }}
                        />
                      </span>
                    )}
                    <input
                      type="password"
                      name="password"
                      onFocus={() =>
                        handleIconVisibility(
                          setPasswordIconVisible,
                          false,
                          formData.password
                        )
                      }
                      onBlur={() =>
                        handleIconVisibility(
                          setPasswordIconVisible,
                          true,
                          formData.password
                        )
                      }
                      onChange={handleChange}
                      value={formData.password}
                    />
                  </div>
                </section>
                <div className="Signup_page_main_outer_wrapper_01_left_page_button">
                  <button onClick={() => {}}>
                    <GoogleLogin
                      onSuccess={(credentialResponse) => {
                        console.log(credentialResponse);
                      }}
                      onError={() => {
                        console.log("Login Failed");
                      }}
                      useOneTap
                    />
                    {/* <BiLogoGoogle style={{ paddingRight: "3px" }} />
                    Google Signup */}
                  </button>
                  <button onClick={handleSubmit}>Create Your Account</button>
                </div>
                <div className="Signup_page_main_outer_wrapper_01_left_page_asking">
                  Already have an account?{" "}
                  <span onClick={navigateToSignin}>Sign in</span>
                </div>
              </div>
            </div>
            <div className="Signup_page_main_outer_wrapper_01_right">
              <div className="cube-container">
                <div className="cube">
                  <div className="face front">Love</div>
                  <div className="face back">Sad</div>
                  <div className="face right">Romantic</div>
                  <div className="face left">Break-up</div>
                  <div className="face top">Patchup</div>
                  <div className="face bottom">Introvert</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
