
import './navbar.scss';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { slide as Menu } from 'react-burger-menu'
//import {useHref} from "react-router";


const Navbar = () => {
  //const history = useHref();
  let navigate = useNavigate();

  const handle = (e) => {
    e.preventDefault();
    navigate('/');
  }

  const createArtist = (e) => {
    e.preventDefault();
    navigate('/Register');
  }

  const createAlbum = (e) => {
    e.preventDefault();
    navigate('/RegisterAlbum');
  }

  const insertSongs = (e) => {
    e.preventDefault();
    navigate('/RegisterSongs');
  }

  const Configure = (e) => {
    e.preventDefault();
    navigate('/PathUrl');
  };

  return (
    <div className='navbar'>
      <div className='wrapper'>
        <div className='nombre'>

          <span onClick={(e) => { handle(e) }} className="logo">Musica</span>

        </div>
        <div className='items'>

          <div className='item'>

            <SettingsIcon
              onClick={(e) => { Configure(e) }}
            />
          </div>

          <div className='item'>

            <ListOutlinedIcon
              className='icon'
            />

            <Menu>

              <a onClick={(e) => { createArtist(e) }} href="#">Registrar Artista</a>
              <a onClick={(e) => { createAlbum(e) }} href="#">Registrar Album</a>
              <a onClick={(e) => { insertSongs(e) }} href="#">Registrar Songs</a>

            </Menu>
          </div>


        </div>
      </div>
    </div>
  )
}

export default Navbar;
