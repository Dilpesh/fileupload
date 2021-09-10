var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 7015));

app.use(express.static(__dirname));




var fs = require('fs');

if (fs.existsSync('index.html'))
{
    fs.unlinkSync('index.html');
}


// if (process.argv[2] == 'local')
// {
//     fs.createReadStream('index-local.html').pipe(fs.createWriteStream('index.html'));
// } else
// {
//     fs.createReadStream('index-main.html').pipe(fs.createWriteStream('index.html'));
// }


app.get('/', function (request, response) {
    response.sendfile(__dirname + '/index.html');
});


app.listen(app.get('port'), function () {
});


