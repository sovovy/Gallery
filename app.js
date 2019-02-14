var express = require('express');
var app = express();
const bodyParser = require('body-parser');
var mongoose    = require('mongoose');


// app.get('views')할 경우 실질적인 폴더의 위치 반환
app.set('views', __dirname + '/views');

// ejs 엔진을 이용하여 html 렌더링
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// mongodb 서버 연결
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    console.log('Connected to mongod server')
});
mongoose.connect('mongodb://localhost/GG')

var server = app.listen(8080, function(){
 console.log("Express server has started on http://127.0.0.1:8080")
});

var router = require('./routes/main')(app)
app.use(express.static('public'));
