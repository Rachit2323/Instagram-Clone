import React from 'react';
import ReactDOM from 'react-dom'; // Use the correct import statement
import './index.css';
import App from './App';
import { store } from './store'; // Correct the import path
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
