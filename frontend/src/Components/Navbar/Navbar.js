import React, { useState } from "react";
import "../Dashboard/Dashboard.css";
import logo from "./Icons/Logo.png";
import search from "./Icons/search.svg";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getSearchPost} from "../../Reducers/createpost.js";
const Navbar = () => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const handleInputChange = (event) => {
    
    setSearchText(event.target.value);
  };

  const dispatch=useDispatch();
  const handleSearch=()=>{
    dispatch(getSearchPost(searchText))
     
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <div className="dashboard_navbar_00">
        <section>
          <img src={logo} alt="Logo" />
          <div className="search-input">
            <input
              type="text"
              value={searchText}
              placeholder="Search username"
              onChange={handleInputChange}
              style={{ textAlign: "center", border: "none", outline: "none" }}
            />
            <button className="search_navbar_button" onClick={handleSearch}> Search </button>
        
          </div>
          <span>
            {" "}
            Logout
            <IoIosLogOut
              style={{
                color: "white",
                fontSize: "32px",
                cursor: "pointer",
                width: "30%",
              }}
              onClick={handleLogout}
            />
          </span>
        </section>
      </div>
    </div>
  );
};

export default Navbar;
