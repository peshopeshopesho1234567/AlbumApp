import { ADD_DATA } from '../actions/actionTypes';

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
        if (!albums[picture.albumId]) {
          albums[picture.albumId] = [];
        }
        albums[picture.albumId].push(picture);
        albums['favourites'] = [];
      });
      return {
        albums,
        imagesFromSelectedAlbum: albums['1']
      };
    default:
      return state;
  }
};

export default albumAppReducer;