'use strict';
const tls = require('tls');

const socket = tls.connect({
    host: 'xhamster.com',
    port: 443,
    servername: 'xhamster.com'
}, () => {
    const peerCertificate = socket.getPeerCertificate();
    console.log(peerCertificate);
    socket.destroy();
});
socket.on('error', err => {
    console.log('Error: ' + err.message);
});
socket.on('close', () => {
});