const conexao = require('../infra/conexao')
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
                        tipeText(tipe, values.number)
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
                        tipeText(tipe, values.number)
                    } else {
                        console.log(Date(), 'Usuário Não Ativo')
                    }
                }
            })
        });
    },

    schMessage(text) {
        const sql = 'SELECT * FROM nodejs.schmessage WHERE CAST(date AS DATE) = ADDDATE(now(), INTERVAL 0 DAY)'
        conexao.query(sql, (err, result) => {
            if (err) throw err;
            result.forEach(function () {
                sendRequest(text, number)
            })
        })
    }

}

function tipeText(tipe, number) {
    if (tipe === 'DD') {
        var text = 'Enviando Requisição POST Dois DIAS'
        sendRequest(text, number)
    }
    if (tipe === 'TD') {
        var text = 'Enviando Requisição POST Trinta DIAS'
        sendRequest(text, number)
    }
    if (tipe === 'SD') {
        var text = 'Enviando Requisição POST Sessenta DIAS'
        sendRequest(text, number)
    }
}

function sendRequest(text, number) {
    sender.sendMsg(text, number)
}

function iniciarSessao() {
    console.log('Necessário Iníciar Sessão')
}