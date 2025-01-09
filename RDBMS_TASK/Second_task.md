-- Schema creation for the ride-hailing application

-- Drivers table
CREATE TABLE Drivers (
    DriverID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Phone VARCHAR(15),
    City VARCHAR(50),
    VehicleType VARCHAR(20),
    Rating DECIMAL(2, 1) -- Rating out of 5
);

-- Riders table
CREATE TABLE Riders (
    RiderID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Phone VARCHAR(15),
    City VARCHAR(50),
    JoinDate DATE
);

-- Rides table
CREATE TABLE Rides (
    RideID INT PRIMARY KEY,
    RiderID INT,
    DriverID INT,
    RideDate DATETIME,
    PickupLocation VARCHAR(100),
    DropLocation VARCHAR(100),
    Distance DECIMAL(5, 2), -- Distance in km
    Fare DECIMAL(10, 2),
    RideStatus VARCHAR(20), -- E.g., 'Completed', 'Cancelled', 'Ongoing'
    FOREIGN KEY (RiderID) REFERENCES Riders(RiderID),
    FOREIGN KEY (DriverID) REFERENCES Drivers(DriverID)
);

-- Payments table
CREATE TABLE Payments (
    PaymentID INT PRIMARY KEY,
    RideID INT,
    PaymentMethod VARCHAR(20), -- E.g., 'Card', 'Cash', 'Wallet'
    Amount DECIMAL(10, 2),
    PaymentDate DATETIME,
    FOREIGN KEY (RideID) REFERENCES Rides(RideID)
);

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
