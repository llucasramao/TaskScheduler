const schedule = require('node-schedule')
const DTS = require('./DTSSender')

function DTSSender() {
    schedule.scheduleJob('0 * * * * *', () => {
        DTS.DoisD()
        DTS.TrintaD()
        DTS.SessentaD()
    })
}

function DTSSender() {
    schedule.scheduleJob('0 * * * * *', () => {
        idx.DoisD()
        idx.TrintaD()
        idx.SessentaD()
    })
}

DTSSender()