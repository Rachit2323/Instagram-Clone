

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  token: '',
  loading: false,
  error: '',
  success:false
};

export const signupUser = createAsyncThunk(
  'signupuser',
  async (body) => {
console.log('signin',body);
    try {
      const result = await fetch('http://localhost:5000/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await result.json(); // Parse response JSON
   
      return data; // Return the parsed JSON data
    } catch (error) {
      return { error: error.message }; // Handle error
    }
  }
);

export const signinUser = createAsyncThunk(
  'signinuser',
  async (body) => {
    // console.log('signin',body);
    try {
      const result = await fetch('http://localhost:5000/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await result.json(); // Parse response JSON
      // console.log('res',data);
      return data; // Return the parsed JSON data
    } catch (error) {
      return { error: error.message }; // Handle error
    }
  }
);

const authReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [signupUser.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.error) {
        state.error = action.payload.error;
        state.success=action.payload.success;
      }
      else{
        state.error=action.payload.message;
        state.success=action.payload.success;
      }
    },
    [signupUser.pending]: (state) => {
      state.loading = true;
    },
    [signinUser.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.error) {
        state.error = action.payload.error;
        state.success=action.payload.success;
      }
      else{
        state.error=action.payload.message;
        state.token=action.payload.token;
        state.success=action.payload.success;
      }
    },
    [signinUser.pending]: (state) => {
      state.loading = true;
    },
  },
});

export default authReducer.reducer;
