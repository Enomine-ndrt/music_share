import React,{useRef} from 'react';
import Navbar from '../../components/navbar/Navbar';
import { useSelector,useDispatch } from 'react-redux';
import {registerNewArtist} from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { getColorImage} from '../utils/Utils';
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
        console.log('nombre artista ',nombre_artista.current.value);
        console.log('imagen artista ',imagen_artista.current.value);
        console.log('imagen banner ',imagen_banner.current.value);
        console.log('avatar ',avatar.current.value);
       const color = await   getColorImage(imagen_banner.current.value);

      dispatch(registerNewArtist(nombre_artista.current.value,
        imagen_artista.current.value,imagen_banner.current.value,
        avatar.current.value, color));
      navigate('/');
    }

    console.log('message ',Message);

  return (
    <div>
      <Navbar />
       <div className='lienzo'>
            <div className='formulario'>
            <label className='titles'><h3>Ingresar Artista</h3></label>
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
