import React, { useState, useEffect } from "react";
import post from "../SettingUser/Icons/post.svg";
import save from "../SettingUser/Icons/Saved.svg";
import "../SettingUser/Setting.css";
import {
  getOnePost,
  mysavedpostall,
  getAllPost,
  getUserAllDetails,
} from "../../Reducers/createpost.js";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [highlightedtype, setHightlightType] = useState(1);
  const [allPost, setAllPost] = useState([]);
  const [mysavedpost, setMySavedPost] = useState([]);

  const { usernameprofile } = useParams();

  useEffect(() => {
    dispatch(getUserAllDetails(usernameprofile));
  }, []);

  const dispatch = useDispatch();

  const searchuserPosts = useSelector((state) => state.post.seachuserpost);
  const userDetails = useSelector((state) => state.post.searchuserdetails);
  const searchsavepost = useSelector((state) => state.post.seachusersavedpost);
  const seachusermsg = useSelector((state) => state.post.searchusermsg);
  // const  = useSelector((state) => state.post.userDetails);


  useEffect(() => {
    setMySavedPost(searchsavepost);
  }, [searchsavepost]);


  useEffect(() => {
    setAllPost(searchuserPosts);
  }, [searchuserPosts]);

  const handleType = () => {
    if (highlightedtype === 1) setHightlightType(2);
    else setHightlightType(1);
  };

  return (
    <div>
      <div className="setting_wrapper">
        <div className="setting_navbar_00">
          <div className="image_upload_user">
            <label htmlFor="fileInput">
              <img src={userDetails[0]?.profileimg?.url} />
            </label>
          </div>
          <section>
            <span>{usernameprofile}</span>

            <section>
              <span>{allPost.length} post</span>
              <span>{userDetails[0]?.followers.length} Followers</span>
              <span>{userDetails[0]?.following.length}  Followings</span>
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
        {highlightedtype === 1 && (
          <div className="setting_grid-container">
            {allPost.map((post) => (
              <div className="setting_grid_wrapper" key={post._id}>
                <div className="setting_grid-item">
                  <img
                    src={post.image.url}
                    alt={`Post by ${post?.user?.username}`}
                  />
                  <section>
                    <span>
                      <strong style={{ fontWeight: "500", color: "white" }}>
                        {" Caption : "}
                      </strong>{" "}
                      {post?.caption}
                    </span>

                    <span>
                      <strong style={{ fontWeight: "500", color: "white" }}>
                        {" Likes : "}
                      </strong>{" "}
                      {post?.likes.length}
                    </span>
                    <span>
                      <strong style={{ fontWeight: "500", color: "white" }}>
                        {" Comments : "}
                      </strong>{" "}
                      {post?.comments.length}
                    </span>
                  </section>
                </div>
              </div>
            ))}
          </div>
        )}

        {highlightedtype === 2 && (
          <div className="setting_grid-container">
            {mysavedpost.map((post) => (
              <div className="setting_grid-item" key={post._id}>
                <img
                  src={post.image.url}
                  alt={`Post by ${post?.user?.username}`}
                />
                <section>
                  <span>
                    <strong style={{ fontWeight: "500", color: "white" }}>
                      {" Caption : "}
                    </strong>{" "}
                    {post?.caption}
                  </span>
                  <span>
                    <strong style={{ fontWeight: "500", color: "white" }}>
                      {" Likes : "}
                    </strong>{" "}
                    {post?.likes.length}
                  </span>
                  <span>
                    <strong style={{ fontWeight: "500", color: "white" }}>
                      {" Comments : "}
                    </strong>{" "}
                    {post?.comments.length}
                  </span>
                </section>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
