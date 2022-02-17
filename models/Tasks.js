const res = require('express/lib/response')
const moment = require('moment')
const conexao = require('../infra/conexao')

class Tasks {
    add(tasks, res, client, number, status) {
        tasks.initialDate = moment().format('YYYY-MM-DD')
        const sql = `INSERT INTO tasks (client, number, status, initialDate, DoisD, TrintaD, SessentaD) VALUES ('${client}', ${number}, '${status}', ADDDATE(NOW(), INTERVAL 0 DAY), ADDDATE(NOW(), INTERVAL 2 DAY), ADDDATE(NOW(), INTERVAL 30 DAY), ADDDATE(NOW(), INTERVAL 60 DAY))`
        conexao.query(sql, tasks, (err, result) => {
            if (err) {
                res.status(400).json(err)
            } else {
                res.status(201).json(result)
            }
        })
    }

    list(res) {
        const sql = 'SELECT * FROM tasks'

        conexao.query(sql, (erro, resultados) => {

            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }

        })
    }

    listsch(res) {
        const sql = 'SELECT * FROM schmessage'

        conexao.query(sql, (erro, resultados) => {

            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }

        })
    }

    searchId(id, res) {
        const sql = `SELECT * FROM tasks WHERE id=${id}`
        conexao.query(sql, (erro, resultados) => {
            const atendimento = resultados[0]
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(atendimento)
            }
        })
    }

    searchClient(client, res) {
        const sql = `SELECT * FROM tasks WHERE client='${client}'`
        conexao.query(sql, (err, result) => {
            if (err) {
                res.status(400).json(err)
            } else {
                res.status(200).json(result)
            }
        })
    }

    alter(id, valores, res) {
        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
        const sql = 'UPDATE tasks SET ? where id=?'

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    delete(id, res) {
        const sql = 'DELETE FROM tasks  WHERE id=?'
        conexao.query(sql, id, (err, resultados) => {
            if (err) {
                res.status(400).json(err)
            } else {
                res.status(200).json(`ID ${id} Deletado`)
            }
        })
    }

    deleteNumber(number, res) {
        const sql = 'DELETE FROM tasks  WHERE number=?'
        conexao.query(sql, number, (err, resultados) => {
            if (err) {
                res.status(400).json(err)
            } else {
                res.status(200).json(`Numero ${number} Deletado`)
            }
        })
    }

    schMessage(msg, res, client, number, message, date){
        let date2 = moment(date, 'DD/MM/YYYY HH').format('YYYY-MM-DD HH')
        const sql = `INSERT INTO schMessage (client, number, message, date) VALUES ('${client}', ${number}, '${message}', '${date2}')`
        conexao.query(sql, msg, (err, result) => {
            if (err){
                res.status(400).json(err)
            } else {
                res.status(200).json(result)
            }
        })
    }

    sendMessage(msg, res, client, number, message){
        const sql = `INSERT INTO messages (client, number, message, date) VALUES ('${client}', '${number}', '${message}', ADDDATE(NOW(), INTERVAL 0 DAY) )` //ADDDATE(NOW(), INTERVAL 0 DAY)
        conexao.query(sql, msg, (err, result) => {
            if (err) {
                res.status(400).json(err)
                console.log('erro')
            } else {
                res.status(200).json(result)
            }
        })

        sendMsg(client, number, message)
    }
}

module.exports = new Tasks

function sendMsg(client, number, message){
    var axios = require('axios');
    var data = JSON.stringify({
    "phone": number,
    "message": message,
    "isGroup": false
    });

    var config = {
    method: 'post',
    url: `http://api.spacewebso.com.br:2121/api/Lucas/send-message`,
    headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer TOKEN-AQUI!`
    },
    data : data
    };

    axios(config)
    .then(function (response) {
    if (response.data.status == 'success'){
        console.log('Mensagem Enviada -', `Numero: ${number} Msg: ${message}`)
    } else {
        console.log('Erro: response-not-success')
    }
    })
    .catch(function (error) {
    console.log('Erro: catch-function-error');
    });
}