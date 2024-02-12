
import React, { useRef, useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { getAllArtist, registerNewAlbum } from "../../redux/actions";
import './regsiterAlbum.css';
import { useNavigate } from "react-router-dom";
import { getColorImage, deleteAbsolutePath } from '../utils/Utils';
import { getStorage } from '../../components/CustomHooks/useLocalStorage';

const RegisterAlbum = () => {
    const { Artist, MessageAlbum } = useSelector(state => state.userReducer);
    const [select, setSelect] = useState(1);
    const dispatch = useDispatch();
    const nombre_album = useRef();
    const imagen_album = useRef();
    const url = JSON.parse(getStorage("url"));

    let navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllArtist());
    }, []);


    const registrarAlbum = async () => {
        let BASE_URL = url + "music_share/music/";

        const color = await getColorImage(BASE_URL + imagen_album.current.value);
        var image_album = await deleteAbsolutePath(BASE_URL + imagen_album.current.value, ':8080/');
        dispatch(registerNewAlbum(nombre_album.current.value, select, image_album, color));
        navigate('/');
    }

    console.log('mensaje ', MessageAlbum);

    return (
        <div>
            <Navbar />
            <div className='lienzo'>
                <div className='formulario'>
                    <h3>Registrar Album</h3><br />
                    direccion despues de music_share/music/
                    <br />
                    <div className='nombreAlbum'>
                        Nombre album <br />
                        <input type="text" ref={nombre_album} placeholder='nombre album' /><br />
                    </div>
                    <select value={select} onChange={e => setSelect(e.target.value)} >
                        {
                            Artist.map((artista) => {
                                var object = JSON.parse(artista);
                                return (
                                    <>
                                        <option value={object.id_artista} >{object.nombre_artista}</option>
                                    </>
                                )
                            })
                        }
                    </select><br />
                    <div className='imagen'>
                        <input type="text" ref={imagen_album} placeholder='imagen album' /><br />
                    </div>
                    <div className='button'>
                        <button onClick={registrarAlbum} value='registrar' >Registrar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterAlbum;
