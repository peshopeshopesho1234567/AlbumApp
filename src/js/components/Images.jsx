import React from 'react';
import { connect } from 'react-redux';

import { 
  addImageToFavourites, 
  removeImageFromFavourites,
  setIsImageFaved,
  setImageFaved,
  setImageUnfaved
} from '../store/actions/actionCreators';

const Images = ({ images, addImageToFavourites, removeImageFromFavourites, setImageFaved, setImageUnfaved }) => (
  <div>
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
  setIsImageFaved,
  setImageFaved,
  setImageUnfaved
};

export default connect(null, mapDispatchToProps)(Images);
