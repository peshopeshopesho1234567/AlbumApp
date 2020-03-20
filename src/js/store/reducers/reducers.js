import { ADD_DATA, SELECT_ALBUM, ADD_IMAGE_TO_FAVOURITES } from '../actions/actionTypes';

const initialState = {
  albums: {},
  imagesFromSelectedAlbum: [],
};

const albumAppReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DATA:
      const { payload } = action;
      const albums = {};
      payload.forEach(picture => {
        const albumIndex = picture.albumId - 1;
        if (!albums[albumIndex]) {
          albums[albumIndex] = [];
        }
        albums[albumIndex].push({
          ...picture,
          isFavorited: false
        });
        albums['Favourites'] = [];
      });
      return {
        ...state,
        albums,
        imagesFromSelectedAlbum: albums['0']
      };
    case SELECT_ALBUM:
      const { albumId } = action;
      return {
        ...state,
        imagesFromSelectedAlbum: state.albums[albumId]
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
          'Favourites': [ ...state.albums['Favourites'], action.image]
        }
      }
    default:
      return state;
  }
};

export default albumAppReducer;