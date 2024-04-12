CREATE TABLE IF NOT EXISTS drinks (
    drink_id INTEGER PRIMARY KEY AUTOINCREMENT,
    drink_name  varchar(20) NOT NULL,
    price   FLOAT NOT NULL,
    img varchar(20) NOT NULL,
    description varchar(50),
    category        varchar(20)
);