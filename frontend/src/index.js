import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store'; // Import the store from the created file
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="431980266310-k4b3dj9i3rqpmqag7bukt5b66h77pnae.apps.googleusercontent.com">.
    <App />
    </GoogleOAuthProvider>
  </Provider>,

  document.getElementById('root')
);
