const Cert = require('./Cert2.js')

const Hosts = ['alternate.de', 'polizei.nrw', 'rathergood.com']
const Validity = []

class Cron {
    constructor(intervalInMs) {
        this.intervalInMs = intervalInMs
        this.execute()
    }
    async execute() {
        for (let i=0; i <= Hosts.length-1; i++) {
            const cert = new Cert(Hosts[i])
            Validity[i] = await cert.getValidationData()
        }
        console.log(Validity)
        setTimeout(() => {this.execute()}, this.intervalInMs)
    }
}


module.exports = Cron