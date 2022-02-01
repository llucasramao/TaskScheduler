const res = require('express/lib/response')
const conexao = require('../infra/conexao')

function teste(){
    const sql = 'SELECT * FROM tasks WHERE id=3'

    conexao.query(
        'SELECT id, client, number FROM tasks', 
        (err, rows) => {
        if (err) throw err
    
        rows.forEach(row => {
            console.log(`${row.title} by ${row.name}, ${row.location}`)
        });
    })
}

teste()