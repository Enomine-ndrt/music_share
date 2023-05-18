import { average } from 'color.js';

export async function getColorImage(banner){
    try{
        let color = '';
        if(banner != null){
            color =  await average(banner, { format: 'hex'});
            }
            return color;

    }catch(e){
    console.log('Ha ocurrido un error al extraer color ',e.message);
    }
  }


