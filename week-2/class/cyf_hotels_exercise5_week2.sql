--week 2

ALTER TABLE customers ADD COLUMN date_of_birth DATE;
ALTER TABLE customers DROP COLUMN date_of_birth;
SELECT * FROM customers
--EJERCICIO 1

ALTER TABLE customers ADD COLUMN date_of_birth DATE; SELECT * FROM customers
ALTER TABLE customers RENAME COLUMN date_of_birth TO birthdate;
ALTER TABLE customers DROP COLUMN birthdate; 

--EJERCICIO 2

CREATE TABLE test (
  id        SERIAL PRIMARY KEY,
  name      VARCHAR(30) NOT NULL,
  email     VARCHAR(120) NOT NULL,
  address   VARCHAR(120),
  city      VARCHAR(30),
  postcode  VARCHAR(12),
  country   VARCHAR(20)
);

SELECT * FROM test;

DROP TABLE test;

--EJERCICIO 3

SELECT * FROM hotels;
UPDATE hotels SET postcode='L10XYZ' WHERE name='Elder Lake Hotel';
SELECT * FROM hotels;

UPDATE hotels SET rooms=25 WHERE name='Cozy Hotel';
SELECT * FROM hotels;

UPDATE customers SET address='2 Blue street', city='Glasgow', postcode='G11ABC' WHERE name='Nadia Sethuraman';
SELECT * FROM customers;

UPDATE bookings SET nights=5 WHERE customer_id=1 AND hotel_id=1;
SELECT * FROM bookings;

SELECT COUNT(*) FROM bookings WHERE customer_id=1 AND hotel;

--EJERCICIO 4

DELETE FROM bookings WHERE customer_id=8 AND checkin_date 2020-01-03;
SELECT * FROM bookings;

DELETE FROM bookings WHERE customer_id=6;
SELECT * FROM bookings;

DELETE FROM customers WHERE id=6;
SELECT * FROM customers;

--EJERCICIO 5

SELECT * FROM bookings
INNER JOIN customers ON customers.id=bookings.customer_id
INNER JOIN hotels ON hotels.id=bookings.hotel_id;



