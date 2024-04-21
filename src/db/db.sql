CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    password VARCHAR(50)
);

INSERT INTO users (name, password) VALUES
('Juan', '12345'),
('Pedro', '67890'),
('Ana', '98765');

-- Good query
SELECT * FROM users WHERE name = 'Juan' AND password = '12345';

-- Sql injection
-- Contrasena' or '1'='1
SELECT * FROM users WHERE name = 'Usuario' AND password = 'Contrasena' or '1'='1';
-- admin' or '2'='2'--
SELECT * FROM users WHERE name = 'admin' or '2'='2'-- AND password = '';
