const axios = require("axios")
const https = require('https');

class Cert {
    _cert = undefined
    constructor(host) {
        this.host = host
    }
    getCertificate() {
        try {
            if (this._cert) return new Promise((resolve) => resolve(this._cert))
            let tlsCert;
            return new Promise(
                (resolve, reject) => {
                    try {
                        axios({
                            method: "GET",
                            url: 'https://'+this.host,
                            httpsAgent: new https.Agent({
                                rejectUnauthorized: false
                            })
                                .on('keylog', (line, tlsSocket) => tlsCert = tlsSocket.getPeerCertificate(false))
                        }).catch(err => console.log(err)).then(response => {
                            this._cert = tlsCert
                            resolve(this._cert)
                        })
                    } catch (err) { console.log(err) }
                }
            )
        } catch (err) { console.log(err) }
    }
    getValidationData() {
        return new Promise((resolve, reject) => {
            try {
                this.getCertificate().then(peerCertificate => {
                    if (!peerCertificate) return resolve({ valid: false })
                    const currentDate = new Date()
                    const validFromDate = new Date(peerCertificate.valid_from)
                    const validToDate = new Date(peerCertificate.valid_to)
                    resolve(
                        {
                            valid_from: peerCertificate.valid_from,
                            valid_to: peerCertificate.valid_to,
                            valid: (validFromDate < currentDate && validToDate > currentDate)
                        }
                    )
                })
            } catch (err) { console.log(err) }
        })
    }
}

module.exports = Cert

// async await