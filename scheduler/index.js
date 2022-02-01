const conexao = require('../infra/conexao')



function DoisD() {
    const sql = 'SELECT * FROM nodejs.tasks where CAST(DoisD AS DATE) = CAST(NOW() AS DATE)'
    conexao.query(sql, (err, result, fields) => {
        if (err) throw err;
        x = 0
        saida = JSON.stringify(result)
        if (saida === '[]') {} else {
            client = result[x].client
            number = result[x].number
            if (result[x].status === 'Ativo') {
                tipe = 'DD'
                sendRequest(tipe, client, number)
            } else {
                console.log(Date(),'Usuário Não Ativo')
            }
        }
    });
}

function TrintaD() {
    const sql = 'SELECT * FROM nodejs.tasks where CAST(NOW() AS DATE) = CAST(NOW() AS DATE)'
    conexao.query(sql, (err, result, fields) => {
        if (err) throw err;
        x = 0
        saida = JSON.stringify(result)
        if (saida === '[]') {} else {
            client = result[x].client
            number = result[x].number
            if (result[x].status === 'Ativo') {
                tipe = 'TD'
                sendRequest(tipe, client, number)
            } else {
                console.log(Date(),'Usuário Não Ativo')
            }
        }
    });
}

function SessentaD() {
    const sql = 'SELECT * FROM nodejs.tasks where CAST(SessentaD AS DATE) = CAST(NOW() AS DATE)'
    conexao.query(sql, (err, result, fields) => {
        if (err) throw err;
        x = 0
        saida = JSON.stringify(result)
        if (saida === '[]') {} else {
            client = result[x].client
            number = result[x].number
            if (result[x].status === 'Ativo') {
                tipe = 'SD'
                sendRequest(tipe, client, number)
            } else {
                console.log(Date(),'Usuário Não Ativo')
            }
        }
    });
}


function sendRequest(tipe, client, number) {
    if (tipe == 'DD') {
        console.log('Enviando Requisição POST Dois DIAS', client, number)
    }
    if (tipe == 'TD') {
        console.log('Enviando Requisição POST Trinta DIAS', client, number)
    }
    if (tipe == 'SD') {
        console.log('Enviando Requisição POST Sessenta DIAS', client, number)
    }


}

DoisD()
TrintaD()
SessentaD()