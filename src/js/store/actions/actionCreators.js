import {
  ADD_DATA,
  SELECT_ALBUM,
  ADD_IMAGE_TO_FAVOURITES,
  REMOVE_IMAGE_FROM_FAVOURITES,
  SET_IS_IMAGE_FAVED
} from './actionTypes';

const addData = payload => ({
  type: ADD_DATA,
  payload
});

const selectAlbum = albumId => ({
  type: SELECT_ALBUM,
  albumId
});

const addImageToFavourites = image => ({
  type: ADD_IMAGE_TO_FAVOURITES,
  image
});

const removeImageFromFavourites = image => ({
  type: REMOVE_IMAGE_FROM_FAVOURITES,
  image
});

const setIsImageFaved = payload => ({
  type: SET_IS_IMAGE_FAVED,
  payload
});

export {
  addData,
  selectAlbum,
  addImageToFavourites,
  removeImageFromFavourites,
  setIsImageFaved
}
