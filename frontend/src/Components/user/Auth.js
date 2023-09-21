import React, { useState, useEffect } from "react";
import {
  AiOutlineBulb,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import "./Auth.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, signinUser } from "../../Reducers/auth.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Test = () => {
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [auth, isAuth] = useState(true);
  const [showPassword, setShowPassword] = useState(true);
  const [passowrdhintshow, setPasswordHintShow] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [formData2, setFormData2] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCardToggle = () => {
    isAuth(!auth);
    setIsCardFlipped(!isCardFlipped);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser(formData));
  };

  const { error, success } = useSelector((state) => state.user);
  const res= useSelector((state) => state.user);


  useEffect(() => {
    if (success == false) {
      toast.error(error);
    } else {
      toast.success(error);
    }
  }, [error]);

  const handleSubmit2 = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(signinUser(formData2));

      if (response.payload.success) {
        navigate("/post");
      } else {
      }
    } catch (error) {
      console.log("problem in sigin");
    }
  };

  const passwordHint = () => {
    setPasswordHintShow((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setFormData2((prevData2) => ({
      ...prevData2,
      [name]: value,
    }));
  };

  return (
    <div className="signup_container_outer">
      <div className="sigup_wrapper_background-image">
        <div className="outer_wrapper_frame_signup_01">
          <div className="outer_wrapper_frame_signup_01_left">
            <span>Welcome to The Think Tribe</span>
            <p>A place to share knowledge and better understand the world.</p>
          </div>
          <div className="outer_wrapper_frame_signup_01_right_00">
            <motion.div
              className={`card ${isCardFlipped ? "active" : ""}`}
              initial={{ rotateY: 0 }}
              animate={{ rotateY: isCardFlipped ? 180 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <div
                className={`outer_wrapper_frame_signup_01_right ${
                  isCardFlipped ? "mirrored-content" : ""
                }`}
              >
                <section>
                  <span>{auth ? "Sign Up" : "Sign in"}</span>
                  <section>
                    <span>{auth ? "Username" : "Username or Email"}</span>
                    {auth ? (
                      <input
                        type="text"
                        name="username"
                        onChange={handleChange}
                        placeholder="Enter your username"
                        value={formData.username}
                      />
                    ) : (
                      <input
                        type="text"
                        name="usernameOrEmail"
                        onChange={handleChange2}
                        placeholder="Enter your username or email"
                        value={formData2.usernameOrEmail}
                      />
                    )}
                  </section>
                  {auth && (
                    <section>
                      <span>Email</span>
                      <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        placeholder="Enter your email"
                        value={formData.email}
                      />
                    </section>
                  )}

                  <section>
                    <span>Password</span>
                    <div className="password-input-container">
                      {auth ? (
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          onChange={handleChange}
                          placeholder="Enter your password"
                          value={formData.password}
                        />
                      ) : (
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          onChange={handleChange2}
                          placeholder="Enter your password"
                          value={formData2.password}
                        />
                      )}

                      <div
                        className="eye-icon"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <AiOutlineEyeInvisible />
                        ) : (
                          <AiOutlineEye />
                        )}
                      </div>
                    </div>
                  </section>
                  <div
                    className="outer_wrapper_frame_signup_01_right_01"
                    onClick={passwordHint}
                  >
                    <AiOutlineBulb /> Password hint
                  </div>

                  {passowrdhintshow && (
                    <div className="outer_wrapper_frame_signup_01_right_01_text_below">
                      Password should be more than 8 Characters , with 1 special
                      character and 1 uppercase letter
                    </div>
                  )}

                  <button onClick={auth ? handleSubmit : handleSubmit2}>
                    {auth ? "Sign Up" : "Sign in"}
                  </button>

                  <p>
                    {auth
                      ? "Already have an account?"
                      : "Don't have an account!"}{" "}
                    <span onClick={handleCardToggle}>
                      {auth ? "Sign in" : "Sign up"}
                    </span>
                  </p>
                </section>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Test;
