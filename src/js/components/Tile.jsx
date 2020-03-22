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
  const [imgHasFailed, setImgHasFailed] = useState(false);
  const [isImgFaved, setImgFaved] = useState(image.isFavorited);
  return (
    <div style={styles.tile}>
      <Image
        src={image.thumbnailUrl}
        setImgLoaded={setImgLoaded}
        setImgHasFailed={setImgHasFailed}
      />
      {imgLoaded && <h5 style={styles.tileText}>{image.title}</h5>}
      {!imgLoaded && <h5 style={styles.tileText}>The image is currently being loaded...</h5>}
      {imgHasFailed && <h5 style={styles.tileText}>The image has failed to load!</h5>}
      {imgLoaded && <button
        className="tile"
        onClick={() => {
          if (isImgFaved) {
            removeImageFromFavourites(image);
            setImageUnfaved(image);
            setImgFaved(false);
          } else {
            addImageToFavourites(image);
            setImageFaved(image);
            setImgFaved(true);
          }
        }}>{!isImgFaved ? 'Favorite' : 'Unfavorite'}</button>
      }
    </div>
  );
}

const styles = {
  tile: { 
    float: 'left', 
    width: '150px', 
    margin: '10px' 
  },
  tileText: { 
    height: '10px', 
    margin: 0, 
    textAlign: 'center' 
  }
}

const mapDispatchToProps = {
  addImageToFavourites,
  removeImageFromFavourites,
  setImageFaved,
  setImageUnfaved
};

export default connect(null, mapDispatchToProps)(Tile);
