# SQL Case-Based Assignment: Food Delivery Application

## Database Schema Design

### 1. **Restaurants** Table
This table contains information about the restaurants available for food delivery.

| Column Name       | Data Type       | Description                                 |
|-------------------|-----------------|---------------------------------------------|
| `RestaurantID`    | INT (Primary Key) | Unique identifier for each restaurant.      |
| `Name`            | VARCHAR(255)     | Name of the restaurant.                     |
| `City`            | VARCHAR(255)     | City where the restaurant is located.       |
| `CuisineType`     | VARCHAR(50)      | Type of cuisine the restaurant offers (e.g., Indian, Chinese, Italian). |
| `Rating`          | DECIMAL(2, 1)    | Rating out of 5 for the restaurant.         |
| `AverageCostForTwo` | DECIMAL(10, 2)  | Average cost for two people at the restaurant. |

### 2. **Customers** Table
This table stores customer information for order management.

| Column Name       | Data Type       | Description                                 |
|-------------------|-----------------|---------------------------------------------|
| `CustomerID`      | INT (Primary Key) | Unique identifier for each customer.        |
| `FirstName`       | VARCHAR(255)     | First name of the customer.                 |
| `LastName`        | VARCHAR(255)     | Last name of the customer.                  |
| `Phone`           | VARCHAR(20)      | Customer's phone number (must be unique).   |
| `City`            | VARCHAR(255)     | City where the customer is located.         |
| `JoinDate`        | DATE            | The date the customer joined the platform.  |

### 3. **Orders** Table
This table tracks customer orders placed through the application.

| Column Name       | Data Type       | Description                                 |
|-------------------|-----------------|---------------------------------------------|
| `OrderID`         | INT (Primary Key) | Unique identifier for each order.          |
| `CustomerID`      | INT (Foreign Key) | Customer who placed the order. References `Customers(CustomerID)`. |
| `RestaurantID`    | INT (Foreign Key) | Restaurant from which the order was placed. References `Restaurants(RestaurantID)`. |
| `OrderDate`       | DATE            | The date the order was placed.              |
| `OrderAmount`     | DECIMAL(10, 2)   | Total amount of the order.                  |
| `OrderStatus`     | VARCHAR(50)      | Status of the order (e.g., 'Delivered', 'Cancelled', 'Pending'). |

### 4. **Reviews** Table
This table stores reviews written by customers for restaurants.

| Column Name       | Data Type       | Description                                 |
|-------------------|-----------------|---------------------------------------------|
| `ReviewID`        | INT (Primary Key) | Unique identifier for each review.         |
| `CustomerID`      | INT (Foreign Key) | Customer who wrote the review. References `Customers(CustomerID)`. |
| `RestaurantID`    | INT (Foreign Key) | Restaurant being reviewed. References `Restaurants(RestaurantID)`. |
| `Rating`          | DECIMAL(2, 1)    | Rating given to the restaurant (out of 5).  |
| `Comment`         | TEXT            | Text feedback for the restaurant.           |
| `ReviewDate`      | DATE            | Date when the review was submitted.         |

### 5. **Payments** Table
This table stores payment information for each order.

| Column Name       | Data Type       | Description                                 |
|-------------------|-----------------|---------------------------------------------|
| `PaymentID`       | INT (Primary Key) | Unique identifier for each payment.        |
| `OrderID`         | INT (Foreign Key) | Order associated with the payment. References `Orders(OrderID)`. |
| `PaymentMethod`   | VARCHAR(50)      | Payment method used (e.g., 'Card', 'Cash', 'Wallet'). |
| `Amount`          | DECIMAL(10, 2)   | Total payment amount for the order.         |
| `PaymentDate`     | DATE            | Date when the payment was made.             |

---

## SQL Queries

**1. Retrieve the names and locations of restaurants with a rating of 4.5 or higher.**
```sql
SELECT Name, City
FROM Restaurants
WHERE Rating >= 4.5;
```