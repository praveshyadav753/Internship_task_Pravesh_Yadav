# Schema Structure for the Ride-Hailing Application

## 1. Drivers Table
- **DriverID** (INT, Primary Key): Unique identifier for each driver.
- **FirstName** (VARCHAR(50)): Driver's first name.
- **LastName** (VARCHAR(50)): Driver's last name.
- **Phone** (VARCHAR(15)): Driver's phone number.
- **City** (VARCHAR(50)): City where the driver is located.
- **VehicleType** (VARCHAR(20)): Type of vehicle used by the driver (e.g., Sedan, SUV).
- **Rating** (DECIMAL(2, 1)): Rating of the driver, ranging from 0.0 to 5.0.

## 2. Riders Table
- **RiderID** (INT, Primary Key): Unique identifier for each rider.
- **FirstName** (VARCHAR(50)): Rider's first name.
- **LastName** (VARCHAR(50)): Rider's last name.
- **Phone** (VARCHAR(15)): Rider's phone number.
- **City** (VARCHAR(50)): City where the rider is located.
- **JoinDate** (DATE): Date when the rider joined the platform.

## 3. Rides Table
- **RideID** (INT, Primary Key): Unique identifier for each ride.
- **RiderID** (INT, Foreign Key): Foreign key referencing the RiderID in the Riders table.
- **DriverID** (INT, Foreign Key): Foreign key referencing the DriverID in the Drivers table.
- **RideDate** (DATETIME): Date and time when the ride took place.
- **PickupLocation** (VARCHAR(100)): The pickup location for the ride.
- **DropLocation** (VARCHAR(100)): The drop-off location for the ride.
- **Distance** (DECIMAL(5, 2)): Distance traveled during the ride, measured in kilometers.
- **Fare** (DECIMAL(10, 2)): Fare charged for the ride.
- **RideStatus** (VARCHAR(20)): The status of the ride (e.g., 'Completed', 'Cancelled', 'Ongoing').

## 4. Payments Table
- **PaymentID** (INT, Primary Key): Unique identifier for each payment.
- **RideID** (INT, Foreign Key): Foreign key referencing the RideID in the Rides table.
- **PaymentMethod** (VARCHAR(20)): The method used for payment (e.g., 'Card', 'Cash', 'Wallet').
- **Amount** (DECIMAL(10, 2)): The amount paid for the ride.
- **PaymentDate** (DATETIME): Date and time when the payment was made.

---

-- Assignment Queries

-- 1. Retrieve the names and contact details of all drivers with a rating of 4.5 or higher.
SELECT FirstName, LastName, Phone, City 
FROM Drivers 
WHERE Rating >= 4.5;

-- 2. Find the total number of rides completed by each driver.
SELECT DriverID, COUNT(*) AS TotalRides 
FROM Rides 
WHERE RideStatus = 'Completed' 
GROUP BY DriverID;

-- 3. List all riders who have never booked a ride.
SELECT FirstName, LastName, Phone, City 
FROM Riders 
WHERE RiderID NOT IN (SELECT DISTINCT RiderID FROM Rides);

-- 4. Calculate the total earnings of each driver from completed rides.
SELECT d.DriverID, d.FirstName, d.LastName, SUM(r.Fare) AS TotalEarnings 
FROM Drivers d
JOIN Rides r ON d.DriverID = r.DriverID 
WHERE r.RideStatus = 'Completed' 
GROUP BY d.DriverID, d.FirstName, d.LastName;

-- 5. Retrieve the most recent ride for each rider.
SELECT r.RiderID, MAX(rd.RideDate) AS MostRecentRide 
FROM Riders r
JOIN Rides rd ON r.RiderID = rd.RiderID 
GROUP BY r.RiderID;

-- 6. Count the number of rides taken in each city.
SELECT d.City, COUNT(*) AS TotalRides 
FROM Rides r
JOIN Drivers d ON r.DriverID = d.DriverID 
GROUP BY d.City;

-- 7. List all rides where the distance was greater than 20 km.
SELECT RideID, RiderID, DriverID, Distance, Fare 
FROM Rides 
WHERE Distance > 20;

-- 8. Identify the most preferred payment method.
SELECT PaymentMethod, COUNT(*) AS UsageCount 
FROM Payments 
GROUP BY PaymentMethod 
ORDER BY UsageCount DESC 
LIMIT 1;

-- 9. Find the top 3 highest-earning drivers.
SELECT d.DriverID, d.FirstName, d.LastName, SUM(r.Fare) AS TotalEarnings 
FROM Drivers d
JOIN Rides r ON d.DriverID = r.DriverID 
WHERE r.RideStatus = 'Completed' 
GROUP BY d.DriverID, d.FirstName, d.LastName 
ORDER BY TotalEarnings DESC 
LIMIT 3;

-- 10. Retrieve details of all cancelled rides along with the rider's and driver's names.
SELECT r.RideID, ri.FirstName AS RiderFirstName, ri.LastName AS RiderLastName, 
       d.FirstName AS DriverFirstName, d.LastName AS DriverLastName, r.RideDate 
FROM Rides r
JOIN Riders ri ON r.RiderID = ri.RiderID 
JOIN Drivers d ON r.DriverID = d.DriverID 
WHERE r.RideStatus = 'Cancelled';
