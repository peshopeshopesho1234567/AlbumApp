import React from 'react';

const Albums = ({ albums, handleAlbumSelect }) => (
  <div style={{ 
      float: 'left', 
      background: 'steelblue', 
      width: '10vw',
      height: '100vh', 
      boxSizing: 'border-box', 
      margin: 0, 
      padding: 0,
      overflowY: 'scroll'
    }}>
    {
      albums &&
      Object.keys(albums).map(albumId =>
        <div key={albumId} onClick={() => handleAlbumSelect(albumId)}>{albumId}</div>
      )
    }
  </div>
);

export default Albums;
