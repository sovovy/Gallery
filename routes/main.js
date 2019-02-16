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

    let title;
    form.parse(req, function(err, fields, files){
      title = fields.upload_title;
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
      
      const Image = require('../models/image');
      let newImage = new Image();
      newImage.title = title;
      newImage.author = "김탱커";
      newImage.user_id = 0;
      var d = new Date();
      newImage.date = d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2) + " " + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);
      newImage.file_name = file_name;
      newImage.frame_num = Math.floor(Math.random() * 6) + 1;
      newImage.views = 0;
      newImage.save(err => {
        if (err) {
          console.error(err);
        }
      });
    });
  });

  // detail
  app.get("/detail", (req, res) => {
    const Image = require('../models/image');
    Image.findOne({ no: req.query.no }, (err, image) => {
      if (err) return res.status(500).json({ error: err });
      if (!image) return res.status(404).json({ error: err });
      // 조회수 올리기
      image.views = image.views * 1 + 1;
      image.save(function(err){
        if(err) console.log('failed to update: ' + err);
      });
      // 받아온 no에 따른 사진, 제목, 작성자, 조회수 전달
      res.render("detail/index", {
        img: image.file_name,
        title: image.title,
        author: image.author,
        views: image.views
      });
    });
  });

};