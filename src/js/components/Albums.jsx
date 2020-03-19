import React from 'react';

const Albums = ({ albums, handleAlbumSelect }) => (
  <div>
    {
      albums &&
      Object.keys(albums).map(albumId =>
        <div key={albumId} onClick={() => handleAlbumSelect(albumId)}>{albumId}</div>
      )
    }
  </div>
);

export default Albums;
