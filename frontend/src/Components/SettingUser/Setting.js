import React, { useState, useEffect } from "react";
import "./Setting.css";
import Navbar from "../Navbar/Navbar.js";
import mine from "./Icons/mineee.jpg";
import post from "./Icons/post.svg";
import save from "./Icons/Saved.svg";
import { useDispatch, useSelector } from "react-redux";
import savefill from "./Icons/savedfilled.svg";
import postfill from "./Icons/postfilled.svg";
import { getOnePost } from "../../Reducers/createpost.js";

const Setting = () => {
  const [highlightedtype, setHightlightType] = useState(1);
  const [allPost, setAllPost] = useState([]);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.postsone);
  useEffect(() => {
    setAllPost(posts);
  }, [posts]);

  useEffect(() => {
    dispatch(getOnePost());
  }, []);

  

  const handleType = () => {
    if (highlightedtype === 1) setHightlightType(2);
    else setHightlightType(1);
  };
  return (
    <div>
      <Navbar />
      <div className="setting_wrapper">
        <div className="setting_navbar_00">
          <img src={mine} />
          <section>
            <span>Rachit Sharma</span>

            <section>
              <span>{allPost.length} post</span>
              <span>12 Followers</span>
              <span>12 Followings</span>
            </section>
          </section>
        </div>
        <span></span>
        <div className="setting_wrapper_types">
          <span>
            {highlightedtype === 1 && <p></p>}
            <span
              onClick={handleType}
              style={{ paddingTop: highlightedtype === 2 ? "14px" : "1px" }}
            >
              <img src={post} />
              POST
            </span>
          </span>
          <span>
            {highlightedtype === 2 && <p></p>}
            <span
              onClick={handleType}
              style={{ paddingTop: highlightedtype === 1 ? "14px" : "1px" }}
            >
              <img src={save} />
              SAVED
            </span>
          </span>
        </div>
        {highlightedtype===1&&(<div className="setting_grid-container">
          {allPost.map((post) => (
            <div className="setting_grid-item">
              <img src={post.image.url} />
              <section>
                <span>
                  {" "}
                  <strong style={{ fontWeight: "500", color: "white" }}>
                    {" Caption : "}
                  </strong>{" "}
                  {post.caption}
                </span>
                <span>
                  {" "}
                  <strong style={{ fontWeight: "500", color: "white" }}>
                    {" Likes : "}
                  </strong>{" "}
                  {post.likes.length}
                </span>
                <span>
                  {" "}
                  <strong style={{ fontWeight: "500", color: "white" }}>
                    {" Comments : "}
                  </strong>{" "}
                  {post.comments.length}
                </span>
              </section>
            </div>
          ))}
        </div>)}
      </div>
    </div>
  );
};

export default Setting;
