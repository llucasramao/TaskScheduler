module.exports = {

    sendMsg2(client, number, message) {
        var axios = require('axios');
        var data = JSON.stringify({
            "phone": number,
            "message": message,
            "isGroup": false
        });

        var config = {
            method: 'post',
            url: `http://api.spacewebso.com.br:2121/api/Lucas/send-message`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer TOKEN-AQUI!`
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                if (response.data.status == 'success') {
                    console.log('Mensagem Enviada -', `Numero: ${number} Msg: ${message}`)
                } else {
                    console.log('Erro: response-not-success')
                }
            })
            .catch(function (error) {
                console.log('Erro: catch-function-error');
            });
    },

    sendMsg(client, number, message) {
        console.log(`Send Message ${client}, ${number}, ${message}`)
    }
}