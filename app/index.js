var mysql_module = require('./mysql/mysql.js');
var livesql_module = require('./livesql/livesql.js');

livesql_module.getChanges(mysql_module);