import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
 const API="https://ins01.onrender.com/";
// const API = "http://localhost:4000/";
const initialState = {
  posts: [],
  postsone: [],
  searchpost:[],
  searchpostmsg:"",
  searchpostloading:false,
  loading: false,
  error: "",
  createmg: "",
  createsuccess: false,
  success: false,
  comment: "",
  commentmsg: "",
  commentsuceess: false,
  likemsg: "",
  likesuccess: false,
  savedsuccess: false,
  savedmsg: "",
  userDetails: "",
  mysavedpost: [],
  mysavedpostmsg: "",
};

export const createPost = createAsyncThunk(
  "createpost",
  async ({ caption, image }) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("file", image);

      const result = await fetch(`${API}post/createpost`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData, // Use formData for sending the image
      });

      const data = await result.json();

      return data;
    } catch (error) {
      return { error: error.message };
    }
  }
);

export const getAllPost = createAsyncThunk("getAllpost", async () => {
  try {
    const token = localStorage.getItem("token");

    const result = await fetch(`${API}post/allpost`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await result.json();

    return data;
  } catch (error) {
    return { error: error.message };
  }
});

export const getSearchPost = createAsyncThunk("getSearchPost", async (user) => {
  try {
    const token = localStorage.getItem("token");

    const result = await fetch(`${API}post/searchpost`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    });

    const data = await result.json();


    return data;
  } catch (error) {
    return { error: error.message };
  }
});

export const getOnePost = createAsyncThunk("getOnepost", async () => {
  try {
    const token = localStorage.getItem("token");

    const result = await fetch(`${API}post/mypost`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        
      },
    });

    const data = await result.json();

    return data;
  } catch (error) {
    return { error: error.message };
  }
});

export const addComments = createAsyncThunk(
  "addcomments",
  async ({ postId, commentText }) => {
    try {
      console.log(postId, commentText);
      const token = localStorage.getItem("token");

      const result = await fetch(`${API}post/addComment`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId, commentText }),
      });

      const data = await result.json();
      return data;
    } catch (error) {
      return { error: error.message };
    }
  }
);

export const addLikes = createAsyncThunk("addLikes", async (postId) => {
  try {
    const token = localStorage.getItem("token");
    const result = await fetch(`${API}post/postlike`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId }),
    });

    const data = await result.json();

    return data;
  } catch (error) {
    return { error: error.message };
  }
});

export const savedpost = createAsyncThunk("savedpost", async (postId) => {
  try {
    const token = localStorage.getItem("token");
    const result = await fetch(`${API}post/savepost`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId }),
    });

    const data = await result.json();

    return data;
  } catch (error) {
    return { error: error.message };
  }
});

export const mysavedpostall = createAsyncThunk(
  "mysavedpostall",
  async (postId) => {
    try {
      const token = localStorage.getItem("token");
      const result = await fetch(`${API}post/mysavepost`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });

      const data = await result.json();

      return data;
    } catch (error) {
      return { error: error.message };
    }
  }
);

export const deletePost = createAsyncThunk("deletePost", async (postId) => {
  try {
    const token = localStorage.getItem("token");
    const result = await fetch(`${API}post/deletepost`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId }),
    });

    const data = await result.json();

    return data;
  } catch (error) {
    return { error: error.message };
  }
});

export const editPost = createAsyncThunk(
  "editPost",
  async ({ postId, finalupdate }) => {
    try {
      const token = localStorage.getItem("token");

      const result = await fetch(`${API}post/editpost`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId, finalupdate }),
      });

      const data = await result.json();

      return data;
    } catch (error) {
      return { error: error.message };
    }
  }
);

const postReducer = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.error) {
        state.createmg = action.payload.error;
        state.createsuccess = action.payload.success;
      } else {
        state.createmg = action.payload.message;
        state.createsuccess = action.payload.success;
      }
    },
    [createPost.pending]: (state) => {
      state.loading = true;
    },
    [getAllPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;

      if (action.payload.error) {
        state.error = action.payload.error;
      } else {
        state.posts = action.payload.allpost;
        state.userDetails = action.payload.userDetails;
      }
    },
    [getAllPost.pending]: (state) => {
      state.loading = true;
    },
    [getAllPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    [getOnePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;

      if (action.payload.error) {
        state.error = action.payload.error;
      } else {
        state.postsone = action.payload.allpost;
      }
    },
    [getOnePost.pending]: (state) => {
      state.loading = true;
    },
    [getOnePost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    [addComments.fulfilled]: (state, action) => {
      state.loading = false;
      state.commentsuceess = action.payload.success;

      if (action.payload.error) {
        state.error = action.payload.error;
      } else {
        state.comment = action.payload.comment;
        state.commentmsg = action.payload.message;
      }
    },
    [addComments.pending]: (state) => {
      state.loading = true;
    },
    [addComments.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [addLikes.fulfilled]: (state, action) => {
      state.loading = false;
      state.likesuccess = action.payload.success;

      if (action.payload.error) {
        state.error = action.payload.error;
      } else {
        state.likemsg = action.payload.message;
        if (state.likemsg === "Post Unliked") {
          state.likesuccess = false;
        }
      }
    },
    [addLikes.pending]: (state) => {
      state.loading = true;
    },
    [addLikes.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [savedpost.fulfilled]: (state, action) => {
      state.loading = false;
      state.savedsuccess = action.payload.success;

      if (action.payload.error) {
        state.error = action.payload.error;
      } else {
        state.savedmsg = action.payload.message;
        if (state.savedmsg === "Post Removed from save") {
          state.savedsuccess = false;
        }
      }
    },
    [savedpost.pending]: (state) => {
      state.loading = true;
    },
    [savedpost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [mysavedpostall.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;

      if (action.payload.error) {
        state.mysavedpostmsg = action.payload.error;
      } else {
        state.mysavedpost = action.payload.allpost;
      }
    },
    [mysavedpostall.pending]: (state) => {
      state.loading = true;
    },
    [mysavedpostall.rejected]: (state, action) => {
      state.loading = false;
      state.mysavedpostmsg = action.payload.error;
    },
    [getSearchPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;

      if (action.payload.error) {
        state.searchpostmsg = action.payload.error;
      } else {
        state.searchpost = action.payload.allpost;
        state.searchpostmsg=action.payload.message;
        state.searchpostloading=action.payload.success;
      }
    },
    [getSearchPost.pending]: (state) => {
      state.loading = true;
    },
    [getSearchPost.rejected]: (state, action) => {
      state.loading = false;
      state.searchpostmsg = action.payload.error;
    },

    
  },
});

export default postReducer.reducer;
