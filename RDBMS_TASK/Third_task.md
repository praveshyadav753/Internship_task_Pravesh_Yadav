# Retail Store Database Analysis

## Database Schema

### Customers Table
| Column Name | Data Type     | Description                |
|-------------|---------------|----------------------------|
| customer_id | INT           | Primary key                |
| first_name  | VARCHAR(100)  | Customer's first name      |
| last_name   | VARCHAR(100)  | Customer's last name       |
| email       | VARCHAR(100)  | Customer's email address   |
| phone       | VARCHAR(20)   | Customer's phone number    |
| address     | TEXT          | Customer's address         |
| join_date   | DATE          | Date customer joined       |

### Products Table
| Column Name     | Data Type     | Description                 |
|-----------------|---------------|-----------------------------|
| product_id      | INT           | Primary key                 |
| product_name    | VARCHAR(100)  | Product name                |
| category        | VARCHAR(50)   | Product category            |
| price           | DECIMAL(10,2) | Product price               |
| stock_quantity  | INT           | Quantity available in stock |

### Orders Table
| Column Name     | Data Type     | Description                     |
|-----------------|---------------|---------------------------------|
| order_id        | INT           | Primary key                     |
| customer_id     | INT           | Foreign key (references Customers) |
| order_date      | DATE          | Date order was placed           |
| total_amount    | DECIMAL(10,2) | Total order amount              |
| order_status    | VARCHAR(20)   | Order status (e.g., 'Pending', 'Shipped') |

### OrderDetails Table
| Column Name      | Data Type     | Description                        |
|------------------|---------------|------------------------------------|
| order_detail_id  | INT           | Primary key                        |
| order_id         | INT           | Foreign key (references Orders)    |
| product_id       | INT           | Foreign key (references Products)  |
| quantity         | INT           | Quantity of product in the order   |
| unit_price       | DECIMAL(10,2) | Price per product                  |

### Payments Table
| Column Name     | Data Type     | Description                          |
|-----------------|---------------|--------------------------------------|
| payment_id      | INT           | Primary key                          |
| order_id        | INT           | Foreign key (references Orders)      |
| payment_date    | DATE          | Date the payment was made            |
| payment_amount  | DECIMAL(10,2) | Amount paid                          |
| payment_method  | VARCHAR(20)   | Payment method (e.g., 'Credit Card', 'PayPal') |

---

## SQL Queries for Retail Store Analysis

### 1. Find the Total Number of Orders for Each Customer
```sql
SELECT c.customer_id, c.first_name, c.last_name, COUNT(o.order_id) AS total_orders
FROM Customers c
LEFT JOIN Orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.first_name, c.last_name;
```
### 2. Find the Total Sales Amount for Each Product (Revenue per Product)

```sql
select products.product_id,products.product_name , sum(quantity*unit_price) as Revenue
from products
left join 
orderdetails
on orderdetails.product_id= products.product_id
group by products.product_id;
```

###  3. Find the Most Expensive Product Sold
```sql
select products.product_id, products.product_name, max(orderdetails.unit_price) as highest_price
from products join orderdetails
on products.product_id= orderdetails.product_id 
group by products.product_id
order by highest_price desc
limit 1;
```

###  4. Get the List of Customers Who Have Placed Orders in the Last 30 Days

```sql
select customers.customer_id,customers.first_name ,orders.order_date
from customers
join orders
on customers.customer_id=orders.customer_id
WHERE orders.order_date >= CURDATE() - INTERVAL 30 DAY
order by orders.order_date desc;
```
###  5. Calculate the Total Amount Paid by Each Customer
```sql
SELECT c.customer_id, c.first_name, c.last_name, SUM(p.payment_amount) AS total_paid
FROM Customers c
JOIN Orders o ON c.customer_id = o.customer_id
JOIN Payments p ON o.order_id = p.order_id
GROUP BY c.customer_id, c.first_name, c.last_name;
```
###  6. Get the Number of Products Sold by Category
```sql
select products.category, count(orderdetails.quantity) as product_sold
from products join orderdetails
on products.product_id = orderdetails.product_id
group by products.category;
```
###  7. List All Orders That Are Pending (i.e., Orders that haven't been shipped yet)
```sql
select orders.order_id,orders.order_status
from  orders 
where order_status = 'pending';
```
###  8. Find the Average Order Value (Total Order Amount / Number of Orders)
```sql
SELECT AVG(total_amount) AS average_order_value
FROM Orders;
```
### 9. List the Top 5 Customers Who Have Spent the Most Money
```sql
SELECT c.customer_id, c.first_name, c.last_name, SUM(o.total_amount) AS total_spent
FROM Customers c
JOIN Orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.first_name, c.last_name
ORDER BY total_spent DESC
LIMIT 5;
```
###  10. Find the Products That Have Never Been Sold
```sql
SELECT p.product_id, p.product_name
FROM Products p
LEFT JOIN OrderDetails od ON p.product_id = od.product_id
WHERE od.product_id IS NULL;
```