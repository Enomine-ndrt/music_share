import React,{useRef} from 'react';
import Navbar from '../../components/navbar/Navbar';
import { useSelector,useDispatch } from 'react-redux';
import {registerNewArtist} from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { getColorImage,deleteAbsolutePath} from '../utils/Utils';
import './register.css';


const Register = () => {
    const nombre_artista = useRef();
    const imagen_artista = useRef();
    const imagen_banner = useRef();
    const avatar = useRef();
    const {Message} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    let navigate = useNavigate();




    const registrar = async() => {

        let BASE_URL = "http://192.168.1.121:8080/music_share/music/";
        console.log('nombre artista ',nombre_artista.current.value);
        console.log('imagen artista ',BASE_URL+imagen_artista.current.value);
        console.log('imagen banner ',BASE_URL+imagen_banner.current.value);
        console.log('avatar ',BASE_URL+avatar.current.value);
       const color = await   getColorImage(BASE_URL+imagen_banner.current.value);
       console.log('color obtenido',color);


     var  imagen_artist = await deleteAbsolutePath(BASE_URL+imagen_artista.current.value,':8080/');
     var image_banner = await deleteAbsolutePath(BASE_URL+imagen_banner.current.value,':8080/');
     var imagen_avatar = await  deleteAbsolutePath(BASE_URL+avatar.current.value,':8080/');

      dispatch(registerNewArtist(nombre_artista.current.value,imagen_artist,image_banner,
       imagen_avatar, color));
      navigate('/');

    }


    console.log('message ',Message);

  return (
    <div>
      <Navbar />
       <div className='lienzo'>
            <div className='formulario'>
            <label className='titles'><h3>Ingresar Artista</h3></label>
            <br/>direccion despues de music_share/music/
            <br/>
            <label>Nombre artista</label><br />
            <input

            type='text'
            name="nombre_artista"
            ref={nombre_artista}
            placeholder='nombre artista' />
             <br />
            Imagen artista<br />
            <input
            type='text'
            name="imagen_artista"
            ref={imagen_artista}
            placeholder='imagen artista'
            />
            <br/>
            Imagen banner<br />
            <input
            type='text'
            name="imagen_banner"
            ref={imagen_banner}
            placeholder='imagen banner'
            />
            <br/>
            Avatar artista<br />
            <input
            type='text'
            name="avatar"
            ref={avatar}
            placeholder='avatar artista'
            />
            <br/>

            <div className='button'>
            <button onClick={registrar}  value='registrar' >Registrar</button>

            </div>
            </div>

       </div>
    </div>
  )
}

export default Register;
