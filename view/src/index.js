import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux'
import navReducer from './Reducers/navReducer/navReducer';
import coursesReducer from './Reducers/coursesReducer/coursesReducer';
import lessonsReducer from './Reducers/lessonsReducer/lessonsReducer';
import lessonsOrderReducer from './Reducers/lessonsOrderReducer/lessonsOrderReducer';

const reducer = combineReducers({
  navData: navReducer,
  coursesData: coursesReducer,
  lessonsData: lessonsReducer,
  lessonsOrderData: lessonsOrderReducer,
})

const store = configureStore({
  reducer
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
