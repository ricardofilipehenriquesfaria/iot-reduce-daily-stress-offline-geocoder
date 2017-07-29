var mysql_module = require('./mysql/mysql.js');
var fs_module = require('./fs/fs.js');
var request_module = require('./request/request.js');

fs_module.getRoadsData(mysql_module, request_module);