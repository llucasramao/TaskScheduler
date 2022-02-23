const conexao = require('../infra/conexao');
const Tasks = require('../models/Tasks');
const sender = require('./sender')


module.exports = {
    DoisD() {
        const sql = 'SELECT * FROM nodejs.tasks where CAST(DoisD AS DATE) = CAST(NOW() AS DATE)'
        conexao.query(sql, (err, result) => {
            if (err) throw err;
            x = 0
            saida = JSON.stringify(result)
            result.forEach(function (values) {
                if (saida === '[]') {} else {
                    if (values.status === 'Ativo') {
                        tipe = 'DD'
                        tipeText(tipe, values.number)
                    } else {
                        console.log(Date(), 'Usuário Não Ativo')
                    }
                }
            })
        });
    },

    TrintaD() {
        const sql = 'SELECT * FROM nodejs.tasks where CAST(TrintaD AS DATE) = CAST(NOW() AS DATE)'
        conexao.query(sql, (err, result, fields) => {
            if (err) throw err;
            x = 0
            saida = JSON.stringify(result)
            result.forEach(function (values, qnt, array) {
                if (saida === '[]') {} else {
                    if (values.status === 'Ativo') {
                        tipe = 'TD'
                        tipeText(tipe, values.number, values.client)
                    } else {
                        console.log(Date(), 'Usuário Não Ativo')
                    }
                }
            })
        });
    },

    SessentaD() {
        const sql = 'SELECT * FROM nodejs.tasks WHERE CAST(SessentaD AS DATE) = CAST(NOW() AS DATE)'
        conexao.query(sql, (err, result, fields) => {
            if (err) throw err;
            x = 0
            saida = JSON.stringify(result)
            result.forEach(function (values, qnt, array) {
                if (saida === '[]') {} else {
                    if (values.status === 'Ativo') {
                        tipe = 'SD'
                        tipeText(tipe, values.number, values.client)
                    } else {
                        console.log(Date(), 'Usuário Não Ativo')
                    }
                }
            })
        });
    },

    schMessage(text) { // Necessário fazer query para saber qual mensagem será enviada e Ler data certa
        const sql = "SELECT * FROM nodejs.schmessage WHERE DATE_FORMAT(date, '%YY-%m-%d %k:%i') = DATE_FORMAT(now(), '%YY-%m-%d %k:%i')"
        conexao.query(sql, (err, result) => {
            //console.log('Realizando query')
            if (err) throw err;
            result.forEach(function (values) {
                res = null
                Tasks.sendMessage('', null, values.client, values.number, values.message)
            })
        })
    }

}

function tipeText(tipe, number, client) {
    if (tipe === 'DD') {
        var message = 'Enviando Requisição POST Dois DIAS'
        Tasks.sendMessage('', null, client, number, message)
    }
    if (tipe === 'TD') {
        var message = 'Enviando Requisição POST Trinta DIAS'
        Tasks.sendMessage('', null,client, number, message)
    }
    if (tipe === 'SD') {
        var message = 'Enviando Requisição POST Sessenta DIAS'
        Tasks.sendMessage('', null, client, number, message)
    }
}