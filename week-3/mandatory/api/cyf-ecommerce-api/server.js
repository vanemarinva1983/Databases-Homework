const { Pool } = require('pg');
const express = require('express');
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cyf_ecommerce-db',
    password: 'VanessaMarin',
    port: 5432
});

app.get("/customers", function (req, res) {
    pool
      .query("SELECT * FROM customers")
      .then((result) => res.json(result.rows))
      .catch((e) => console.error(e));
  });
  

app.get("/suppliers", function (req, res) {
    pool.query("SELECT * FROM suppliers", (error, result) => {
      res.json(result.rows);
    });
  });
  

//1. y 2.
app.get("/products", function (req, res) {
    const nameProduct = req.query.name;
    let query = `SELECT product_name, supplier_name FROM products AS p INNER JOIN suppliers AS s ON s.id=supplier_id`;

    if (nameProduct) {
        query = `SELECT * FROM products WHERE product_name LIKE '%${nameProduct}%' ORDER BY product_name`;
      }
    
    pool
        .query(query)
        .then((result) => res.json(result.rows))
        .catch((e) => console.error(e));
    });


  //3.
  app.get("/customers/:customerId", function (req, res) {
    const customerId = req.params.customerId;
  

    pool
        .query(`SELECT * FROM customers WHERE id = ${customerId}`)
        .then((result) => res.json(result.rows))
        .catch((e) => console.error(e));
    });

  //4.
  app.post("/customers", function (req, res){
    const newCustomerName = req.body.name;
    const newCustomerAddress = req.body.address;
    const newCustomerCity = req.body.city;
    const newCustomerCountry = req.body.country;

    const query =
    "INSERT INTO customers (name, address, city, country) VALUES ($1, $2, $3, $4)";

    pool
    .query(query, [
      newCustomerName,
      newCustomerAddress,
      newCustomerCity,
      newCustomerCountry,
    ])
    .then(() => res.send("Customer created!"))
    .catch((e) => console.error(e));
});

//5.
    app.post('/products', function (req, res) {
        const newProductName = req.body.product_name;
        const newProductPrice = req.body.unit_price;
        const newProductSupplier = req.body.supplier_id;

    if (!Number.isInteger(newProductPrice) || newProductPrice <= 0) {
            return res.status(400).send('The number of unit price  should be a positive integer.');
          }
        
        pool
        .query(`SELECT * FROM suppliers AS s WHERE s.id=$1`, [newProductSupplier]).then((result) => {
            if (result.rows.length === 0) {
              return res.status(400).send('Suppliers doesn\'t exists!');
            } else {
              const query = 'INSERT INTO products (product_name, unit_price, supplier_id) VALUES ($1, $2, $3) RETURNING id';
        pool
                .query(query, [newProductName, newProductPrice, newProductSupplier])
                .then((result) => res.status(201).json({ productId: result.rows[0].id }))
                .catch((e) => console.error(e));
            }
          });
        });
      
        


  //6.
  app.post('/customers/:customerId/orders', function(req, res) {
    const newOrderDate = req.body.order_date; 
    const newOrderReference = req.body.order_reference; 
    const newCustomerId = req.params.customerId; 
    
    pool
    .query(`SELECT * FROM customers AS c WHERE c.id=$1`, [newCustomerId]).then((result) => {
        if (result.rows.length === 0) {
          return res.status(400).send('Customer NOT exists!');
        } else {
          const query = 'INSERT INTO orders (order_date, order_reference, customer_id) VALUES ($1, $2, $3) RETURNING id';
    pool
            .query(query, [newOrderDate, newOrderReference, newCustomerId])
            .then((result) => res.status(201).json({ orderId: result.rows[0].id }))
            .catch((e) => console.error(e));
        }
      });
    });
  
  //7.
  app.put('/customers/:customerId', function(req, res) {
    const updateName = req.body.name; 
    const updateAddress = req.body.address; 
    const updateCity = req.body.city; 
    const updateCountry = req.body.country; 
    const customerId = req.params.customerId; 
    
    pool
    .query(`SELECT * FROM customers WHERE id=$1`, [customerId])
    .then(result => {
        if (result.rows.length > 0){
            const query =
            'UPDATE customers SET name=$1, address=$2, city=$3, country=$4 WHERE id=$5 RETURNING id';
            pool
            .query(query, [updateName, updateAddress, updateCity, updateCountry, customerId])
            .then(() => res.send("Customer UpDate!"))
            .catch((e) => console.error(e));
        }
        else{
            return res
            .status(400)
            .send("The customer not exists!");
        }
    })
});

  //8.
  app.delete('/orders/:orderId', function(req, res) {
    const orderId = req.params.orderId;

    pool
    .query(`SELECT * FROM orders WHERE id=$1`, [orderId])
    .then(result => {
        if (result.rows.length > 0){
            const query =
            `DELETE FROM order_items where order_id = ${orderId};
            DELETE FROM orders where id = ${orderId}`;
    pool
            .query(query)
            .then(() => res.send("Order Delete!"))
            .catch((e) => console.error(e));
        }
        else{
            return res
            .status(400)
            .send("The order not exists!");
        }
    })
});
 

  //9.
  app.delete('/customers/:customerId', function(req, res) {
    const customerId = req.params.customerId;

    pool
    .query(`SELECT * FROM orders WHERE customer_id=$1`, [customerId])
    .then(result => {
        if (result.rows.length > 0){
            return res
            .status(400)
            .send("The customer has one, or more orders!");
        }
        else{
            pool
            .query(`DELETE FROM customers where id = ${customerId}`)
            .then(() => res.send("Customer delete!"))
            .catch((e) => console.error(e));
        }
    })
});

  //10.
  app.get('/customers/:customerId/orders', (req, res) => {
    const customerId = req.params.customerId;

  pool
    .query(
      `SELECT order_reference, order_date, product_name, unit_price, supplier_name, quantity
    FROM customers AS c
    INNER JOIN orders AS o ON c.id=o.customer_id
    INNER JOIN order_items AS i ON o.id=i.order_id
    INNER JOIN products AS p ON p.id=i.product_id
    INNER JOIN suppliers AS s ON s.id=p.supplier_id
    WHERE c.id=$1`,
      [customerId]
    )
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

  
app.listen(5000, function(){
    console.log ("aplicacion en marcha");
});