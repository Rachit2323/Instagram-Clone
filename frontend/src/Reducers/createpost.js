import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  posts:[],
  loading: false,
  error: "",
  success: false,
  comment:"",
  commentmsg:"",
  commentsuceess:false,
};

export const createPost = createAsyncThunk(
  "createpost",
  async ({ caption, image }) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("file", image);

      const result = await fetch("http://localhost:5000/post/createpost", {
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

export const getAllPost = createAsyncThunk(
  "getAllpost",
  async () => {
    try {
      const token = localStorage.getItem("token");
   
      const result = await fetch("http://localhost:5000/post/allpost", {
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
  }
);




export const addComments = createAsyncThunk(
  "addcomments",
  async ({ postId, commentText }) => {

    try {

      const token = localStorage.getItem("token");
   
      const result = await fetch("http://localhost:5000/post/addComment", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
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


const postReducer = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.error) {
        state.error = action.payload.error;
        state.success = action.payload.success;
      } else {
        state.error = action.payload.message;
        state.success = action.payload.success;
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
      }
    },
    [getAllPost.pending]: (state) => {
      state.loading = true;
    },
    [getAllPost.rejected]: (state, action) => {
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
    

  },
});

export default postReducer.reducer;
