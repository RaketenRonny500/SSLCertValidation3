// IMPORTS

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const Cron = require('./cron.js');
const app = express();
const db = new sqlite3.Database('./hosts.db');
const auth = require('./auth.js')


// MIDDLEWARE STACK
app.use((req, res, next) => {
    res.header(`Access-Control-Allow-Origin`, `*`);
    res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
    res.header(`Access-Control-Allow-Headers`, `Content-Type`);
    next();
})
app.use(express.json())                                                                                                                 // parse payload as json, populate req.body
app.use(express.static("www"))                                                                                                     // serve static (as-is) files from "www" directory
app.use(auth)

// CREATE, UPDATE
app.post('/host/:id?', (req, res) => {
    const id = req.params.id ?? undefined                                                                                   // set id as undefined if it doesn't exist
    const hostname =  req.body.hostname
    if (!hostname) return res.status(400).send("Error, missing hostname")                                                   // check if hostname exists in request body
    if (id) {
        db.run('UPDATE hosts SET hostname = ? WHERE id = ?', [hostname, id], (err, rows) => {
            if (err) {
                console.error(err.message)
                res.status(500).send("Error updating host")
            } else {
                res.status(200).json(rows)                                                                                         // rows?
            }
        });

    }
    else {
        db.run('INSERT INTO hosts (hostname) VALUES (?)', [hostname], (err, rows) => {
            if (err) {
                console.error(err.message)
                res.status(500).send("Error creating host")
            } else {
                res.status(200).json(rows)
            }
        });
    }
});

// READ
app.get('/host/:id?', (req, res) => {
    const id = req.params.id ?? undefined
    if (id) {
        db.get('SELECT * FROM hosts WHERE id = ?', [id], (err, row) => {
            if (err) {
                console.error(err.message)
                res.status(500).send("Error fetching hosts")
            } else {
                res.status(200).json(row)
            }
        });

    }
    else {
        db.all('SELECT * FROM hosts', [], (err, rows) => {
            if (err) {
                console.error(err.message)
                res.status(500).send("Error fetching hosts")
            } else {
                res.status(200).json(rows)
            }
        });
    }


});

// DELETE
app.delete('/host/:id?', (req, res) => {
    const id = req.params.id ?? undefined
    if (id) {
        db.run('DELETE FROM hosts WHERE id = ?', [id], (err, rows) => {
            if (err) {
                console.error(err.message)
                res.status(500).send("Error deleting host")
            } else {
                res.status(200).json(rows)
            }
        });

    }
});


const cron = new Cron(10000)

app.listen(3000, () => {
    console.log("Server started on port 3000")
});