import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createStore } from 'redux';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import axios from 'axios';

import albumAppReducer from '../store/reducers/reducers';
import { addData, selectAlbum } from '../store/actions/actionCreators';

import '../../styles/app.css';

const store = createStore(albumAppReducer);

class Form extends Component {

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/photos')
      .then(res => {
        this.props.addData(res.data);
      });
  }

  handleAlbumSelect(albumId) {
    this.props.selectAlbum(albumId);
  }

  render() {
    const { albums, imagesFromSelectedAlbum } = this.props;
    return (
      <div>
        {albums && Object.keys(albums).map(albumId => <div key={albumId} onClick={this.handleAlbumSelect.bind(this, albumId)}>{albumId}</div>)}
        <div>
          {imagesFromSelectedAlbum && imagesFromSelectedAlbum.map(image => (
            <div key={image.url}>
              <img src={image.thumbnailUrl} />
              <p>{image.title}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    albums: state.albums,
    imagesFromSelectedAlbum: state.imagesFromSelectedAlbum
  }
};

const mapDispatchToProps = { addData, selectAlbum };

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(Form);
export default ConnectedForm;

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(
  <Provider store={store}>
    <ConnectedForm />
  </Provider>
  , wrapper) : false;
