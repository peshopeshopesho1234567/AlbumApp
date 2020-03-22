import React from 'react';
import { connect } from 'react-redux';

import { selectAlbum } from '../store/actions/actionCreators';

const Albums = ({ albums, selectedAlbumName, albumsWithFavedImages, selectAlbum }) => (
  <div className="albumsContainer">
    {
      albums &&
      Object.keys(albums).reverse().map(albumId =>
        <div
          key={albumId}
          className={`album ${albumId === selectedAlbumName ? 'albumSelected' : ''}`}
          onClick={() => selectAlbum(albumId)}
        >
          {`Album ${albumId}`} {(albumsWithFavedImages[albumId] !== 0) &&
            <span title={`This album has ${albumsWithFavedImages[albumId]} favourite images`}>*</span>}
        </div>
      )
    }
  </div>
);

const mapStateToProps = state => ({
  albums: state.albums,
  selectedAlbumName: state.selectedAlbumName,
  albumsWithFavedImages: state.albumsWithFavedImages
});

const mapDispatchToProps = { selectAlbum };

export default connect(mapStateToProps, mapDispatchToProps)(Albums);
