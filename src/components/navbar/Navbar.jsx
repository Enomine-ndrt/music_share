
import './navbar.scss';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
//import {useHref} from "react-router";


const Navbar = () => {
  //const history = useHref();
  let navigate = useNavigate();

  const handle = (e) =>{
    //console.log('clickado');
    e.preventDefault();
    navigate('/');
  }

  return (
    <div className='navbar'>
       <div className='wrapper'>
          <div className='nombre'>

               <span onClick={(e)=>{handle(e)}} className="logo">Artistas</span>

          </div>
          <div className='search'>
            <input type='text' placeholder='search...'/>
            <SearchOutlinedIcon />
          </div>
          <div className='items'>


              <div className='item'>
               <FullscreenExitOutlinedIcon className='icon'/>
              </div>
              <div className='item'>
                <NotificationsNoneOutlinedIcon className='icon'/>
                <div className='counter'>1</div>
              </div>
              <div className='item'>
                <ChatBubbleOutlineOutlinedIcon className='icon'/>
                <div className='counter'>2</div>
              </div>
              <div className='item'>
                  <ListOutlinedIcon className='icon'/>
              </div>

          </div>
       </div>
    </div>
  )
}

export default Navbar;
