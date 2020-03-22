import React from 'react';
import { connect } from 'react-redux';

const Albums = ({ albums, selectedAlbumName, albumsWithFavedImages, handleAlbumSelect }) => (
  <div className="albumsContainer">
    {
      albums &&
      Object.keys(albums).map(albumId =>
        <div 
          key={albumId} 
          className={`album ${albumId === selectedAlbumName ? 'albumSelected' : ''}`}
          onClick={() => handleAlbumSelect(albumId)}
      >{`Album ${albumId}`} {(albumsWithFavedImages[albumId] !== 0) && <span title="This album has favourite images">*</span>}</div>
      )
    }
  </div>
);

const mapStateToProps = state => ({
  selectedAlbumName: state.selectedAlbumName,
  albumsWithFavedImages: state.albumsWithFavedImages
});

export default connect(mapStateToProps)(Albums);
