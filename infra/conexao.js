const mysql = require('mysql')

const conexao = mysql.createConnection(
{
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'mysql',
    database: 'nodejs'
}
)

module.exports = conexao
