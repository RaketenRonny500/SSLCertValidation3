const Cron = require('./cron')

class Host {
    constructor (host) {
        this.host = host
    }
}

class hostArray {
    constructor() {
        this.hosts = []
    }
    newHost(host) {
        let h = new Host(host)
        this.hosts.push(h)
        return h
    }
    get allHosts() {
        return this.hosts
    }
    get numberOfHosts() {
        return this.hosts.length
    }
}



module.exports = Host
module.exports = hostArray