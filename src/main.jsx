/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// eslint-disable-next-line import/no-named-as-default
// import reportWebVitals from './reportWebVitals';
import { store } from './store/Store';
import App from './App';
import './data';

// const container = document.getElementById('root');
// const root = createRoot(container);


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
)

// reportWebVitals();