import React, { useState, useEffect } from "react";
import "./Dashboard.css";

import mine from "./Icons/mineee.jpg";
import { FiMoreHorizontal, FiSettings } from "react-icons/fi";
import Like from "./Icons/Heart.svg";
import Comment from "./Icons/Comment.svg";
import Save from "./Icons/Save.svg";
import Share from "./Icons/Share.svg";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import moment from "moment";
import emoji from "./Icons/emoji.svg";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaSquarePlus } from "react-icons/fa6";
import { AiFillHome, AiOutlineClose } from "react-icons/ai";
import { FaImages } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import redHeart from "./Icons/RedHeart.svg";

import {
  createPost,
  getAllPost,
  addComments,
  followUser,
  addLikes,
  savedpost,
} from "../../Reducers/createpost.js";
import Navbar from "../Navbar/Navbar.js";

const Dashboard = () => {
  const [searchText, setSearchText] = useState("");
  const [isopen, setIsOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [imagesave, setImageSave] = useState(false);
  const [closemodal, setCloseModal] = useState(false);
  const [commentModal, setCommentModal] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [allPost, setAllPost] = useState([]);
  const [commentopensection, setCommentOpenSection] = useState(false);
  const [loadingstate, setLoadingState] = useState(false);
  const [showpostupdate, setShowPostUpdate] = useState(false);
  const [signined, setIsSignined] = useState(true);

  const handleCommentChange = (event) => {
    setLoadingState((prev) => !prev);
    setCommentText(event.target.value);
  };

  const openSetting = () => {
    navigate("/setting");
  };

  const [postData, setPostData] = useState({
    caption: "",
    image: null,
  });
  const posts = useSelector((state) => state.post.posts);

  const searchpost = useSelector((state) => state.post.searchpost);
  const searchpostmsg = useSelector((state) => state.post.searchpostmsg);
  const searchpostloading = useSelector(
    (state) => state.post.searchpostloading
  );

  const userDetails = useSelector((state) => state.post.userDetails);


  const savedmsg = useSelector((state) => state.post.savedmsg);
  const savedsuccess = useSelector((state) => state.post.savedsuccess);

  const { commentmsg, commentsuceess, likesuccess, likemsg } = useSelector(
    (state) => state.post
  );
  useEffect(() => {
    if (commentsuceess && commentmsg.trim() !== "") {
      toast.success(commentmsg);
    }
  }, [commentsuceess]);

  useEffect(() => {
    setTimeout(() => {
      if (searchpostloading) setAllPost(searchpost);
      else setAllPost(posts);

      if (showpostupdate) {
        window.location.reload();
      }
    }, 2000);
  }, [posts, showpostupdate, searchpost, searchpostloading]);

  const dispatch = useDispatch();
  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        // Set the previewImage to the data URL of the selected image
        setPreviewImage(e.target.result);
      };

      reader.readAsDataURL(file); // Read the selected file as a data URL

      setPostData({
        ...postData,
        image: file,
      });
    }
  };

  const openComment = (postId) => {
    setCommentOpenSection((prevId) => (prevId === postId ? null : postId));
  };

  const openSaved = () => {
    navigate("/setting");
  };
  const addComment = (sectionId) => {
    setCommentModal((prevSections) => ({
      // ...prevSections,
      [sectionId]: !prevSections[sectionId],
    }));
  };

  const savePost = (postId) => {
    setLoadingState((prev) => !prev);
    dispatch(savedpost(postId));
  };
  const postComment = ({ postId, commentText }) => {
    if (commentText.trim() === "") {
      return;
    }

    dispatch(addComments({ postId, commentText }));
  };
  const ImageSave = () => {
    setImageSave(true);
    if (postData.caption.trim() === "") {
      return;
    }
    if (postData.image === null) {
      return;
    }

    dispatch(createPost(postData));
    setShowPostUpdate(true);
  };
  const { error, success, createmg, createsuccess } = useSelector(
    (state) => state.post
  );
  const { errorsignin, successsignin } = useSelector((state) => state.user);

  const { followsuccess, followmsg } = useSelector((state) => state.post);


  useEffect(() => {
    if (createsuccess == true) {
      setCloseModal(true);
      toast.success(createmg);
    }
  }, [createmg]);

  useEffect(() => {
    dispatch(getAllPost());

    if (showpostupdate) {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }, [loadingstate, showpostupdate]);

  const dashboard = useSelector((state) => state.post.dashboard);

  const handleFollow = (userId) => {
    dispatch(followUser(userId));
  };

  useEffect(() => {
    if (!dashboard) {
      if (successsignin === false && errorsignin !== "") {
        toast.error(errorsignin);
      } else if (successsignin === true) {
        toast.success(errorsignin);
      }
    }
  }, [successsignin, errorsignin]);

  const ImageBack = () => {
    setImageSave(false);
  };

  const openUpload = () => {
    setIsOpen(true);
  };

  const closeUpload = () => {
    setIsOpen(false);
  };

  const handleLike = (postId) => {
    // Dispatch the action to like the post
    setLoadingState((prev) => !prev);
    dispatch(addLikes(postId.postId));
  };

  const navigate = useNavigate();

  const handleCaptionChange = (event) => {
    setPostData({
      ...postData,
      caption: event.target.value,
    });
  };

  const handleprofile = (username) => {
    navigate(`/${username}`);
  };


  return (
    <div className="dashboard_wrapper">
      <div className="dashboard_wrapper_00">
        <Navbar />
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
              <span onClick={openSaved}>
                <BsBookmarkFill /> Saved
              </span>
            </section>
          </div>

          <div className="dashboard_story_wrapper_mid">
            <div className="dashboard_story_wrapper">
              <section>
                <img src={userDetails?.profileimg?.url} />
                <span>{userDetails?.username}</span>
              </section>
            </div>

            {allPost.map((post) => (
              <div className="post_wrapper_00" key={post._id}>
                <div className="post_wrapper_01">
                  <div className="post_wrapper_011">
                    <img
                      src={post?.postedBy?.profileimg?.url}
                      alt="User Profile"
                      onClick={() => handleprofile(post?.postedBy?.username)}
                    />
                    <section>
                      <span>{post?.postedBy?.username}</span>
                      <span style={{ fontWeight: "400" }}>
                        {moment(post?.createdAt).fromNow()}
                      </span>
                    </section>
                    <span onClick={() => handleFollow(post?.postedBy?._id)}>
                      {post?.postedBy?.followers.includes(userDetails._id)
                        ? "Unfollow"
                        : "Follow"}
                    </span>
                  </div>

                  <FiMoreHorizontal
                    style={{ color: "white", cursor: "pointer" }}
                  />
                </div>

                <div className="post_wrapper_02">
                  <img src={post.image.url} alt="Post Image" />
                </div>
                <div className="post_wrapper_03">
                  <section>
                    <span>
                      <img
                        src={
                          post.likes.includes(userDetails._id) ? redHeart : Like
                        }
                        alt="Like"
                        onClick={() => handleLike({ postId: post._id })}
                      />

                      <img
                        src={Comment}
                        alt="Comment"
                        onClick={() => addComment(post._id)}
                      />

                      <img src={Share} alt="Share" />
                    </span>
                    {post.SavedBy.includes(userDetails._id) && (
                      <BsBookmarkFill
                        style={{
                          color: "white",
                          fontSize: "25px",
                          cursor: "pointer",
                        }}
                        onClick={() => savePost(post._id)}
                      />
                    )}
                    {!post.SavedBy.includes(userDetails._id) && (
                      <BsBookmark
                        style={{
                          color: "white",
                          fontSize: "25px",
                          cursor: "pointer",
                        }}
                        onClick={() => savePost(post._id)}
                      />
                    )}
                  </section>

                  <span>{post.likes.length} Likes</span>

                  <p>
                    <strong style={{ fontWeight: "bold" }}>
                      {post?.postedBy?.username + " "}
                    </strong>
                    {post.caption}
                    {/* <strong style={{ color: "#989898" }}>more</strong> */}
                  </p>
                  <h5 onClick={() => openComment(post._id)}>
                    View all {post.comments.length} comments
                  </h5>
                  {commentopensection === post._id &&
                    post.comments.map((item, index) => (
                      <div key={index}>
                        <h5
                          style={{
                            color: "#d2cbcb",
                            marginLeft: "10px",
                            fontSize: "14px",
                            borderTop: "1px solid lightgray",
                            borderLeft: "1px solid lightgray",
                          }}
                        >
                          {`By ${item.userId.username} : `}
                          <span style={{ color: "gray" }}>{item.text}</span>
                        </h5>
                      </div>
                    ))}

                  {commentModal[post._id] && !commentsuceess && (
                    <div className="comment_modal_wrapper">
                      <section>
                        <img src={emoji} />
                        <textarea
                          style={{
                            background: "transparent",
                            border: "none",
                            boxSizing: "border-box",
                            outline: "none",
                            width: "74%",
                            minHeight: "25px",
                            color: "white",
                          }}
                          placeholder="Your text here..."
                          value={commentText[post._id]} // by this only for particular commenttext is written on selected post
                          onChange={handleCommentChange}
                        />

                        <button
                          onClick={() =>
                            postComment({
                              postId: post._id,
                              commentText: commentText,
                            })
                          }
                        >
                          Post
                        </button>
                      </section>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="dashboard_story_wrapper_right">
            <section>
              <div className="post_wrapper_01">
                <div className="post_wrapper_011">
                  <img src={userDetails?.profileimg?.url} />
                  <section>
                    <span>{userDetails?.username}</span>
                    <span style={{ fontWeight: "400" }}>Delhi , India</span>
                  </section>
                </div>
                <FiSettings
                  style={{ color: "white", cursor: "pointer" }}
                  onClick={openSetting}
                />
              </div>
            </section>
          </div>
        </div>
      </div>
      {isopen && !closemodal && (
        <div className="modal_wrapper">
          <div className="upload_modal">
            <span onClick={closeUpload}>
              <AiOutlineClose />
            </span>
            <div className="upload_wrapper_01">Upload a post</div>
            <p></p>

            {/* File input for image selection */}

            {!previewImage && (
              <label htmlFor="fileInput">
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
                <FaImages style={{ color: "white", fontSize: "90px" }} />
                <h2>Drag your photos here</h2>
              </label>
            )}

            {/* Display the image preview */}
            {previewImage && !imagesave && (
              <div className="upload_image_00">
                <div className="upload_image-preview">
                  <img src={previewImage} alt="Preview" />
                </div>
                <button
                  className="upload_image-preview_button"
                  onClick={ImageSave}
                >
                  Save & Next
                </button>
              </div>
            )}

            {imagesave && (
              <div className="caption_image_00">
                <textarea
                  style={{
                    background: "transparent",
                    color: "white",
                    minHeight: "200px",
                    marginBottom: "30px",
                    outline: "none",
                    border: "1px solid white",
                    padding: "5px",
                    width: "100%",
                  }}
                  placeholder="Write your caption here...."
                  value={postData.caption}
                  onChange={handleCaptionChange}
                />
                <button
                  className="upload_image-preview_button"
                  onClick={ImageBack}
                >
                  Back
                </button>
                <button
                  className="upload_image-preview_button"
                  onClick={ImageSave}
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
