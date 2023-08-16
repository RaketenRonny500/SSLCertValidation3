const express = require('express');
const app = express();
const Cert = require('./Cert2.js')
const Cron = require('./cron.js')


app.get ('/', (req, res) => {
    res.sendFile('index.html')
})
app.get ('/check/:host', async (req, res) => {
    const cert = new Cert(req.params.host)
    let ValidationResult = await cert.getValidationData()
    console.log(ValidationResult)
    res.send(ValidationResult)
})

const cron = new Cron(10000)

app.listen(3000)