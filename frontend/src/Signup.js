// import React from "react";
// import "./Signup.css";
// import { BiLogoGoogle } from "react-icons/bi";

// const Signup = () => {
//   return (
//     <div className="signup_page_outer_wrapper">
//       <div className="signup_wrapper_main_00">
//         <span>Signup</span>
//         <button className="signup_wrapper_main_01">
//           <BiLogoGoogle style={{ paddingRight: "6px" }} /> Sign up with Google
//         </button>
//         <section></section>
//         <div className="signup_wrapper_main_02">
//           <div className="signup_wrapper_main_02_button">
//             <span>Enter Username</span>
//             <input
//               type="text"
//               placeholder="Username"
//               style={{ color: "white" }}
//             />
//           </div>
//           <div className="signup_wrapper_main_02_button">
//             <span>Create a new password</span>
//             <input
//               type="password"
//               placeholder="Password"
//               style={{ color: "white" }}
//             />
//           </div>
//         </div>
//         <div className="signup_wrapper_main_03">
//           <button>Create Account</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from './actions/auth'; // Make sure to provide the correct path
import './Signup.css';
import { BiUser, BiLogoGoogle } from 'react-icons/bi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiOutlineMail } from 'react-icons/ai';

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
    dispatch(signup(formData));
  };

  const navigateToSignin = () => {
    // Implement your navigation logic here
  };

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
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
                        <BiUser style={{ color: 'blue', paddingLeft: '8px' }} />
                      </span>
                    )}
                    <input
                      type="text"
                      name="username"
                      onFocus={() => handleIconVisibility(setUsernameIconVisible, false, formData.username)}
                      onBlur={() => handleIconVisibility(setUsernameIconVisible, true, formData.username)}
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
                        <AiOutlineMail style={{ color: 'blue', paddingLeft: '8px' }} />
                      </span>
                    )}
                    <input
                      type="email"
                      name="email"
                      onFocus={() => handleIconVisibility(setEmailIconVisible, false, formData.email)}
                      onBlur={() => handleIconVisibility(setEmailIconVisible, true, formData.email)}
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
                        <RiLockPasswordLine style={{ color: 'blue', paddingLeft: '8px' }} />
                      </span>
                    )}
                    <input
                      type="password"
                      name="password"
                      onFocus={() => handleIconVisibility(setPasswordIconVisible, false, formData.password)}
                      onBlur={() => handleIconVisibility(setPasswordIconVisible, true, formData.password)}
                      onChange={handleChange}
                      value={formData.password}
                    />
                  </div>
                </section>
                <div className="Signup_page_main_outer_wrapper_01_left_page_button">
                  <button>
                    <BiLogoGoogle style={{ paddingRight: '3px' }} />
                    Google Signup
                  </button>
                  <button onClick={handleSubmit}>Create Your Account</button>
                </div>
                <div className="Signup_page_main_outer_wrapper_01_left_page_asking">
                  Already have an account? <span onClick={navigateToSignin}>Sign in</span>
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
