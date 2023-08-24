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


import React, { useState } from "react";
import "./Signup.css";
import { BiUser ,BiLogoGoogle} from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import { useNavigate } from 'react-router-dom'; 
import { signupUser } from "./Reducers/auth.js";
import {useDispatch} from 'react-redux';

const Siginup = () => {
  const [usernameIconVisible, setUsernameIconVisible] = useState(true);
  const [emailIconVisible, setEmailIconVisible] = useState(true);
  const [passwordIconVisible, setPasswordIconVisible] = useState(true);
  const[email,setEmail]=useState('');
  const[username,setUsername]=useState('');
  const[password,setPassword]=useState('');
  const dispatch=useDispatch();

  const handleUsernameFocus = () => {
    setUsernameIconVisible(false);
  };

  const handleUsernameBlur = (event) => {
    setUsernameIconVisible(event.target.value === "");
  };

  const handleEmailFocus = () => {
    setEmailIconVisible(false);
  };

  const handleEmailBlur = (event) => {
    setEmailIconVisible(event.target.value === "");
  };

  const handlePasswordFocus = () => {
    setPasswordIconVisible(false);
  };

  const handlePasswordBlur = (event) => {
    setPasswordIconVisible(event.target.value === "");
  };

  const navigate = useNavigate(); 

  const handleSubmit=()=>{
    dispatch(signupUser (email,password))
  }

  const navigateToSignin = () => {
    navigate('/signin'); 
  };

  return (
    <div>
      <div className="Signup_page_main_outer_wrapper_00">
        <div className="Signup_page_main_outer_wrapper_01">
          <span>Signup Form</span>
          <div className="Signup_page_main_outer_wrapper_01_both_pages">
          <div className="Signup_page_main_outer_wrapper_01_left">
            <div className="Signup_page_main_outer_wrapper_01_left_page">
              <span>Hello , Friend! </span>
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
                    onFocus={handleUsernameFocus}
                    onBlur={handleUsernameBlur}
                    onChange={(e)=>setUsername(e.target.value)}
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
                    onFocus={handleEmailFocus}
                    onBlur={handleEmailBlur}
                    onChange={(e)=>setEmail(e.target.value)}
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
                    onFocus={handlePasswordFocus}
                    onBlur={handlePasswordBlur}
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                </div>
              </section>
              <div className="Signup_page_main_outer_wrapper_01_left_page_button">

  
              <button>
                <BiLogoGoogle style={{paddingRight:'3px'}}/>
               Google Siginup
              </button>
              <button onClick={handleSubmit}>
                Create Your Account 
              </button>
              </div>
              <div className="Signup_page_main_outer_wrapper_01_left_page_asking">Already have an account? <span onClick={navigateToSignin}>Sigin</span></div>
            </div>
          </div>
          <div className="Signup_page_main_outer_wrapper_01_right">
            <div class="cube-container">
              <div class="cube">
                <div class="face front">Love</div>
                <div class="face back">Sad</div>
                <div class="face right">Romantic</div>
                <div class="face left">Break-up</div>
                <div class="face top">Patchup</div>
                <div class="face bottom">Introvert</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Siginup;
