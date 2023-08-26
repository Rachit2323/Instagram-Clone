

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Reducers/auth'; 

const store = configureStore({
  reducer: {
    user: authReducer,
  },

});

export default store;
