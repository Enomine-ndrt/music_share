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

export async function deleteAbsolutePath(path,separator){
    try{
        var dir = path.split(separator);
        return dir[1];
    }catch(e){
        console.log('Ha ocurrido un error al extraer path ',e.message);
    }
}


