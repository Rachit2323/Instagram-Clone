import React, { useState } from "react";
import "./App.css";
import { BiUser ,BiLogoGoogle} from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";

const App = () => {
  const [usernameIconVisible, setUsernameIconVisible] = useState(true);
  const [emailIconVisible, setEmailIconVisible] = useState(true);
  const [passwordIconVisible, setPasswordIconVisible] = useState(true);

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

  return (
    <div>
      <div className="Signup_page_main_outer_wrapper_00">
        <div className="Signup_page_main_outer_wrapper_01">
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
                    type="text"
                    onFocus={handleEmailFocus}
                    onBlur={handleEmailBlur}
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
                    type="text"
                    onFocus={handlePasswordFocus}
                    onBlur={handlePasswordBlur}
                  />
                </div>
              </section>
              <div className="Signup_page_main_outer_wrapper_01_left_page_button">

  
              <button>
                <BiLogoGoogle style={{paddingRight:'3px'}}/>
               Google Siginup
              </button>
              <button>
                Create Your Account 
              </button>
              </div>
              <div className="Signup_page_main_outer_wrapper_01_left_page_asking">Already have an account? <span>Sigin</span></div>
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
  );
};

export default App;
