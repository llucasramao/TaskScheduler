const schedule = require('node-schedule')
const DTS = require('./DTSSender')

module.exports = {
    DTSSender() {
        console.log('Cron DTSSender OK!')
        schedule.scheduleJob('* * * * * *', () => {//('0 0 12 * * *', () => {
            DTS.DoisD()
            DTS.TrintaD()
            DTS.SessentaD()
            
        })
    },

    schSender() {
        console.log('Cron schMessage OK!')
        schedule.scheduleJob('* * * * * *', () => {
            DTS.schMessage()
            
        })
    }
}