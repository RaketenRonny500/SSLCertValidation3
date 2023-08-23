const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./hosts.db');

db.run('CREATE TABLE IF NOT EXISTS hosts (id INTEGER PRIMARY KEY, hostname TEXT NOT NULL)', (err) => {
    if (err) console.error(err.message);
    else console.log('Table created or already exists.');
});

db.close();