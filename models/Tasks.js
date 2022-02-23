const res = require('express/lib/response')
const moment = require('moment')
const conexao = require('../infra/conexao')
const sender = require ('../scheduler/sender')

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

    schMessage(msg, res, client, number, message, date, time) {
        var date2 = `${date} ${time}`
        const sql = `INSERT INTO schmessage (client, number, message, date) VALUES ('${client}', ${number}, '${message}', '${date2}')`
        console.log(`('${client}', ${number}, '${message}', '${date2}')`)
        conexao.query(sql, msg, (err, result) => {
            if (err) {
                res.status(400).json(err)
            } else {
                res.status(200).json(result)
            }
        })
    }

    sendMessage(msg, res, client, number, message) {
        const sql = `INSERT INTO messages (client, number, message, date) VALUES ('${client}', '${number}', '${message}', ADDDATE(NOW(), INTERVAL 0 DAY) )` //ADDDATE(NOW(), INTERVAL 0 DAY)
        conexao.query(sql, msg, (err, result) => {
            if (res == null){
                //console.log('No res')
            } else {
                if (err) {
                    res.status(400).json(err)
                    console.log('erro')
                } else {
                    res.status(200).json(result)
                }
            }
        })

        sender.sendMsg(client, number, message)
    }
}

module.exports = new Tasks