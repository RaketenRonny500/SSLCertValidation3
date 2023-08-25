const axios = require("axios");
const https = require('https');

class Cert {
    _cert = undefined
    constructor(host) {
        this.host = host;
    }

    async getCertificate() {
        try {
            if (this._cert) return this._cert;
            let tlsCert;
            const response = await axios({
                method: "GET",
                url: 'https://' + this.host,
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false
                }).on('keylog', (line, tlsSocket) => tlsCert = tlsSocket.getPeerCertificate(false))
            });

            this._cert = tlsCert;
            return this._cert;
        } catch (err) {
            console.log(err);
        }
    }

    async getValidationData() {
        try {
            const peerCertificate = await this.getCertificate();

            if (!peerCertificate) {
                return { valid: false };
            }

            const currentDate = new Date();
            const validFromDate = new Date(peerCertificate.valid_from);
            const validToDate = new Date(peerCertificate.valid_to);

            return {
                valid_from: peerCertificate.valid_from,
                valid_to: peerCertificate.valid_to,
                valid: (validFromDate < currentDate && validToDate > currentDate)
            };
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = Cert;
