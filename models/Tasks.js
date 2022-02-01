const res = require('express/lib/response')
const moment = require('moment')
const conexao = require('../infra/conexao')

class Tasks {
    add(tasks, res, client, number, status) {
        tasks.initialDate = moment().format('YYYY-MM-DD')
        const sql = `INSERT INTO tasks (client, number, status, initialDate, DoisD, TrintaD, SessentaD) VALUES ('${client}', ${number}, '${status}', CAST(NOW() AS DATE), ADDDATE(NOW(), INTERVAL 2 DAY), ADDDATE(NOW(), INTERVAL 30 DAY), ADDDATE(NOW(), INTERVAL 60 DAY))`
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
        conexao.query(sql, id, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(`ID ${id} Deletado`)
            }
        })
    }
}
module.exports = new Tasks