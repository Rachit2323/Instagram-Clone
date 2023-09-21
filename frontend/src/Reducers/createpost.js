// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { useSelector } from "react-redux";

// const initialState = {
//   token: "",
//   loading: false,
//   error: "",
//   success: false,
// };

// export const createPost = createAsyncThunk("createpost", async (body, { getState }) => {
//   const { token } = getState().user; // Access the token from the state

//   try {
//     console.log('rujnning');
//     // const token = useSelector((state) => state.user.token);
//     console.log("tone", token);
//     const result = await fetch("http://localhost:5000/post/createpost", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `${token}`,
//       },
//       body: JSON.stringify(body),
//     });
//     console.log(result);
//     const data = await result.json();
//     console.log("res", data);
//     return data;
//   } catch (error) {
//     return { error: error.message };
//   }
// });

// const postReducer = createSlice({
//   name: "post",
//   initialState,
//   reducers: {},
//   extraReducers: {
//     [createPost.fulfilled]: (state, action) => {
//       // console.log("axtion", action, action.payload.token);
//       state.loading = false;
//       if (action.payload.error) {
//         state.error = action.payload.error;
//         state.success = action.payload.success;
//       } else {
//         state.error = action.payload.message;
//         state.success = action.payload.success;
//         state.token = action.payload.token; // Set the token in the state
//       }
//     },
//     [createPost.pending]: (state) => {
//       state.loading = true;
//     },
//   },
// });

// export default postReducer.reducer;
