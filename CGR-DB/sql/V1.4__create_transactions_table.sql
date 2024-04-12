CREATE TABLE IF NOT EXISTS transactions (
    transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
    drink_id INT NOT NULL,
    customer_id INT NOT NULL,
    price INT NOT NULL,
    points INT NOT NULL,
    FOREIGN KEY (drink_id) REFERENCES drinks(drink_id),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);
