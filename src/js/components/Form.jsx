import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createStore } from 'redux';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import axios from 'axios';

import albumAppReducer from '../store/reducers/reducers';
import { addData } from '../store/actions/actionCreators';

const store = createStore(albumAppReducer);

class Form extends Component {
  constructor() {
    super();

    this.state = {
      value: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/photos')
      .then(res => {
        this.props.addData(res.data);
      });
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState(() => {
      return {
        value
      };
    });
  }

  render() {
    const { albums, imagesFromSelectedAlbum } = this.props;
    console.log('the images from the selected album in the render method are', imagesFromSelectedAlbum);
    return (
      <div>
        {albums && Object.keys(albums).map(albumId => <div key={albumId}>{albumId}</div>)}
        <div>
          {imagesFromSelectedAlbum && imagesFromSelectedAlbum.map(image => <img key={image.url} src={image.url}/>)}
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

const mapDispatchToProps = { addData };

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(Form);
export default ConnectedForm;

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(
  <Provider store={store}>
    <ConnectedForm />
  </Provider>
  , wrapper) : false;
