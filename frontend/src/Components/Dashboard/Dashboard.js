import React, { useState } from "react";
import "./Dashboard.css";
import logo from "./Icons/Logo.png";
import search from "./Icons/search.svg";
import mine from "./Icons/mineee.jpg";
import { FiMoreHorizontal, FiSettings } from "react-icons/fi";
import Like from "./Icons/Heart.svg";
import Comment from "./Icons/Comment.svg";
import Save from "./Icons/Save.svg";
import Share from "./Icons/Share.svg";
import { BsBookmarkFill } from "react-icons/bs";
import { FaSquarePlus } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";

const openUpload = () => {
  console.log("run");
  return (
    <div>
      <div className="upload_wrapper_01">
        <span>Upload a post</span>
        <span className="dashboard_outline"></span>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div className="dashboard_wrapper">
      <div className="dashboard_wrapper_00">
        <div className="dashboard_navbar_00">
          <section>
            <img src={logo} alt="Logo" />
            <div className="search-input">
              <input
                type="text"
                placeholder="Search"
                value={searchText}
                onChange={handleInputChange}
              />
              {searchText === "" ? (
                <img src={search} alt="Search" className="search-icon" />
              ) : null}
            </div>
          </section>
        </div>
        <span className="dashboard_outline"></span>
        <div className="dashboard_all_main">
          <div className="dashboard_story_wrapper_left">
            <section>
              <span>
                {" "}
                <AiFillHome /> Home{" "}
              </span>
              <span onClick={openUpload}>
                <FaSquarePlus /> Create{" "}
              </span>
              <span>
                <BsBookmarkFill /> Saved
              </span>
            </section>
          </div>

          <div className="dashboard_story_wrapper_mid">
            <div className="dashboard_story_wrapper">
              <section>
                <img src={mine} />
                <span>Rachit sharma</span>
              </section>
            </div>

            <div className="post_wrapper_00">
              <div className="post_wrapper_01">
                <div className="post_wrapper_011">
                  <img src={mine} />
                  <section>
                    <span>Rachit</span>
                    <span style={{ fontWeight: "400" }}>Delhi , India</span>
                  </section>
                </div>
                <FiMoreHorizontal
                  style={{ color: "white", cursor: "pointer" }}
                />
              </div>
              <div className="post_wrapper_02">
                <img src={mine} />
              </div>
              <div className="post_wrapper_03">
                <section>
                  <span>
                    <img src={Like} alt="Like" />
                    <img src={Comment} alt="Comment" />
                    <img src={Share} alt="Share" />
                  </span>
                  <img src={Save} alt="Save" />
                </section>
                <span>44 ,555 Likes</span>
                <p>
                  <strong style={{ fontWeight: 500 }}>Nickname </strong>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis...{" "}
                  <strong style={{ color: "#989898" }}>more</strong>
                </p>
                <h5>View all 33 coments</h5>
              </div>
            </div>
          </div>

          <div className="dashboard_story_wrapper_right">
            <section>
              <div className="post_wrapper_01">
                <div className="post_wrapper_011">
                  <img src={mine} />
                  <section>
                    <span>Rachit</span>
                    <span style={{ fontWeight: "400" }}>Delhi , India</span>
                  </section>
                </div>
                <FiSettings style={{ color: "white", cursor: "pointer" }} />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
