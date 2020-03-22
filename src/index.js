import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import { store, persistor } from './js/store/store';

import { PersistGate } from 'redux-persist/integration/react';
import AlbumApp from './js/components/AlbumApp.jsx';

import 'normalize.css';

const wrapper = document.getElementById("container");
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AlbumApp />
    </PersistGate>
  </Provider>
  , wrapper);