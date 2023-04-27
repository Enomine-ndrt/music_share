import {
    GET_SINGLE_ALBUM_ARTISTA,
    GET_ARTISTS,
    GET_ALL_ALBUMS_ARTIST
} from "./actions";

const initialState = {
    Album: [],
    Artist: [],
    AllAlbumArtist: []
}

function userReducer(state = initialState,action){
    switch(action.type){
        case GET_SINGLE_ALBUM_ARTISTA:
            return {...state,Album: action.payload}
        case GET_ARTISTS:
            return {...state,Artist: action.payload}
        case GET_ALL_ALBUMS_ARTIST:
             return {...state,AllAlbumArtist: action.payload}
        default:
            return state;
    }
}

export default userReducer;
