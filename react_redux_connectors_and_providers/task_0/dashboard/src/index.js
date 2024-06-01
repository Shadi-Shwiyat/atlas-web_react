import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App.js';
import './styles/styles.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import uiReducer from './reducers/uiReducer.js';

// Create a Redux store using the uiReducer
const store = createStore(uiReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <div className='app'>
        <App />
      </div>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
