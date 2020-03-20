import React from 'react';

import Tile from './Tile.jsx';

const Images = ({ images, addImageToFavourites, removeImageFromFavourites, setImageFaved, setImageUnfaved }) => (
  <div className="imagesContainer">
    {images && images.map(image => (
        <Tile
          key={image.url}
          image={image}
        />
    ))}
  </div>
);

export default Images;
