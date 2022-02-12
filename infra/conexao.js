const mysql = require('mysql')

const conexao = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'S3c_Mysql',
    database: 'nodejs'
})

module.exports = conexao
