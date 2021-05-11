import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from './Context/Context';
import { SpeechProvider } from '@speechly/react-client'

ReactDOM.render(
  <SpeechProvider appId="f0433230-ac15-46fd-9e6e-e153da7aed53" language="en-US">
      <Provider>
    <App />
  </Provider>
  </SpeechProvider>,
  
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
