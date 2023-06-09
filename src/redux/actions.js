/* eslint-disable no-unreachable */
import axios from "axios";

export const GET_SINGLE_ALBUM_ARTISTA = 'GET_SINGLE_ALBUM_ARTISTA';
export const GET_ARTISTS = 'GET_ARTISTS';
export const GET_ALL_ALBUMS_ARTIST = 'GET_ALL_ALBUMS_FROM_ARTIST';
export const REGISTER_NEW_ARTIST = 'REGISTER_NEW_ARTIST';
export const REGISTER_NEW_ALBUM = 'REGISTER_NEW_ALBUM';
export const GET_COLOR_IMAGE = 'GET_COLOR_IMAGE';
export const REGISTER_A_SONGS = 'REGISTER_A_SONGS';

const config = {

    headers: {
        "content-type": "application/json",
        'Access-Control-Allow-Headers': 'x-access-token',
    }
}

const BASE_URL = 'http://192.168.1.132:8080/';

/**
 * get a single album
 */
export const getSingleAlbumFromArtist = (id_artista,id_album) => {
try{
    let serverAlbumListArtist = [];
    var temp = {};
    return async dispatch =>{

    const API_URL = BASE_URL+`music_share/php-rest-api/api/cancion/single_read.php?id_artista=${id_artista}&id_album=${id_album}`;

    const results = await axios.get(API_URL,config).then(async function (response) {
        return response;
    }).catch(function(error){
        console.log("Ha ocurrido un error al traer albums "+error);
    });

    let res =   await results.data.body.map(async(song)=>{

        temp['url'] = song.url;
        temp['nombre_cancion'] = song.nombre_cancion;
        temp['nombre_artista'] = song.nombre_artista;
        temp['nombre_album'] = song.nombre_album;
        temp['imagen_album'] = song.imagen_album;
        temp['numero_track'] = song.numero_track;
        temp['colorAlbum'] = song.colorAlbum;


        var json = await JSON.stringify(temp);
        serverAlbumListArtist.push(json);
        return serverAlbumListArtist;
    });

    await dispatch({
        type: GET_SINGLE_ALBUM_ARTISTA,
        payload: serverAlbumListArtist
    });

    }
}catch(e){
    console.log('Ha ocurrido un error '+e.message);
}

}

/**
 * getAllArtist
 */
export const getAllArtist = () =>{
    try{
        let serverListArtist = [];
        var temp = {};
        return async dispatch =>{
        const API_URL = BASE_URL+`music_share/php-rest-api/api/artista/read.php`;

        const results = await axios.get(API_URL,config).then(async function (response) {
            console.log('respoinse ',response);
            return response;
        }).catch(function(error){
            console.log("Ha ocurrido un error al traer artistas "+error);
        });

        console.log('response ',results);


        let res =   await results.data.body.map(async(art)=>{

            temp['id_artista'] = art.id_artista;
            temp['nombre_artista'] = art.nombre_artista;
            temp['imagen_artista'] = art.imagen_artista;

            var json = await JSON.stringify(temp);
            serverListArtist.push(json);
            return serverListArtist;
        });



        await dispatch({
            type: GET_ARTISTS,
            payload: serverListArtist
        });

        }
    }catch(e){
        console.log('Ha ocurrido un error '+e.message);
    }

}

/**
 * getAllAlbumsFromArtist
 */
export const getAllAlbumsArtist = (id) =>{
    try{

        return async dispatch =>{
        const API_URL = BASE_URL+`music_share/php-rest-api/api/album/single_read.php?id_artista=${id}`;
        const results = await axios.get(API_URL,config).then(async function (response) {
            console.log('respoinse ',response);
            return response;
        }).catch(function(error){
            console.log("Ha ocurrido un error al traer artistas "+error);
        });

      //  console.log('response ',results);

        await dispatch({
            type: GET_ALL_ALBUMS_ARTIST,
            payload: results.data
        });

        }
    }catch(e){
        console.log('Ha ocurrido un error '+e.message);
    }

}

/**
 * Register a new artist
 */
export const registerNewArtist = (nombre_artista,imagen_artista, banner, avatar, colorBanner) => {
    try{

        let serverListArtist = [];
        var temp = {};
        return async dispatch =>{
        const API_URL = BASE_URL+`music_share/php-rest-api/api/artista/create.php`;
        const results = await axios.post(API_URL,{
            "nombre_artista":nombre_artista,
            "imagen_artista":imagen_artista,
            "banner": banner,
            "avatar": avatar,
            "colorBanner": colorBanner,
        },config).then(async function (response) {
            console.log('respoinse ',response);
            return response;
        }).catch(function(error){
            console.log("Ha ocurrido un error al registrar artista "+error);
        });

        console.log('response ',results);


        await results.data.body.map(async(re)=>{
            temp['message'] = re.message;

            var json = await JSON.stringify(temp);
            serverListArtist.push(json);
            return serverListArtist;
        });



        await dispatch({
            type: REGISTER_NEW_ARTIST,
            payload: serverListArtist
        });

        }

    }catch(e){
    console.log('Ha ocurrido un error al registrar artista '+e.message);
    }
}

/**
 * Register a new Album
 */
export const registerNewAlbum = (nombre_album,id_artista,imagen_album, colorAlbum) => {
    try{

        let serverListArtist = [];
        var temp = {};
        return async dispatch =>{
        const API_URL = BASE_URL+`music_share/php-rest-api/api/album/create.php`;


        const results = await axios.post(API_URL,{
            "nombre_album":nombre_album,
            "id_artista":id_artista,
            "imagen_album":imagen_album,
            "color_album":colorAlbum
        },config).then(async function (response) {
            console.log('response ',response);
            return response;
        }).catch(function(error){
            console.log("Ha ocurrido un error al registrar album "+error);
        });

        console.log('response ',results);


        await results.data.body.map(async(re)=>{
            temp['message'] = re.message;

            var json = await JSON.stringify(temp);
            serverListArtist.push(json);
            return serverListArtist;
        });

        await dispatch({
            type: REGISTER_NEW_ALBUM,
            payload: serverListArtist
        });

        }
    }catch(error){
        console.log('Ha ocurrido un error al registrar album '+error.message);
    }
}
/**
 * Register a songs in album
 */
export const registerSongs = (id_artista,id_album,file,direccion) =>{
    try{
        return async dispatch =>{
            const API_URL = BASE_URL+`music_share/php-rest-api/api/cancion/create.php`;
            const results = await axios.post(API_URL,{
                "id_artista":id_artista,
                "id_album":id_album,
                "file":file,
                "direccion":direccion
            },config).then(async function (response) {
                console.log('response ',response);
                return response;
            }).catch(function(error){
                console.log("Ha ocurrido un error al registrar album "+error);
            });

            console.log('response ',results);
            await dispatch({
                type: REGISTER_NEW_ALBUM,
                payload: results
            });

            }
    }catch(error){
    console.log('Ha ocurrido un error al registrar',error.message);
    }
}

