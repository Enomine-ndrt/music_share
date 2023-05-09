import {
    GET_SINGLE_ALBUM_ARTISTA,
    GET_ARTISTS,
    GET_ALL_ALBUMS_ARTIST,
    REGISTER_NEW_ARTIST,
    REGISTER_NEW_ALBUM
} from "./actions";

const initialState = {
    Album: [],
    Artist: [],
    AllAlbumArtist: [],
    Message: [],
    MessageAlbum: []
}

function userReducer(state = initialState,action){
    switch(action.type){
        case GET_SINGLE_ALBUM_ARTISTA:
            return {...state,Album: action.payload}
        case GET_ARTISTS:
            return {...state,Artist: action.payload}
        case GET_ALL_ALBUMS_ARTIST:
             return {...state,AllAlbumArtist: action.payload}
        case REGISTER_NEW_ARTIST:
             return {...state,Message: action.payload}
        case REGISTER_NEW_ALBUM:
            return {...state,MessageAlbum: action.payload}
        default:
            return state;
    }
}

export default userReducer;
