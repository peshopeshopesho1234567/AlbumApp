import { ADD_DATA, SELECT_ALBUM } from '../actions/actionTypes';

const initialState = {
  albums: {},
  imagesFromSelectedAlbum: []
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
        albums[albumIndex].push(picture);
        albums['favourites'] = [];
      });
      return {
        albums,
        imagesFromSelectedAlbum: albums['1']
      };
    case SELECT_ALBUM:
      const { albumId } = action;
      return {
        ...state,
        imagesFromSelectedAlbum: state.albums[albumId]
      }
    default:
      return state;
  }
};

export default albumAppReducer;