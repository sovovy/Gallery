module.exports = (app) => {
  // main
  app.get("/", (req, res) => {
    res.render("main/index");
  });

  // upload
  app.get("/upload", (req, res) => {
    res.render("upload/index");
  });

  // uploading img
  app.post("/upload_img", (req, res) => {
    let formidable = require('formidable');
    let fs = require('fs-extra');
    let rename = require('rename');
    let sharp = require('sharp');
    
    let form = new formidable.IncomingForm();
    form.multiples = true; 

    form.parse(req, function(err, fields, files){
      console.log(fields.upload_title);
      res.redirect('/');
    });

    form.on('end', function(field, files){
      let temp_path = this.openedFiles[0].path;
      let file_name = rename(this.openedFiles[0].name, function() {
        return {suffix: '_'+Date.now()};
      });
      let new_location = './public/uploads/'; 
      fs.move(temp_path, new_location + file_name, function(err){
        if(err){
          console.log(err);
        }else{
          // small image generate
          sharp(new_location + file_name)
          .resize({width: 200})
          .toFile(new_location + 'small/' + file_name);
          
          console.log('upload success!');
        }
      });
    });
  });
};