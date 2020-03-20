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
        <div 
          key={albumId} 
          style={{ cursor: 'pointer', boxSizing: 'border-box', margin: '5px 0px', textAlign: 'center' }}
          onClick={() => handleAlbumSelect(albumId)}
        >{`album_${albumId}`}</div>
      )
    }
  </div>
);

export default Albums;
