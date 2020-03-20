import React from 'react';

import Tile from './Tile.jsx';

const Images = ({ images, addImageToFavourites, removeImageFromFavourites, setImageFaved, setImageUnfaved }) => (
  <div style={{ 
      float: 'right', 
      background: 'tomato',
      width: '90vw', 
      height: '100vh', 
      boxSizing: 'border-box', 
      margin: 0, 
      padding: 0,
      overflowY: 'scroll'
    }}>
    {images && images.map(image => (
        <Tile
          key={image.url}
          image={image}
        />
    ))}
  </div>
);

export default Images;
