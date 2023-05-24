import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/App';
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
// import './index.css';

const el = document.getElementById('root');

const root = ReactDOM.createRoot(el);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancer(applyMiddleware(thunk)));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);