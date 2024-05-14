CREATE TABLE IF NOT EXISTS customers (
    customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(20) NOT NULL,
    firstname VARCHAR(20),
    lastname VARCHAR(20),
    password VARCHAR(20) NOT NULL,
    birth_date DATE NOT NULL,
    points INT DEFAULT 0,
    is_admin BIT DEFAULT FALSE
);
