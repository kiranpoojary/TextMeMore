import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App'
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* <Login2 /> */}
    {/* <Login /> */}
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
