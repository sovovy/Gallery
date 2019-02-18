module.exports = (app) => {
  // main
  app.get("/", (req, res) => {
    const Image = require('../models/image');
    Image.find(function(err, images){
        if (err) return res.status(500).send({error: 'database failure'});

        for (var i = 0; i < images.length; i++){
          var total = 0;
          var len = 0;
          for (var j = 0; j < images[i].title.length; j++){
            if(escape(images[i].title[j]).length > 4)
              total += 2;
            else
              total++;

            if (total <= 20)
              len = j + 1;
          }
          if (total > 20)
              images[i].title = images[i].title.slice(0, len)+'…';
        }
        res.render("main/index",{
          images: images.reverse(),
          user_id: req.session.gg_user_id,
          id: req.session.gg_id,
          name: req.session.gg_name
        });
    });
  });

  // login
  app.post("/login", (req, res) => {

    const User = require('../models/user');
    const MD5 = function(d){result = M(V(Y(X(d),8*d.length)));return result.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_};

    User.findOne(
      { id: req.body.gg_id, pwd: MD5(req.body.gg_pw) },
      (err, user) => {
        if (err) return res.status(500).json({ error: err });
        if (!user) {
          require('dns').lookup(require('os').hostname(), function (err, add, fam) {
            writeLog('login-fail', `${req.body.gg_id} , ${req.body.gg_pw} (${add})`);
          })
          return res.redirect(req.body.gg_url);
        }
        // user exist
        require('dns').lookup(require('os').hostname(), function (err, add, fam) {
          writeLog('login', `${user.name} (${add})`);
        })
        // save session
        req.session.gg_user_id = user.user_id;
        req.session.gg_id = user.id;
        req.session.gg_name = user.name;
        // redirect to prev
        return res.redirect(req.body.gg_url);
      }
    );
  });

  // logout
  app.get("/logout", (req, res) => {
    if (req.session.gg_id) {
      require('dns').lookup(require('os').hostname(), function (err, add, fam) {
        writeLog('logout', `${req.session.gg_name} (${add})`);
        req.session.destroy(function(err) {
          if (err) {
            console.log(err);
          } else {
            res.redirect(req.query.url);
          }
        });
      });
    } else {
      res.redirect(req.query.url);
    }
  });

  // upload
  app.get("/upload", (req, res) => {
    res.render("upload/index",{
      user_id: req.session.gg_user_id,
      id: req.session.gg_id,
      name: req.session.gg_name
    });
  });

  // uploading img
  app.post("/upload_img", (req, res) => {
    let formidable = require('formidable');
    let fs = require('fs-extra');
    let rename = require('rename');
    let sharp = require('sharp');

    // check session
    if(!req.session.gg_id){
      return res.redirect('/')
    }

    // write log
    writeLog('upload-start', `${req.session.gg_name}`);
    
    let form = new formidable.IncomingForm();
    form.multiples = true; 

    let title;
    form.parse(req, function(err, fields, files){
      title = fields.upload_title;
    });

    form.on('end', function(field, files){
      let temp_path = this.openedFiles[0].path;
      let file_name = rename(this.openedFiles[0].name, function() {
        return {prefix: req.session.gg_id+'_'+Date.now()+'_'};
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
          
          console.log('[upload-server] completed.');
          res.redirect('/');
        }
      });
      
      const Image = require('../models/image');
      let newImage = new Image();
      newImage.title = title;
      newImage.author = req.session.gg_name;
      newImage.user_id = req.session.gg_user_id;
      var d = new Date();
      newImage.date = d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2) + " " + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);
      newImage.file_name = file_name;
      newImage.frame_num = Math.floor(Math.random() * 6) + 1;
      newImage.views = 0;

      // write log
      writeLog('upload-end', `${newImage.author}, ${newImage.title}, ${newImage.file_name}`);

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
    const Comment = require('../models/comment');
    Image.findOne({ no: req.query.no }, (err, image) => {
      if (err) return res.status(500).json({ error: err });
      if (!image) return res.status(404).json({ error: err });
      // 조회수 올리기
      image.views = image.views * 1 + 1;
      image.save(function(err){
        if(err) console.log('failed to update: ' + err);
      });

      // get comments
      Comment.find({ image_no: req.query.no }, (err, comments) => {
        // write log
        require('dns').lookup(require('os').hostname(), function (err, add, fam) {
          writeLog('detail', `${req.session.gg_name}, ${image.no}, ${image.title}, ${image.views} (${add})`);
        });
  
        // 받아온 no에 따른 사진, 제목, 작성자, 조회수 전달
        res.render("detail/index", {
          id: req.session.gg_id,
          img: image.file_name,
          title: image.title,
          author: image.author,
          views: image.views,
          date: image.date.slice(0, 10),
          no: req.query.no,
          comments: comments
        });
      });
    });
  });

  // detail-share
  app.post("/share", (req, res) => {
    writeLog('share', `${req.session.gg_name}, ${req.body.title}`);
  });

  // comment
  app.post("/comment", (req, res) => {
    if(!req.session.gg_id) res.redirect(`/detail?no=${req.body.no}`);
    
    const Comment = require('../models/comment');
    
    let newComment = new Comment();
    newComment.user_id = req.session.gg_user_id;
    newComment.name = req.session.gg_name;
    newComment.content = req.body.content;
    newComment.image_no = req.body.no;

    let d = new Date();
    newComment.date = d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2) + " " + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);

    // write log
    writeLog('comment', `${req.session.gg_name}, ${req.body.no}, ${req.body.content}`);

    newComment.save(err => {
      if (err) {
        console.error(err);
      }
    });

    res.redirect(`/detail?no=${req.body.no}`);
  });

  function writeLog(tag, str){
    const fs = require('fs');
    let d = new Date();
    let time = d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2) + " " + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);
    
    fs.appendFile('./public/log.txt',  `${time} [${tag}] ${str} \n`, 'utf8', function(err) {
      console.log( `[${tag}] ${str} `);
    });
  }
};