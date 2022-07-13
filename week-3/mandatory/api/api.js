module.exports = (deps) => {
    async function getHotels(req, res) {
      const result = await deps.pool.query("SELECT * FROM hotels");
      res.json(result.rows);
    }
  
    async function saveHotel(req, res) {
      const h = req.body;
      const query = `insert into hotels (name, rooms, postcode) 
                                 values ($1,   $2,    $3)
                     returning id`;
      const result = await deps.pool.query(query, [h.name, h.rooms, h.postcode]);
  
      res.status(201).json({ hotelId: result.rows[0].id });
    }
  
    async function getHotelById(req, res) {
      const hotelId = req.params.hotelId;
  
      const query = `select * from hotels as h
                     where h.id = $1`;
      const result = await deps.pool.query(query, [hotelId]);
  
      const found = result.rows.length > 0;
      const statusCode = found ? 200 : 404;
      const resBody = found ? result.rows[0] : {};
  
      res.status(statusCode).json(resBody);
    }
  
    async function deleteHotelById(req, res) {
      const hotelId = req.params.hotelId;
  
      const deleteBookingsQuery = `delete from bookings where hotel_id = $1`;
      await deps.pool.query(deleteBookingsQuery, [hotelId]);
  
      const deleteHotelQuery = `delete from hotels where id=$1;`;
      await deps.pool.query(deleteHotelQuery, [hotelId]);
  
      res.status(200).json({});
    }
    async function getCustomerById(req, res) {
      const customerId = req.params.customerId;
  
      const query = `select * from customers as c
                     where c.id = $1`;
      const result = await deps.pool.query(query, [customerId]);
  
      const found = result.rows.length > 0;
      const statusCode = found ? 200 : 404;
      const resBody = found ? result.rows[0] : {};
  
      res.status(statusCode).json(resBody);
    }
  
    async function updateCustomerEmail(req, res) {
      const customerId = req.params.customerId;
      const email = req.body.email;
  
      const query = `update customers 
                     set email=$1
                     where id=$2`;
      await deps.pool.query(query, [email, customerId]);
  
      res.status(200).json({ customerId });
    }
  
    async function deleteCustomerById(req, res) {
      const customerId = req.params.customerId;
  
      const deleteBookingsQuery = `delete from bookings where customer_id = $1`;
      await deps.pool.query(deleteBookingsQuery, [customerId]);
  
      const deleteCustomerQuery = `delete from customers where id=$1;`;
      await deps.pool.query(deleteCustomerQuery, [customerId]);
  
      res.status(200).json({});
    }
  
    return {
      getHotels,
      saveHotel,
      getHotelById,
      deleteHotelById,
      getCustomerById,
      updateCustomerEmail,
      deleteCustomerById,
    };
  };
  