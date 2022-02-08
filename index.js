const customExpress = require('./config/customExpress')
const conexao = require('./infra/conexao')
const Tableas = require('./infra/tabelas')
var https = require('https')
var fs = require('fs')

conexao.connect(erro => {
    if(erro){
        console.log(erro)
    } else {
        console.log('MySQL Conectado!')
        Tableas.init(conexao)


        const options = {
            key: fs.readFileSync("/etc/letsencrypt/live/desen.api.spacewebso.com.br/privkey.pem"),
            cert: fs.readFileSync("/etc/letsencrypt/live/desen.api.spacewebso.com.br/cert.pem")
            };

        const app = customExpress()
        //app.listen(3000, () => console.log('Servidor rodando na porta 3000'))
        https.createServer(options, app).listen(3333);


    }
})