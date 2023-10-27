
import React,{useRef,useEffect,useState} from 'react';
import Navbar from '../../components/navbar/Navbar';
import { useSelector,useDispatch } from 'react-redux';
import {getAllArtist,getAllAlbumsArtist,registerSongs} from "../../redux/actions";
import './registerSongs.css';
import { useNavigate } from "react-router-dom";
import {PermMedia,Label,Room,EmojiEmotions,Cancel} from '@mui/icons-material';

const RegisterSongs = () => {
    const {Artist, AllAlbumArtist,Songs} = useSelector(state => state.userReducer);
    const [select,setSelect] = useState(1);
    const [selectAlbum,setSelectAlbum] = useState('');
    const dispatch = useDispatch();
    const dirMusic = useRef();
    const nameMusic = useRef();
    const idAlbum = useRef();
    const [file,setFile] = useState([]);
    var array = [];


    let navigate = useNavigate();

    useEffect(()=>{
        dispatch(getAllArtist());
    },[]);

    useEffect(()=>{
        dispatch(getAllAlbumsArtist(select));

    },[select]);





    const registrarCanciones = async() => {

        console.log('id_artista ',select);
        console.log('id_album ',selectAlbum);
      console.log('dirMusic ',dirMusic.current.value);


        if(file){
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name",fileName);
            data.append("file",file);
    let nombresCanciones = [];
    nombresCanciones.length = 0;
    Array.from(document.querySelectorAll("input")).forEach(
        input => {
            nombresCanciones.push(input.value);
        }
      );


      var canciones = {};
      var listSongs = [];

      for(var i=2; i<nombresCanciones.length;i++){


        canciones['archivo'] = nombresCanciones[i];
        let splice = nombresCanciones[i].split('.');
        let s = splice[1].split('.mp3');

        canciones['nombre_cancion'] = s[0];

        var json = await JSON.stringify(canciones);
        listSongs.push(json);
      }

      console.log('canciones ',listSongs);
    dispatch(registerSongs(select,selectAlbum,listSongs,"music_share/music/"+dirMusic.current.value));
    navigate('/');
    }

    }


    const Elementos = () => {
        if(file.length > 0){
            array.length = 0;
            return Array.from(file).map(file => {
                return (
                  <div key={file.name}>
                    {
                        array.push(file.name)
                    }
                    <input
                    ref={nameMusic}
                    type="text"
                    id="musicName"
                    name="musicName"
                    defaultValue={`${file.name}`} />
                  </div>
                );
              });
            }
    }


  return (
    <div>
      <Navbar />
      <div className='lienzo'>
            <div className='formulario'>
                <h3>Registrar Canciones</h3><br/>
                    Direccion despues  de music_share/music/
                <div className='nombreAlbum'>

                </div>
                <select value={select} onChange={e=>{
                    setSelect(e.target.value);

                }
                    } >
                    {
                        Artist.map((artista)=>{
                            var object = JSON.parse(artista);
                            return(
                                <>
                                <option  value={object.id_artista} >{object.nombre_artista}</option>
                                </>
                            )
                        })
                    }
                </select><br />

                 {
                    AllAlbumArtist.body != null ?(
                <select value={selectAlbum} onChange={e =>{
                    setSelectAlbum(e.target.value);

                    }} >
                        {
                        AllAlbumArtist.body.map((al,ind)=>{
                            return(
                                <>
                                <option  >Seleccionar</option>
                                <option value={al.id_album} >{al.nombre_album}</option>
                                </>
                            )
                        })
                    }

                </select>
                ):(
                    <></>
                )

                }

                <br />
                <label htmlFor="file" className="shareOption">
                           <PermMedia htmlColor="tomato" className="shareIcon"/>
                           <span className="shareOptionText">music</span>
                           <input
                           style={{ display:"none" }}
                           type="file"
                           id="file"
                           accept=".*"
                           multiple
                           onChange={(e)=>setFile(e.target.files)}
                               />
                       </label>
                     <br />
                Direccion carpeta de musica<br />
            <input
            type='text'
            name="dirMusic"
            ref={dirMusic}
            placeholder='direccion de musica'
            />
            <Elementos />

                <div className='button'>
                <button onClick={registrarCanciones}  value='registrar' >Registrar</button>
                </div>
            </div>
      </div>
    </div>
  )
}

export default RegisterSongs;
