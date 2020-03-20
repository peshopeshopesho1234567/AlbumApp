import React from 'react';
import { connect } from 'react-redux';

import { 
  addImageToFavourites, 
  removeImageFromFavourites,
  setIsImageFaved
} from '../store/actions/actionCreators';

const Images = ({ images, addImageToFavourites, removeImageFromFavourites, setIsImageFaved }) => (
  <div>
    {images && images.map(image => (
      <div key={image.url}>
        <img src={image.thumbnailUrl} />
        <p>{image.title}</p>
        <button onClick={() => {
          if (image.isFavorited) {
            removeImageFromFavourites(image);
          } else {
            addImageToFavourites(image);
          }
          setIsImageFaved({ image, isFavorited: !image.isFavorited });
        }}>{!image.isFavorited ? 'Favorite' : 'Unfavorite'}</button>
      </div>
    ))}
  </div>
);

const mapDispatchToProps = { 
  addImageToFavourites, 
  removeImageFromFavourites,
  setIsImageFaved
};

export default connect(null, mapDispatchToProps)(Images);
