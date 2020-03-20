import React from 'react';
import { connect } from 'react-redux';

const Albums = ({ albums, selectedAlbumName, handleAlbumSelect }) => (
  <div className="albumsContainer">
    {
      albums &&
      Object.keys(albums).map(albumId =>
        <div 
          key={albumId} 
          className={`album ${albumId === selectedAlbumName ? 'albumSelected' : ''}`}
          onClick={() => handleAlbumSelect(albumId)}
        >{`Album ${albumId}`}</div>
      )
    }
  </div>
);

const mapStateToProps = state => ({
  selectedAlbumName: state.selectedAlbumName
});

export default connect(mapStateToProps)(Albums);
