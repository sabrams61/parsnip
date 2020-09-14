import { composeWithDevTools } from 'redux-devtools-extension';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from './middleware/logger';
import analytics from "./middleware/analytics";
import apiMiddleware from "./middleware/api";
import tasks from './reducers';
import App from './App';
import './index.css';
import './css/input.css';

const rootReducer = (state = {}, action) => {
  return {
    tasks: tasks(state.tasks, action),
  };
};

const store = createStore(
  rootReducer, 
  composeWithDevTools(applyMiddleware(thunk, apiMiddleware, logger, analytics))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
