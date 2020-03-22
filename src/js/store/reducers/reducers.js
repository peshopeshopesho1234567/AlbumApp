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

const albumAppReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DATA:
      const FIRST_ALBUM_INDEX = '0';
      const { payload } = action;
      const albums = {};
      const albumsWithFavedImages = {};
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

      albums['Favourites'] = [];
      albumsWithFavedImages['Favourites'] = 0;
      return {
        ...state,
        selectedAlbumName: FIRST_ALBUM_INDEX,
        albums,
        imagesFromSelectedAlbum: [...albums[FIRST_ALBUM_INDEX]],
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
      let clonedState = JSON.parse(JSON.stringify(state));
      clonedState.albums[albumIndex].splice(imageIndexToUnFav, 1, {
        ...action.image,
        isFavorited: false
      });
      clonedState.albums['Favourites'] = clonedState.albums['Favourites'].filter(imageFromSelectedAlbum => imageFromSelectedAlbum.id !== action.image.id);
      clonedState.albumsWithFavedImages[action.image.albumId - 1] = clonedState.albumsWithFavedImages[action.image.albumId - 1] - 1;
      return clonedState;
    }
    case SET_IMAGE_FAVED: {
      const albumIndex = action.payload.image.albumId - 1;
      const imageIndexToFav = state.albums[albumIndex].findIndex(imageInAlbum => imageInAlbum.id === action.payload.image.id);
      if (imageIndexToFav === -1) {
        return state;
      }
      let clonedState = JSON.parse(JSON.stringify(state));
      clonedState.albums[albumIndex].splice(imageIndexToFav, 1, {
        ...action.payload.image,
        isFavorited: action.payload.isFavorited
      });
      clonedState.imagesFromSelectedAlbum.splice(imageIndexToFav, 1, {
        ...action.payload.image,
        isFavorited: action.payload.isFavorited
      });
      return clonedState;
    }
    case SET_IMAGE_UNFAVED: {
      const albumIndex = action.payload.image.albumId - 1;
      const imageIndexToFav = state.albums[albumIndex].findIndex(imageInAlbum => imageInAlbum.id === action.payload.image.id);
      if (imageIndexToFav === -1) {
        return state;
      }
      let clonedState = JSON.parse(JSON.stringify(state));
      clonedState.albums[albumIndex].splice(imageIndexToFav, 1, {
        ...action.payload.image,
        isFavorited: action.payload.isFavorited
      });
      if (clonedState.selectedAlbumName === 'Favourites') {
        clonedState.imagesFromSelectedAlbum = clonedState.imagesFromSelectedAlbum.filter(image => image.id !== action.payload.image.id);
      } else {
        clonedState.imagesFromSelectedAlbum.splice(imageIndexToFav, 1, {
          ...action.payload.image,
          isFavorited: action.payload.isFavorited
        });
      }
      return clonedState;
    }
    default:
      return state;
  }
};

export default albumAppReducer;