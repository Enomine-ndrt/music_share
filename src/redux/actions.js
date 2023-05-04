import axios from "axios";

export const GET_SINGLE_ALBUM_ARTISTA = 'GET_SINGLE_ALBUM_ARTISTA';
export const GET_ARTISTS = 'GET_ARTISTS';
export const GET_ALL_ALBUMS_ARTIST = 'GET_ALL_ALBUMS_FROM_ARTIST';

/**
 * get a single album
 */
export const getSingleAlbumFromArtist = (id_artista,id_album) => {
try{
    let serverAlbumListArtist = [];
    var temp = {};
    return async dispatch =>{
    const API_URL = `http://127.0.0.1:8080/music_share/php-rest-api/api/cancion/single_read.php?id_artista=${id_artista}&id_album=${id_album}`;
    const results = await axios.get(API_URL).then(async function (response) {
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

            const config = {

                headers: {
                    "content-type": "application/json",
                    'Access-Control-Allow-Headers': 'x-access-token',
                }
            }

        const API_URL = `http://127.0.0.1:8080/music_share/php-rest-api/api/artista/read.php`;
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
        let serverListArtist = [];
        var temp = {};
        return async dispatch =>{

            const config = {

                headers: {
                    "content-type": "application/json",
                    'Access-Control-Allow-Headers': 'x-access-token',
                }
            }

        const API_URL = `http://127.0.0.1:8080/music_share/php-rest-api/api/album/single_read.php?id_artista=${id}`;
        const results = await axios.get(API_URL,config).then(async function (response) {
            console.log('respoinse ',response);
            return response;
        }).catch(function(error){
            console.log("Ha ocurrido un error al traer artistas "+error);
        });

        console.log('response ',results);


        await results.data.body.map(async(al)=>{

            temp['id_album'] = al.id_album;
            temp['nombre_album'] = al.nombre_album;
            temp['id_artista'] = al.id_artista;
            temp['imagen_album'] = al.imagen_album;

            var json = await JSON.stringify(temp);
            serverListArtist.push(json);
            return serverListArtist;
        });



        await dispatch({
            type: GET_ALL_ALBUMS_ARTIST,
            payload: serverListArtist
        });

        }
    }catch(e){
        console.log('Ha ocurrido un error '+e.message);
    }

}
