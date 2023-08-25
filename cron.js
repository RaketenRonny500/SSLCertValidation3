const sqlite3 = require('sqlite3').verbose();
const Cert = require('./Cert.js');
const rss = require('./rss.js')

class Cron {
    constructor(intervalInMs) {
        this.intervalInMs = intervalInMs;
        this.rss = new rss();
        this.execute();
    }

    async getHostsFromDatabase() {
        const db = new sqlite3.Database('./hosts.db', sqlite3.OPEN_READWRITE);
        return new Promise((resolve, reject) => {
            db.all('SELECT hostname FROM hosts', [], (err, rows) => {
                db.close();
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows.map(row => row.hostname));
            });
        });
    }

    async execute() {
        try {
            const hosts = await this.getHostsFromDatabase();
            for (let i = 0; i < hosts.length; i++) {
                const cert = new Cert(hosts[i]);
                const validationData = await cert.getValidationData();
                console.log(validationData, hosts[i])
                if (!validationData.valid) {
                    this.rss.notify(hosts[i], validationData)
                }
            }
        } catch (err) {
            console.error(err);
        }
        setTimeout(() => { this.execute() }, this.intervalInMs);
    }
}

module.exports = Cron;
