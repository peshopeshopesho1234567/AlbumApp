import { ADD_DATA, SELECT_ALBUM, ADD_IMAGE_TO_FAVOURITES } from './actionTypes';

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

export {
    addData,
    selectAlbum,
    addImageToFavourites
}
