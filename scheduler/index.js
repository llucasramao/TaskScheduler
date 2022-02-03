const { text } = require('body-parser');
const { response } = require('express');
const conexao = require('../infra/conexao')


module.exports = {
    DoisD() {
        const sql = 'SELECT * FROM nodejs.tasks where CAST(NOW() AS DATE) = CAST(NOW() AS DATE)'
        conexao.query(sql, (err, result, fields) => {
            if (err) throw err;
            x = 0
            saida = JSON.stringify(result)
            result.forEach(function (values, qnt, array) {
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
        const sql = 'SELECT * FROM nodejs.tasks where CAST(SessentaD AS DATE) = CAST(NOW() AS DATE)'
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

}

function tipeText(tipe, number) {
    if (tipe === 'DD') {
        var text = 'Enviado teste de Dois Dias a cada 5seg'
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

function sendRequest(text, number){
    console.log('1');
    (async () => {
        const response = await fetch(
            'http://107.152.47.102:3333/sendText', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'sessionkey': 'senha',
                },
                body: JSON.stringify({
                    session: 'Lucas',
                    number: '556194230707',
                    text: 'text'
                })
            

            }, 
        );console.log('2')

        const content = await response.json();
        console.log(content);

        if (content.result == '200') {
            console.log('enviado')
        } else {
            var saida = JSON.stringify(content)
            console.log(saida)
        }

    });
}

sendRequest()