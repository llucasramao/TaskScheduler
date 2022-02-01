const res = require('express/lib/response')
const conexao = require('../infra/conexao')
const moment = require('moment')

function teste2() {
            const sql = 'SELECT * FROM tasks WHERE initialDate="2022-01-31 21:01:40"'
            conexao.query(sql, (err, result, fields) => {

                if (err) throw err;
                saida = JSON.stringify(result)
                if (result[0].status == 'Ativo') {
                    client = result[0].client
                    number = result[0].number
                    console.log(client, number)
                    //sendRequest(client, number)
                } else {
                    console.log('Desativado')
                    return 0
                }
            });
        }

function sendRequest(client, number) {
    console.log('Enviando Requisição POST', client, number)
}

function teste() {
    /*x = new Date()
    console.log(x)
    y = moment(x).date(3)
    console.log(y)*/
    inicio = new Date('2021-12-31')//.format('YYYY-MM-DD')
    d2 = moment(inicio).date(+7).format('YYYY-MM-DD')
    d30 = moment(inicio).date(+30).format('YYYY-MM-DD')
    d60 = moment(inicio).date(+60).format('YYYY-MM-DD')

    agora = moment().format('YYYY-MM-DD')
    console.log('Inicio:',inicio,'d2:', d2,'now:', agora)
    /*if(agora == d2){
        console.log('OK!')
    } else {
        
    }*/ 
}

teste()