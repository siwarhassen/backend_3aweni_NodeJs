const {google}=require('googleapis');
const path=require('path');
const CLIENT_ID='1041015474648-84cdec6fm08frshp1ejcp4v6ccmlbo3v.apps.googleusercontent.com';
const CLIENT_SECRET='P5HCBL32SHlr8EJkTtWJk5iV';
const REDIRECT_URI='https://developers.google.com/oauthplayground';
const REFRECH_TOKEN='1//04O7Sj3K96zVLCgYIARAAGAQSNwF-L9IrMHZ95o7uNCCkZCCDJmFRbyQqOz15piF-2qhz3dQZ4QD9asNy2TKOKPjLaf6Kxj-6LEU';

const oauth2Client=new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({refresh_token:REFRECH_TOKEN});

const drive=google.drive(
    {
        version:'v3',
        auth:oauth2Client
    }
)
const filePath=path.join(__dirname,'html5.jpg');
 async function uploadFile()
{
    try {
const response=await drive.files.create({
    requestBody:{
        name:'beautiful.jpg',
        mimeType:'image/jpg',
    },
    media:{
       mimeType :'image/jpg',
       body:fsortuserasc.createReadStream(filePath),
    }

})
    }
    catch{

    }
}
module.exports = drive;
		
//uploadFile();