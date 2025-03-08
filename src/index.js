import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
const containerStyles = css`
  min-height: 100vh;
  background-color: #f3f4f6; /* Light background for visibility */
  padding-top: 135px; /* Explicitly set to 10rem in px */
  box-sizing: border-box; /* Ensure padding is included in height */
  @apply pt-40; /* Tailwind fallback */
`;