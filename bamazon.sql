DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER (10) NOT NULL,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price INTEGER (10),
    stock_quantity DECIMAL(10,4) NULL
    );
    

    
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "Tube Socks", "Apparel", 42, 1000),
	(201, "Corn printed lampshade", "Homegoods", 97, 54),
    (82, "Tweezers", "First Aid", 4.5, 77),
    (5641, "Captain Marvel Stickers", "Toys", 1.99, 7011),
    (3, "yo-yo", "Toys", 5.49, 10000),
    (34, "Yo-Yo Ma CD", "Music", 9.99, 10),
    (554, "Water cooler", "Office", 700, 340), 
    (19, "Tuxedo T-shirt", "Apparel", 19.99, 82),
    (90, "Box of Random Paper Clips", "Office", 16, 240),
    (48120, "Rose colored glasses", "Apparel", 1.40, 4);