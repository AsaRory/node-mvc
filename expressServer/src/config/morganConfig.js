const morgan = require('morgan');
const fs = require('fs')
const FileStreamRotator = require('file-stream-rotator'); // 文件切割
const path = require('path');

// 自定义token
morgan.token('from', function(req, res){
    return req.query.from || '-';
});

// 自定义format，其中包含自定义的token
morgan.format('joke', '[joke] :method :url :status :from ');

const logDirectory = path.join(__dirname, '../../log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
// create a rotating write stream
const accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDirectory, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: false
})
const morganConfig = morgan('joke', {stream: accessLogStream})
module.exports =  morganConfig;
