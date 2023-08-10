const express = require('express');
const app = express();
const certCheck = require('./certCheck.js')

app.get ('/', (req, res) => {
    res.sendFile('index.html')
})
app.get ('/check/:host/:port', (req, res) => {
    console.log(req.params)
    const cert = new certCheck(req.params.host, req.params.port)
    res.send(cert.check())
})

app.listen(3000)