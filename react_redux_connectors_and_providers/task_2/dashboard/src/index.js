import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App.js';
import './styles/styles.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';
import uiReducer from './reducers/uiReducer.js';

// Create a Redux store using the uiReducer and apply redux-thunk middleware
const store = createStore(uiReducer, applyMiddleware(thunk));

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
