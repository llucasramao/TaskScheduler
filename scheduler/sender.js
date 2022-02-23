module.exports = {

    

    sendMsg(client, number, message) {
        var axios = require('axios');
        var data = JSON.stringify({
            "phone": number,
            "message": message,
            "isGroup": false
        });

        var token = '$2b$10$o8KptoEXotQi1OZM9TRlyuYY4IpoRnBSoakpxbW3CpPCgvGzCPNoq';
        var session = 'botSpaceWeb';

        var config = {
            method: 'post',
            url: `http://api.spacewebso.com.br:2121/api/${session}/send-message`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                if (response.data.status == 'success') {
                    console.log('Mensagem Enviada -', `Numero: ${number} Msg: ${message}`)
                } else {
                    console.log('Erro: response-not-success', response.data)
                }
            })
            .catch(function (error) {
                console.log('Erro: catch-function-error', error);
            });
    },

    sendMsg1(client, number, message) {
        console.log(`Send Message ${client}, ${number}, ${message}`)
    }
}