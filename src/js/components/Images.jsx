import React from 'react';
import { connect } from 'react-redux';

import { addImageToFavourites } from '../store/actions/actionCreators';

const Images = ({ images, addImageToFavourites }) => (
  <div>
    {images && images.map(image => (
      <div key={image.url}>
        <img src={image.thumbnailUrl} />
        <p>{image.title}</p>
        <button onClick={() => addImageToFavourites(image)}>{!image.isFavorited ? 'Favorite' : 'Unfavorite'}</button>
      </div>
    ))}
  </div>
);

const mapDispatchToProps = { addImageToFavourites };

export default connect(null, mapDispatchToProps)(Images);
