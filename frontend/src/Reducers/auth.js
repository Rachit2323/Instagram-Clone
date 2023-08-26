
// const initialState = {
//   message: '',
//   error: '',
// };

// const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'SIGNUP_SUCCESS':
//       return { ...state, message: action.payload, error: '' };
//     case 'SIGNUP_ERROR':
//       return { ...state, error: action.payload, message: '' };
//     default:
//       return state;
//   }
// };

// export default authReducer;


//In Create we don't need to use the copy od the state 


// import { createReducer,createSlice  } from '@reduxjs/toolkit';

// const initialState = {
//   message: '',
//   error: '',
// };

// const authReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase('SIGNUP_SUCCESS', (state, action) => {
//       state.message = action.payload;
//       state.error = '';
//     })
//     .addCase('SIGNUP_ERROR', (state, action) => {
//       state.error = action.payload;
//       state.message = '';
//     });
// });

// export default authReducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  token: '',
  loading: false,
  error: '',
};

export const signupUser = createAsyncThunk(
  'signupuser',
  async (body) => {
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
    try {
      const result = await fetch('http://localhost:5000/users/signin', {
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

const authReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [signupUser.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.error) {
        state.error = action.payload.error;
      }
      else{
        state.error=action.payload.message;
      }
    },
    [signupUser.pending]: (state) => {
      state.loading = true;
    },
    [signinUser.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.error) {
        state.error = action.payload.error;
      }
      else{
        state.token=action.payload.token;
      }
    },
    [signinUser.pending]: (state) => {
      state.loading = true;
    },
  },
});

export default authReducer.reducer;
