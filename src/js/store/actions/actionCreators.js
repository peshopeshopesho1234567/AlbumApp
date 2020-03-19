import { ADD_DATA, SELECT_ALBUM } from './actionTypes';

const addData = payload => ({
    type: ADD_DATA,
    payload
});

const selectAlbum = albumId => ({
    type: SELECT_ALBUM,
    albumId
});

export {
    addData,
    selectAlbum
}
