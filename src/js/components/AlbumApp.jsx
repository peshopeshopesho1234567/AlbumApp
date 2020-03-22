import React, { Component } from "react";
import { connect } from 'react-redux';
import axios from 'axios';

import Header from './Header.jsx';
import Albums from './Albums.jsx';
import Images from './Images.jsx';

import { addData } from '../store/actions/actionCreators';

class AlbumApp extends Component {

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

export default connect(mapStateToProps, mapDispatchToProps)(AlbumApp);
