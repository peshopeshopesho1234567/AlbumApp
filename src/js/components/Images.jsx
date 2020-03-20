import React from 'react';
import { connect } from 'react-redux';

import { 
  addImageToFavourites, 
  removeImageFromFavourites,
  setImageFaved,
  setImageUnfaved
} from '../store/actions/actionCreators';

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
      <div key={image.url}>
        <img src={image.thumbnailUrl} />
        <p>{image.title}</p>
        <button onClick={() => {
          if (image.isFavorited) {
            removeImageFromFavourites(image);
            setImageUnfaved(image);
          } else {
            addImageToFavourites(image);
            setImageFaved(image);
          }
        }}>{!image.isFavorited ? 'Favorite' : 'Unfavorite'}</button>
      </div>
    ))}
  </div>
);

const mapDispatchToProps = { 
  addImageToFavourites, 
  removeImageFromFavourites,
  setImageFaved,
  setImageUnfaved
};

export default connect(null, mapDispatchToProps)(Images);
