const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')
const cors = require('cors');

module.exports = () => {
    const app = express()

    app.use(bodyParser.urlencoded({
        extended: true
    }))
    app.use(bodyParser.json())
    app.use((req, res, next) => {
        //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
        res.header("Access-Control-Allow-Origin", "*");
        //Quais são os métodos que a conexão pode realizar na API
        res.header("Access-Control-Allow-Methods", 'GET,PATCH,POST,DELETE');
        app.use(cors());
        next();
    })
    consign()
        .include('controllers')
        .into(app)

    return app
}
