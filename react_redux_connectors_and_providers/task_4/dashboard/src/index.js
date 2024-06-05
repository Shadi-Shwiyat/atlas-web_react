// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App.js';
import './styles/styles.css';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

// Integrate Redux DevTools extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create a Redux store using the rootReducer and apply redux-thunk middleware
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

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
