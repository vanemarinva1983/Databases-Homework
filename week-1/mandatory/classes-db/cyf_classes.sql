-- Database: cyf_classes

-- DROP DATABASE IF EXISTS cyf_classes;

CREATE DATABASE cyf_classes
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Spain.1252'
    LC_CTYPE = 'Spanish_Spain.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

--Ejercicio 2

CREATE TABLE mentors (
    
    id                  SERIAL PRIMARY KEY,
    name                VARCHAR(30) NOT NULL,
    years_glasgow       INT NOT NULL,
    address             VARCHAR(120),
    favorite_language   VARCHAR(30)
);

--Ejercicio 3

INSERT INTO mentors (name,                  years_glasgow,  address,        favorite_language) 
              VALUES('Vanessa Marin',       '2',            'Manresa',      'javascript');
INSERT INTO mentors (name,                  years_glasgow,  address,        favorite_language) 
              VALUES('Yhenifer Pulido',     '5',            'Barcelona',    'react');
INSERT INTO mentors (name,                  years_glasgow,  address,        favorite_language) 
              VALUES('Javier Sanchez',      '3',            'Igualada',     'sql');
INSERT INTO mentors (name,                  years_glasgow,  address,        favorite_language) 
              VALUES('Laeken Rosado',       '1',            'Terrasa',      'javascript');
INSERT INTO mentors (name,                  years_glasgow,  address,        favorite_language) 
              VALUES('Jonatan Palacios',    '2',            'Sabadel',      'python');  
INSERT INTO mentors (name,                  years_glasgow,  address,        favorite_language) 
              VALUES('Samantha Lopez',      '6',            'Sabadel',      'python');                 
              
              

--DELETE FROM table

-- Ejercicio 4

CREATE TABLE students (
    
    id                  SERIAL PRIMARY KEY,
    name                VARCHAR(30) NOT NULL,
    address             VARCHAR(120),
    graduate_cyf        VARCHAR(30)
);

--Ejercicio 5

INSERT INTO students (name,                     address,        graduate_cyf) 
               VALUES('Madeline Rivera',        'Manresa',      'si');
INSERT INTO students (name,                     address,        graduate_cyf) 
               VALUES('Noah Palacios',          'Barcelona',    'no');
INSERT INTO students (name,                     address,        graduate_cyf) 
               VALUES('Gaia Palacios',          'Vic',          'si');
INSERT INTO students (name,                     address,        graduate_cyf) 
               VALUES('Maria Camila Valencia',  'Badalona',     'si');
INSERT INTO students (name,                     address,        graduate_cyf) 
               VALUES('Rocio Valencia',         'Masnou',       'si');
INSERT INTO students (name,                     address,        graduate_cyf) 
               VALUES('Nur Zapata',             'Sitges',       'no');
INSERT INTO students (name,                     address,        graduate_cyf) 
               VALUES('Jessica Fernandez',      'Manresa',      'no');
INSERT INTO students (name,                     address,        graduate_cyf) 
               VALUES('Wonka Marin',            'Manresa',      'si');
INSERT INTO students (name,                     address,        graduate_cyf) 
               VALUES('Paquita Pulido',         'Manresa',      'no');
INSERT INTO students (name,                     address,        graduate_cyf) 
               VALUES('Claudia Rodriguez',      'Barcelona',    'si');


--Ejercicio 6

select * from mentors;
select * from students;

--Ejercicio 7

CREATE TABLE classes (
    
    id                  SERIAL PRIMARY KEY,
    mentor              VARCHAR(30) NOT NULL,
    topic               VARCHAR(120),
    specific_date       DATE NOT NULL,
    specific_location   VARCHAR(30)
);

--Ejercicio 8

INSERT INTO classes  (mentor,               topic,          specific_date,      specific_location) 
               VALUES('Jorge Pulido',       'NodeJS',       '2022-06-15',       'Manresa');
INSERT INTO classes  (mentor,               topic,          specific_date,      specific_location) 
               VALUES('Jesus Valencia',     'Javascript',   '2022-04-14',       'Barcelona');
INSERT INTO classes  (mentor,               topic,          specific_date,      specific_location) 
               VALUES('Francisco Camacho',  'NodeJS',       '2021-11-12',       'Terrasa');

select * from classes;

--Ejercicio 9

CREATE TABLE attendance (
    
    id                  SERIAL PRIMARY KEY,
    student_id          INT REFERENCES students(id),
    class_id            INT REFERENCES classes(id)
);

INSERT INTO attendance (student_id, class_id) 
                 VALUES(4,          2);
                 
INSERT INTO attendance (student_id, class_id) 
                 VALUES(10,         1);

select * from attendance;

--Ejercicio 10
--1
select name,years_glasgow from mentors where years_glasgow > '5';

--2
select name,favorite_language from mentors where favorite_language = 'javascript';

--3
select name from students where graduate_cyf = 'si';

--4
select * from classes where specific_date  < '2022-06-01';

--5
select student_id from attendance
where class_id = 1;









