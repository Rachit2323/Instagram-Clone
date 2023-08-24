

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Reducers/auth'; // Make sure to provide the correct path

const store = configureStore({
  reducer: {
    auth: authReducer,
    // You can add more reducers here if needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(/* any additional middleware you want */),
});

export default store;
