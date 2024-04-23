CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(50),
    password VARCHAR(50)
);

INSERT INTO users (email, password) VALUES
('juan@gmail.com', '12345'),
('pedro@gmail.com', '67890'),
('ana@outlook.com', '98765'),
('maria@yahoo.com', '54321');

-- Good query
SELECT * FROM users WHERE email = 'juan@gmail.com' AND password = '12345';

-- Sql injection
-- Contrasena' or '1'='1
SELECT * FROM users WHERE email = 'usuario@gmail.com' AND password = 'Contrasena' or '1'='1';
-- admin' or '2'='2'--
SELECT * FROM users WHERE email = 'admin@gmail.com' or '2'='2'-- AND password = '';
