const schedule = require('node-schedule')
const idx = require('./index')


function doisDias(oi) {
    schedule.scheduleJob('0 * * * * *', () => {
        idx.DoisD()
        idx.TrintaD()
        idx.SessentaD()
    })
}

doisDias()