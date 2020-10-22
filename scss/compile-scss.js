var sass = require('node-sass');
var fs = require('fs');


sass.render({
  file: __dirname+"/ality.scss",
  includePaths: [__dirname+'/../node_modules/foundation-sites/scss', __dirname+'/../node_modules/motion-ui/src']
}, function(error, result) { 
    if(error) {
        console.error(error.status);
        console.error(error.column);
        console.error(error.message);
        console.error(error.line);
    }
    else
    {
        console.log(Object.keys(result));

        fs.writeFile(__dirname+"/../public/css/ality.css", result.css, (err)=>{
            if(err) throw err;
            console.log("File written!");
        })
        if(result.map){
            fs.writeFile(__dirname+"/ality.css.map", result.map, (err)=>{
                if(err) throw err;
                console.log("Map written!");
            })
        }
        fs.writeFile(__dirname+"/ality.css.stats", JSON.stringify(result.stats), (err)=>{
            if(err) throw err;
            console.log("Stats written!");
        })
    }
 });