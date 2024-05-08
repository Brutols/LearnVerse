import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

import navReducer from './Reducers/navReducer/navReducer';
import coursesReducer from './Reducers/coursesReducer/coursesReducer';
import lessonsReducer from './Reducers/lessonsReducer/lessonsReducer';
import lessonsOrderReducer from './Reducers/lessonsOrderReducer/lessonsOrderReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['navData'],
};

const rootReducer = combineReducers({
  navData: navReducer,
  coursesData: coursesReducer,
  lessonsData: lessonsReducer,
  lessonsOrderData: lessonsOrderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer
});

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);
