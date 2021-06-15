import axios from 'axios';
const KEY="AIzaSyDa_ikOSdQtFlqN5so8tPVeWg7_SiJmifM";

export default axios.create({
    
    baseURL:'https://www.googleapis.com/youtube/v3',
    params:{
   part:'snippet',
   maxResults :4   ,
   key:KEY
    },
    headers: {'Access-Control-Allow-Origin': '*'
  
},
   
})



