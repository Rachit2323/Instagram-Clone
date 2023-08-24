import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const host = `http://localhost:5000`;
const initialState = {
  token: "",
  loading: false,
  error: ""
};

export const signupUser = createAsyncThunk("signupuser", async (body) => {
    try {
      console.log('rin',body);
      const result = await fetch(`${host}/users/signup`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      if (!result.ok) {
        const responseText = await result.text();
        throw new Error(`Network response was not ok: ${result.status} ${result.statusText} - ${responseText}`);
      }
  
      return await result.json();
    } 
    catch (error) {
      console.error('An error occurred while making the network request:', error.message);
      throw error; // Rethrow the error to propagate it to the action
    }
  });
  
const authReducer = createSlice({
  name: "user",
  initialState, // Corrected the typo here
  reducers: {},
  extraReducers: {
    [signupUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = ""; // Clear the error when the request is successful
      state.token = action.payload.token; // Assuming the API response includes a token field
    },
    [signupUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message || "An error occurred"; // Display a generic error message if no specific message is available
    },
    [signupUser.pending]: (state, action) => {
      state.loading = true;
      state.error = ""; // Clear the error when a new request starts
    }
  }
});

export default authReducer.reducer;
