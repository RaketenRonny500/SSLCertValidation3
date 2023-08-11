'use strict';
const tls = require('tls');

class certCheck {
    socket;
    constructor(host, port) {
        this.socket = tls.connect({
            host: host,
            port: port,
        });
        this.socket.on('error', err => {
            console.log('Error: ' + err.message);
        });
        this.socket.on('close', () => {
        });
    }
    check(){
            const peerCertificate = this.socket.getPeerCertificate();
            console.log(peerCertificate)
            const today = new Date()
            return new Date(peerCertificate.valid_to) > today && new Date(peerCertificate.valid_from) < today
    }
}

module.exports = certCheck