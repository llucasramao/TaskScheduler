const schedule = require('node-schedule')
const DTS = require('./DTSSender')

function DTSSender() {
    schedule.scheduleJob('0 0 9 * * *', () => {
        DTS.DoisD()
        DTS.TrintaD()
        DTS.SessentaD()
    })
}

function DTSSender() {
    schedule.scheduleJob('0 0 */2 * * *', () => {
        DTS.schMessage()
    })
}

DTSSender()