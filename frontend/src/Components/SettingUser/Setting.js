import React, { useState, useEffect } from "react";
import "./Setting.css";
import Navbar from "../Navbar/Navbar.js";
import mine from "./Icons/mineee.jpg";
import post from "./Icons/post.svg";
import save from "./Icons/Saved.svg";

import { useDispatch, useSelector } from "react-redux";
import savefill from "./Icons/savedfilled.svg";
import postfill from "./Icons/postfilled.svg";
import { AiOutlineCloudUpload } from "react-icons/ai";
import {
  getOnePost,
  mysavedpostall,
  deletePost,
  editPost,
  getAllPost,
  Profileupdate
} from "../../Reducers/createpost.js";

const Setting = () => {
  const [highlightedtype, setHightlightType] = useState(1);
  const [allPost, setAllPost] = useState([]);
  const [mysavedpost, setMySavedPost] = useState([]);
  const [editpostactivate, setEditPostActivate] = useState(false);
  const [editedCaption, setEditedCaption] = useState("");
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);


  const dispatch = useDispatch();
  const EditPost = (postId) => {
    setSelectedPostId(postId);
    setEditPostActivate((prev) => !prev);
  };

  const submitCaption = (postID) => {
    dispatch(editPost({ postId: postID, finalupdate: editedCaption }));
    setEditPostActivate((prev) => !prev);
    setSelectedPostId();
  };

  const DeletePost = (postID) => {
    dispatch(deletePost(postID));
  };
  useEffect(() => {
    dispatch(getAllPost());
  }, []);

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
  

  const userDetails = useSelector((state) => state.post.userDetails);



  // const userDetails = useSelector((state) => state.post.userDetails);
  

  const posts = useSelector((state) => state.post.postsone);
  const mysavedposts = useSelector((state) => state.post.mysavedpost);
  const username = userDetails.username;


  useEffect(() => {
    setMySavedPost(mysavedposts);
  }, [mysavedposts]);

  useEffect(() => {
    setAllPost(posts);
  }, [posts]);

  useEffect(() => {
    dispatch(getOnePost());
    dispatch(mysavedpostall());
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
          <div className="image_upload_user">
          <label htmlFor="fileInput">
            <img src={userDetails?.profileimg?.url} />
            <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
            <AiOutlineCloudUpload />
            </label>
          </div>
          <section>
            <span>{username}</span>

            <section>
              <span>{allPost.length} post</span>
              <span>{userDetails?.followers?.length} Followers</span>
              <span>{userDetails?.following?.length} Followings</span>
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
                <section>
                  <button onClick={() => EditPost(post._id)}>Edit</button>
                  <button onClick={() => DeletePost(post._id)}>Delete</button>
                </section>
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
                      {selectedPostId === post._id ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <input
                            type="text"
                            value={editedCaption}
                            style={{
                              background: "transparent",
                              color: "white",
                              border: "1px solid white",
                              outline: "none",
                            }}
                            placeholder="Add here.."
                            onChange={(e) => {
                              setEditedCaption(e.target.value);
                            }}
                          />
                          <button
                            style={{
                              color: "white",
                              border: "1px solid white",
                              borderRadius: "10px",
                              boxSizing: "border-box",
                              padding: "4px",
                            }}
                            onClick={() => submitCaption(post._id)}
                          >
                            {" "}
                            Submit{" "}
                          </button>
                        </div>
                      ) : (
                        post?.caption
                      )}
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

export default Setting;
