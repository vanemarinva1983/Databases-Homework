const { Pool } = require('pg');
const express = require('express');
const app = express();


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cyf_hotels',
    password: 'VanessaMarin',
    port: 5432
});

app.get("/hotels", function(req, res) {
    pool.query('SELECT * FROM hotels', (error, result) => {
        res.json(result.rows);
    });
});

app.listen(3000, function(){
    console.log ("aplicacion en marcha");
})

