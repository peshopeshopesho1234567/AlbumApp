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

const INITIAL_ALBUM_INDEX = '99';
const FAVOURITES_ALBUM_NAME = 'Favourites';

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

function albumIndexFromId(albumId) {
  return albumId - 1;
}

const albumAppReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DATA: {
      const { payload } = action;
      const albums = {};
      const albumsWithFavedImages = {};
      albums[FAVOURITES_ALBUM_NAME] = [];
      albumsWithFavedImages[FAVOURITES_ALBUM_NAME] = 0;
      payload.forEach(picture => {
        const albumIndex = albumIndexFromId(picture.albumId);
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
    }
    case SELECT_ALBUM: {
      const { albumId } = action;
      return {
        ...state,
        selectedAlbumName: albumId,
        imagesFromSelectedAlbum: [...state.albums[albumId]]
      }
    }
    case ADD_IMAGE_TO_FAVOURITES: {
      const { image } = action;
      const albumIndex = albumIndexFromId(image.albumId);
      const hasImgBeenAdded = state.albums[FAVOURITES_ALBUM_NAME].some(favImage => favImage.id === image.id);
      if (hasImgBeenAdded) {
        return state;
      }
      return {
        ...state,
        albums: {
          ...state.albums,
          [FAVOURITES_ALBUM_NAME]: [
            {
              ...image,
              isFavorited: true
            },
            ...state.albums[FAVOURITES_ALBUM_NAME]
          ]
        },
        albumsWithFavedImages: {
          ...state.albumsWithFavedImages,
          [albumIndex]: state.albumsWithFavedImages[albumIndex] + 1
        }
      }
    }
    case REMOVE_IMAGE_FROM_FAVOURITES: {
      const { image } = action;
      let albumIndex = albumIndexFromId(image.albumId);
      const imageIndexToUnFav = findImgIndex({ state, albumIndex, image });
      if (imageIndexToUnFav === -1) {
        return state;
      }
      let clonedState = _.cloneDeep(state);
      clonedState = changeFavStatusInAlbum({ clonedState, albumIndex, imageIndexToFav: imageIndexToUnFav, image, isFavorited: false });
      clonedState.albums[FAVOURITES_ALBUM_NAME] = clonedState.albums[FAVOURITES_ALBUM_NAME].filter(imageFromSelectedAlbum => imageFromSelectedAlbum.id !== image.id);
      clonedState.albumsWithFavedImages[albumIndex] = clonedState.albumsWithFavedImages[albumIndex] - 1;
      return clonedState;
    }
    case SET_IMAGE_FAVED: {
      const { image, isFavorited } = action.payload;
      const albumIndex = albumIndexFromId(image.albumId);
      const imageIndexToFav = findImgIndex({ state, albumIndex, image });
      if (imageIndexToFav === -1) {
        return state;
      }
      let clonedState = _.cloneDeep(state);
      clonedState = changeFavStatusInAlbum({ clonedState, albumIndex, imageIndexToFav, image, isFavorited });
      clonedState = changeFavStatusInSelectedAlbum({ clonedState, imageIndexToFav, image, isFavorited });
      return clonedState;
    }
    case SET_IMAGE_UNFAVED: {
      const { image, isFavorited } = action.payload;
      const albumIndex = albumIndexFromId(image.albumId);
      const imageIndexToFav = findImgIndex({ state, albumIndex, image });
      if (imageIndexToFav === -1) {
        return state;
      }
      let clonedState = _.cloneDeep(state);
      clonedState = changeFavStatusInAlbum({ clonedState, albumIndex, imageIndexToFav, image, isFavorited });
      if (clonedState.selectedAlbumName === FAVOURITES_ALBUM_NAME) {
        clonedState = removeImgFromVisibleImages({ clonedState, imageToRemove: image });
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