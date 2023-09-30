import React, { useState, useEffect } from "react";
import post from "../SettingUser/Icons/post.svg";
import save from "../SettingUser/Icons/Saved.svg";
import "../SettingUser/Setting.css";
import jwt_decode from "jwt-decode";
import "../Dashboard/Dashboard.css";

import "./Profile.css";
import { followUser, getUserAllDetails } from "../../Reducers/createpost.js";
import {
  getOnePost,
  mysavedpostall,
  deletePost,
  editPost,
  getAllPost,
  Profileupdate,
} from "../../Reducers/createpost.js";

import { AiOutlineCloudUpload } from "react-icons/ai";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import mine from "./mineee.jpg";

const Profile = () => {
  const [highlightedtype, setHightlightType] = useState(1);
  const [allPost, setAllPost] = useState([]);
  const [allFollowerslist, setAllFollowersList] = useState([]);
  const [allFollowingList, setAllFollowingList] = useState([]);
  const [followerModalVisible, setFollowerModalVisible] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  const [mysavedpost, setMySavedPost] = useState([]);

  const { usernameprofile } = useParams();

  const dispatch = useDispatch();

  const searchuserPosts = useSelector((state) => state.post.seachuserpost);
  const userDetails = useSelector((state) => state.post.searchuserdetails);
  const searchsavepost = useSelector((state) => state.post.seachusersavedpost);
  const seachusermsg = useSelector((state) => state.post.searchusermsg);
  const followerlist = useSelector((state) => state.post.followuser);
  const followinglist = useSelector((state) => state.post.followinguser);
  const [previewImage, setPreviewImage] = useState(null);
  useEffect(() => {
    dispatch(getUserAllDetails(usernameprofile));
  }, [dispatch, usernameprofile]);

  // const  = useSelector((state) => state.post.userDetails);

  useEffect(() => {
    setMySavedPost(searchsavepost);
  }, [searchsavepost]);

  useEffect(() => {
    setAllPost(searchuserPosts);
  }, [searchuserPosts]);

  useEffect(() => {
    setAllFollowersList(followerlist);
    setAllFollowingList(followinglist);
  }, [followerlist, followinglist]);

  const handleType = () => {
    if (highlightedtype === 1) setHightlightType(2);
    else setHightlightType(1);
  };

  const showFollower = (text) => {
    if (text === "following") {
      setShowFollowing(true);
    } else {
      setShowFollowing(false);
    }
    setFollowerModalVisible(true);
  };

  const FollowerModal = ({ onClose }) => {
    const navigate = useNavigate();
    const handleFollowclick = (username) => {
      navigate(`/${username}`);
      setFollowerModalVisible(false);
    };

    const handleFollow = (userId) => {
      console.log(userId);
      dispatch(followUser(userId));
    };

    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    console.log(userDetails);

    return (
      <div className="follower_modal">
        <div className="follower_upload_modal">
          <AiOutlineClose onClick={onClose} />
          <span>{showFollowing ? "All Following" : "All Followers"}</span>
          <p></p>
          <div className="follower_list">
            {showFollowing
              ? allFollowingList.map((follower) => (
                  <section key={follower._id}>
                    <h1 onClick={() => handleFollowclick(follower?.username)}>
                      <img
                        src={follower?.profileimg?.url}
                        alt={follower.username}
                      />
                      <p>{follower?.username}</p>
                    </h1>
                    {!(decoded.userId === follower?._id) && (
                      <button onClick={() => handleFollow(follower?._id)}>
                        {userDetails[0]?.followers?.includes(follower?._id)
                          ? "Unfollow"
                          : "Follow"}
                      </button>
                    )}
                  </section>
                ))
              : allFollowerslist.map((follower) => (
                  <section key={follower._id}>
                    <h1 onClick={() => handleFollowclick(follower?.username)}>
                      <img
                        src={follower?.profileimg?.url}
                        alt={follower.username}
                      />
                      <p>{follower?.username}</p>
                    </h1>
                    {!(decoded.userId === follower?._id) && (
                      <button onClick={() => handleFollow(follower?._id)}>
                        {userDetails[0]?.followers?.includes(follower?._id)
                          ? "Unfollow"
                          : "Follow"}
                      </button>
                    )}
                  </section>
                ))}
          </div>
        </div>
      </div>
    );
  };

  const closeFollowerModal = () => {
    setFollowerModalVisible(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        // Set the previewImage to the data URL of the selected image
        setPreviewImage(e.target.result);

        // Update the postData after the image has been read
        const updatedPostData = {
          image: file,
        };

        dispatch(Profileupdate(updatedPostData));
      };

      reader.readAsDataURL(file);
    }
  };

  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);

  //  console.log(allPost,userDetails);

  return (
    <div style={{ height: "100vh" }}>
      <div className="setting_wrapper">
        <div className="setting_navbar_00">
          <div className="image_upload_user">
            <label htmlFor="fileInput">
              <img src={userDetails[0]?.profileimg?.url} />
              {decoded.userId === userDetails[0]?._id && (
                <>
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                  <AiOutlineCloudUpload />
                </>
              )}
            </label>
          </div>
          <section>
            <span>{usernameprofile}</span>

            <section>
              <span>{allPost.length} post</span>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => showFollower("follower")}
              >
                {userDetails[0]?.followers.length} Followers
              </span>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => showFollower("following")}
              >
                {userDetails[0]?.following.length} Followings
              </span>
            </section>
          </section>
          {followerModalVisible && (
            <FollowerModal onClose={closeFollowerModal} />
          )}
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
