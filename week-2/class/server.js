const { Pool } = require('pg');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());


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

/*week-3
const express = require("express");
const app = express();

const { Pool } = require("pg");
const poolInfo = require("./pool.json");
const pool = new Pool(poolInfo);

const getApi = require("./api");
const api = getApi({ pool });

// MIDDLEWARES
app.use(express.json());
app.get("/hotels", api.getHotels);
app.get("/hotels/:hotelId", api.getHotelById);
app.delete("/hotels/:hotelId", api.deleteHotelById);
app.post("/hotels", api.saveHotel);
app.get("/customers/:customerId", api.getHotelById);
app.patch("/customers/:customerId", api.updateCustomerEmail);
app.delete("/customers/:customerId", api.deleteCustomerById);

// ARRANCAR SERVIDOR
const port = 3000;
app.listen(port, () => console.log(`http://localhost:${port}/hotels`));

*/