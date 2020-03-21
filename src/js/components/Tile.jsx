import React, { useState } from 'react';
import { connect } from 'react-redux';

import Image from "./Image.jsx";

import {
  addImageToFavourites,
  removeImageFromFavourites,
  setImageFaved,
  setImageUnfaved
} from '../store/actions/actionCreators';

const Tile = ({ image, addImageToFavourites, removeImageFromFavourites, setImageFaved, setImageUnfaved }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <div style={{ float: 'left', width: '150px', margin: '10px' }}>
      <Image
        src={image.thumbnailUrl}
        setImgLoaded={setImgLoaded}
      />
      {imgLoaded && <h5 style={{ height: '10px', margin: 0, textAlign: 'center' }}>{image.title}</h5>}
      {imgLoaded && <button
        className="tile"
        onClick={() => {
          if (image.isFavorited) {
            removeImageFromFavourites(image);
            setImageUnfaved(image);
          } else {
            addImageToFavourites(image);
            setImageFaved(image);
          }
        }}>{!image.isFavorited ? 'Favorite' : 'Unfavorite'}</button>
      }
    </div>
  );
}

const mapDispatchToProps = {
  addImageToFavourites,
  removeImageFromFavourites,
  setImageFaved,
  setImageUnfaved
};

export default connect(null, mapDispatchToProps)(Tile);
