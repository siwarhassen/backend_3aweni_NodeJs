const { json } = require('body-parser');
const recoController = {};



recoController.reco = async (req, res, next) => {
	
 fs = require('fs');

fs.readFile('helloworld.json', function (err, data) {
  if (err) throw err;
  if(data.indexOf(''+req.params.id ) >= 0){
   console.log("mawjoud")
     const stats = fs.statSync('helloworld.json');
      console.log(stats.size)
  }
  else{
 
  	 Descriptor=JSON.stringify(req.body).substring(2,JSON.stringify(req.body).length-5);

fs.readFile("helloworld.json", (error, data) => {
    if(error) {
        throw error;
    }
  console.log(data.toString().length);
});
let newinput= data.toString().substr(0,data.toString().length-1);
data = newinput+', "'+req.params.id+'": { "name": "'+req.params.id+'",  "descriptors" : [ [ '+Descriptor + "] ] } }";


fs.writeFile("helloworld.json", data, (err) => {
  if (err)
    console.log(err);
 
});


  }
});



    
};


recoController.refresh = async (req, res, next) => {
	console.log("5ra");
 fs = require('fs');

fs.copyFile('helloworldfaregh.json', 'helloworld.json', (err) => {
  if (err) throw err;

});


    
};



  module.exports = recoController;

