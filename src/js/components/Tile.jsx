import React from 'react';
import { connect } from 'react-redux';
import Image from "react-graceful-image";

import {
  addImageToFavourites,
  removeImageFromFavourites,
  setImageFaved,
  setImageUnfaved
} from '../store/actions/actionCreators';

const Tile = ({ image, addImageToFavourites, removeImageFromFavourites, setImageFaved, setImageUnfaved }) => (
  <div style={{ float: 'left', width: '150px', margin: '10px' }}>
    {/* <Image
      src={image.thumbnailUrl}
      width="150"
      height="150"
      alt="My awesome image"
    /> */}
    <img src={image.thumbnailUrl} />
    <h5 style={{ height: '10px', margin: 0, textAlign: 'center' }}>{image.title}</h5>
    <button
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
  </div>
);

const mapDispatchToProps = {
  addImageToFavourites,
  removeImageFromFavourites,
  setImageFaved,
  setImageUnfaved
};

export default connect(null, mapDispatchToProps)(Tile);
