const customExpress = require('./config/customExpress')
const conexao = require('./infra/conexao')
const Tableas = require('./infra/tabelas')
const https = require('https')
const fs = require('fs')

ssl = 0
if (ssl == 0){http()}
if (ssl == 1){httpsec()}
else{console.log('Defina o ssl no index.js (0 para não | 1 para sim)')}



function http(){
    conexao.connect(erro => {
        if(erro){
            console.log(erro)
        } else {
            console.log('MySQL Conectado!')
            Tableas.init(conexao)

            const app = customExpress()
            app.listen(3000, () => console.log('API HTTP rodando na porta 3000'))

        }
    })
}


function httpsec(){
    conexao.connect(erro => {
        if(erro){
            console.log(erro)
        } else {
            console.log('MySQL Conectado!')
            Tableas.init(conexao)


            const options = {
                key: fs.readFileSync("./certificates/privkey.pem"),
                cert: fs.readFileSync("./certificates/cert.pem")
                };

            const app = customExpress()
            https.createServer(options, app).listen(3000, () => console.log('API HTTPS rodando na porta 3000'));
        }
    })
}
