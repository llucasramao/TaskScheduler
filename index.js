const customExpress = require('./config/customExpress')
const conexao = require('./infra/conexao')
const Tableas = require('./infra/tabelas')
const https = require('https')
const fs = require('fs')

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
        https.createServer(options, app).listen(3000);
    }
})