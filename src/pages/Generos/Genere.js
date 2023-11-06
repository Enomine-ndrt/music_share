
import React,{useEffect} from 'react';
import Navbar from '../../components/navbar/Navbar';
import { useSelector,useDispatch } from 'react-redux';
import {getAllGenere} from "../../redux/actions";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './genere.css';


const Genere = () => {

    const {Generes} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(getAllGenere());
    },[]);

   // console.log('generes ',Generes);

   const handleCard = (object,ind) => {
    navigate("/artistas",{state:{data: object.id_generos}});
      console.log('id genero ',object.id_generos);
   }


    return (
        <div className='artistas' >
        <Navbar />
        <div className='lienzo'>
       {

         Generes.map((element,ind)=>{

           var object = JSON.parse(element);

           return(

       <div className='tarjeta2'>
       <Card  sx={{ maxWidth: 345 ,height: 100,background: object.color}} >
         <CardActionArea  onClick={(e)=>{handleCard(object,ind)}}>

           <CardContent>


             <Typography gutterBottom variant="h5" component="div">
             <div className='nombre2'>
               {object.genero}
               </div>
             </Typography>

           </CardContent>
         </CardActionArea>
       </Card>
       </div>
         )
         })

       }
       </div>
       </div>

    );
}

export default Genere;
