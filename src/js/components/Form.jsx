import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createStore } from 'redux';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import axios from 'axios';

import { PersistGate } from 'redux-persist/integration/react';

import Header from './Header.jsx';
import Albums from './Albums.jsx';
import Images from './Images.jsx';

import albumAppReducer from '../store/reducers/reducers';
import { addData } from '../store/actions/actionCreators';

import '../../styles/app.css';


const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, albumAppReducer);

const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

let persistor = persistStore(store);

class Form extends Component {

  componentDidMount() {
    const { albums } = this.props;
    if (!albums) {
      axios.get('https://jsonplaceholder.typicode.com/photos')
        .then(res => {
          this.props.addData(res.data);
        });
    }
  }

  render() {
    return (
      <div>
        <Header />
        <Albums />
        <Images />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  albums: state.albums,
});

const mapDispatchToProps = { addData };

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(Form);
export default ConnectedForm;

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedForm />
    </PersistGate>
  </Provider>
  , wrapper) : false;
