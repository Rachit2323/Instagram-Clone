import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Reducers/auth'; 
import postReducer from './Reducers/createpost';

const store = configureStore({
  reducer: {
    user: authReducer,
    post: postReducer, 
  },
});

export default store;
