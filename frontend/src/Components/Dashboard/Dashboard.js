import React, { useState, useEffect } from "react";
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
import moment from "moment";
import emoji from "./Icons/emoji.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaSquarePlus } from "react-icons/fa6";
import { AiFillHome, AiOutlineClose } from "react-icons/ai";
import { FaImages } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import { IoIosLogOut } from "react-icons/io";
import {
  createPost,
  getAllPost,
  addComments,
} from "../../Reducers/createpost.js";

const Dashboard = () => {
  const [searchText, setSearchText] = useState("");
  const [isopen, setIsOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [imagesave, setImageSave] = useState(false);
  const [closemodal, setCloseModal] = useState(false);
  const [commentModal, setCommentModal] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [allPost, setAllPost] = useState([]); // Initialize allPost state
  const [commentopensection, setCommentOpenSection] = useState(false);

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const [postData, setPostData] = useState({
    caption: "",
    image: null,
  });
  const posts = useSelector((state) => state.post.posts);

  const { commentmsg, comment, commentsuceess } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    if (commentsuceess && commentmsg.trim() !== "") {
      toast.success(commentmsg);
    }
  }, [commentsuceess, commentmsg]);

  useEffect(() => {
    setAllPost(posts);
  }, [posts]);
  // console.log(allPost);

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

  const addComment = (sectionId) => {
    setCommentModal((prevSections) => ({
      ...prevSections,
      [sectionId]: !prevSections[sectionId],
    }));
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
  };
  const { error, success } = useSelector((state) => state.post);

  useEffect(() => {
    if (success == true) {
      setCloseModal(true);
      toast.success(error);
    }
  }, [error]);

  useEffect(() => {
    dispatch(getAllPost());
  }, []);

  const ImageBack = () => {
    setImageSave(false);
  };

  const openUpload = () => {
    setIsOpen(true);
  };

  const closeUpload = () => {
    setIsOpen(false);
  };

  const navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate("/");
    toast.success("Logout successfully");
  }

  const handleCaptionChange = (event) => {
    // Update the postData with the caption
    setPostData({
      ...postData,
      caption: event.target.value,
    });
  };

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
                style={{ textAlign: "center", border: "none", outline: "none" }}
              />
              {searchText === "" ? (
                <img src={search} alt="Search" className="search-icon" />
              ) : null}
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

            {allPost.map((post) => (
              <div className="post_wrapper_00" key={post._id}>
                <div className="post_wrapper_01">
                  <div className="post_wrapper_011">
                    <img src={post.image.url} alt="User Profile" />
                    <section>
                      <span>{post.postedBy.username}</span>
                      <span style={{ fontWeight: "400" }}>
                        {moment(post.createdAt).fromNow()}
                      </span>
                      {/* to find the when it was updated */}
                    </section>
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
                      <img src={Like} alt="Like" />
                      <img
                        src={Comment}
                        alt="Comment"
                        onClick={() => addComment(post._id)}
                      />
                      <img src={Share} alt="Share" />
                    </span>
                    <img src={Save} alt="Save" />
                  </section>
                  <span>44,555 Likes</span>
                  <p>
                    <strong style={{ fontWeight: 500 }}>
                      {post.postedBy.username + " Caption "}
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
                          }}
                        >
                          {`By ${item.userId.username} : `}
                          <span style={{ color: "gray" }}>{item.text}</span>
                        </h5>
                      </div>
                    ))}

                  {commentModal[post._id] && !commentsuceess && (
                    <div className="comment_modal_wrapper">
                      <span></span>
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
                          value={commentText}
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
