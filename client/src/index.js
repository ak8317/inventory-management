import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from './context/context';
import App from './App';

const container = document.getElementById('root');
ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  container
);
