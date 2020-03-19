import React from 'react';

const Images = ({ images }) => (
  <div>
    {images && images.map(image => (
      <div key={image.url}>
        <img src={image.thumbnailUrl} />
        <p>{image.title}</p>
      </div>
    ))}
  </div>
);

export default Images;
