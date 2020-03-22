import _ from 'lodash';

import {
  ADD_DATA,
  SELECT_ALBUM,
  ADD_IMAGE_TO_FAVOURITES,
  REMOVE_IMAGE_FROM_FAVOURITES,
  SET_IMAGE_FAVED,
  SET_IMAGE_UNFAVED
} from '../actions/actionTypes';

const initialState = {
  selectedAlbumName: '',
  albums: {},
  imagesFromSelectedAlbum: [],
  albumsWithFavedImages: {}
};

function findImgIndex({ state, albumIndex, image }) {
  return state.albums[albumIndex].findIndex(imageInAlbum => imageInAlbum.id === image.id);
}

function changeFavStatusInAlbum({ clonedState, albumIndex, imageIndexToFav, image, isFavorited }) {
  clonedState.albums[albumIndex].splice(imageIndexToFav, 1, {
    ...image,
    isFavorited: isFavorited
  });
  return clonedState;
}

function changeFavStatusInSelectedAlbum({ clonedState, imageIndexToFav, image, isFavorited }) {
  clonedState.imagesFromSelectedAlbum.splice(imageIndexToFav, 1, {
    ...image,
    isFavorited: isFavorited
  });
  return clonedState;
}

function removeImgFromVisibleImages({ clonedState, imageToRemove }) {
  clonedState.imagesFromSelectedAlbum = clonedState.imagesFromSelectedAlbum.filter(image => image.id !== imageToRemove.id);
  return clonedState;
}

const albumAppReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DATA:
      const INITIAL_ALBUM_INDEX = '99';
      const { payload } = action;
      const albums = {};
      const albumsWithFavedImages = {};
      albums['Favourites'] = [];
      albumsWithFavedImages['Favourites'] = 0;
      payload.forEach(picture => {
        const albumIndex = picture.albumId - 1;
        if (!albums[albumIndex]) {
          albums[albumIndex] = [];
        }
        albums[albumIndex].push({
          ...picture,
          isFavorited: false
        });
        albumsWithFavedImages[albumIndex] = 0;
      });

      return {
        ...state,
        selectedAlbumName: INITIAL_ALBUM_INDEX,
        albums,
        imagesFromSelectedAlbum: [...albums[INITIAL_ALBUM_INDEX]],
        albumsWithFavedImages
      };
    case SELECT_ALBUM:
      const { albumId } = action;
      return {
        ...state,
        selectedAlbumName: albumId,
        imagesFromSelectedAlbum: [...state.albums[albumId]]
      }
    case ADD_IMAGE_TO_FAVOURITES:
      const hasImgBeenAdded = state.albums['Favourites'].some(favImage => favImage.id === action.image.id);
      if (hasImgBeenAdded) {
        return state;
      }
      return {
        ...state,
        albums: {
          ...state.albums,
          'Favourites': [
            ...state.albums['Favourites'],
            {
              ...action.image,
              isFavorited: true
            }
          ]
        },
        albumsWithFavedImages: {
          ...state.albumsWithFavedImages,
          [action.image.albumId - 1]: state.albumsWithFavedImages[action.image.albumId - 1] + 1
        }
      }
    case REMOVE_IMAGE_FROM_FAVOURITES: {
      let albumIndex = action.image.albumId - 1;
      const imageIndexToUnFav = state.albums[albumIndex].findIndex(imageInAlbum => imageInAlbum.id === action.image.id);
      if (imageIndexToUnFav === -1) {
        return state;
      }
      let clonedState = _.cloneDeep(state);
      clonedState.albums[albumIndex].splice(imageIndexToUnFav, 1, {
        ...action.image,
        isFavorited: false
      });
      clonedState.albums['Favourites'] = clonedState.albums['Favourites'].filter(imageFromSelectedAlbum => imageFromSelectedAlbum.id !== action.image.id);
      clonedState.albumsWithFavedImages[action.image.albumId - 1] = clonedState.albumsWithFavedImages[action.image.albumId - 1] - 1;
      return clonedState;
    }
    case SET_IMAGE_FAVED: {
      const { image, isFavorited } = action.payload;
      const albumIndex = image.albumId - 1;
      const imageIndexToFav = findImgIndex({ state, albumIndex, image });
      if (imageIndexToFav === -1) {
        return state;
      }
      let clonedState = _.cloneDeep(state);
      clonedState = changeFavStatusInAlbum({ clonedState, albumIndex, imageIndexToFav, ...action.payload });
      clonedState = changeFavStatusInSelectedAlbum({ clonedState, imageIndexToFav, image, isFavorited });
      return clonedState;
    }
    case SET_IMAGE_UNFAVED: {
      const { image, isFavorited } = action.payload;
      const albumIndex = image.albumId - 1;
      const imageIndexToFav = findImgIndex({ state, albumIndex, image });
      if (imageIndexToFav === -1) {
        return state;
      }
      let clonedState = _.cloneDeep(state);
      clonedState = changeFavStatusInAlbum({ clonedState, albumIndex, imageIndexToFav, ...action.payload });
      if (clonedState.selectedAlbumName === 'Favourites') {
        clonedState = removeImgFromVisibleImages({ cloneDeep, imageToRemove: image });
      } else {
        clonedState = changeFavStatusInSelectedAlbum({ clonedState, imageIndexToFav, image, isFavorited });
      }
      return clonedState;
    }
    default:
      return state;
  }
};

export default albumAppReducer;