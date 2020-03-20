import React from 'react';

const Albums = ({ albums, handleAlbumSelect }) => (
  <div className="albumsContainer">
    {
      albums &&
      Object.keys(albums).map(albumId =>
        <div 
          key={albumId} 
          className="album"
          onClick={() => handleAlbumSelect(albumId)}
        >{`Album ${albumId}`}</div>
      )
    }
  </div>
);

export default Albums;
