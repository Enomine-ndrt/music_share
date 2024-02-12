import React, { useEffect, useState, useRef, useMemo } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { getAllAlbumsArtist, getAllArtist, registerNewAlbum, updateArtistBA } from "../../redux/actions";
import { getColorImage, deleteAbsolutePath } from '../utils/Utils';
import './updateArtist.css';

const UpdateArtist = () => {
    const { AllAlbumArtist, Artist, UpdateBA } = useSelector(state => state.userReducer);
    const [select, setSelect] = useState(1);
    const [values, setValues] = useState(true);
    const dispatch = useDispatch();
    const Avatar = useRef();
    const Banner = useRef();
    const Banner2 = useRef();



    useEffect(() => {
        dispatch(getAllArtist());
    }, []);

    const HandleAlbum = (id_artista) => {
        dispatch(getAllAlbumsArtist(id_artista));
    }


    const GetArtists = () => {
        return (<>
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

        </>);
    }

    const GetArtistAtributes = () => {
        return (<>

            {
                AllAlbumArtist.header?.map((artista) => {

                    return (<>
                        <div className='nombreAlbum'>
                            Imagen Avatar <br />
                            <input

                                type="text"
                                value={artista?.avatar}
                                placeholder='avatar artista'
                                ref={Avatar}
                            /><br />
                            <img src={artista?.avatar} alt='avatar' width={100} height={100} />
                        </div>

                        <div className='imagen'>
                            Imagen Banner
                            <input type="hidden" ref={Banner} value={artista?.banner} />
                            <input
                                type="text"
                                placeholder='banner artista'
                                ref={Banner2}
                            /><br />
                            <img src={artista?.banner} alt='avatar' width={300} height={100} />
                        </div>
                    </>
                    )
                })
            }
        </>);
    };


    const Modificar = async () => {
        let BASE_URL = "http://192.168.1.121:8080/";

        var bannerPath = await deleteAbsolutePath(Banner.current.value, ':8080/');
        var avatarPath = await deleteAbsolutePath(Avatar.current.value, ':8080/');
        var bannerPath2 = await deleteAbsolutePath(Banner2.current.value, ':8080/');
        const color = await getColorImage(BASE_URL + bannerPath2);

        if (Banner2.current.value !== "") {

            /*
            console.log(
                'select ', select,
                ' Avatar ', avatarPath,
                ' Banner ', bannerPath,
                ' Banner2 ', bannerPath2,
                ' color ', color);
                */

            dispatch(updateArtistBA(bannerPath2, avatarPath, color, select));
        }




    }


    return (<div className='updateAlbum'>
        <Navbar />
        <div className='lienzo'>
            <div className='formulario'>
                <h3>Modificar Artist</h3><br />
                direccion absoluta
                <br />
                <GetArtists />
                <button onClick={(e) => { HandleAlbum(select) }} >atributes</button>

                {
                    values ? (<GetArtistAtributes />) : null
                }
                <div className='button'>
                    <button value='modificar' onClick={Modificar}>Modificar</button>
                </div>
            </div>
        </div>

    </div>
    );
}

export default UpdateArtist;