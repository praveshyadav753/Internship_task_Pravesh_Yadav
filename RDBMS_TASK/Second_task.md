# Schema Structure for the Ride-Hailing Application

## 1. Drivers Table

| Column Name   | Data Type     | Description                                      |
|---------------|---------------|--------------------------------------------------|
| DriverID      | INT           | Unique identifier for each driver (Primary Key)  |
| FirstName     | VARCHAR(50)   | Driver's first name                             |
| LastName      | VARCHAR(50)   | Driver's last name                              |
| Phone         | VARCHAR(15)   | Driver's phone number                           |
| City          | VARCHAR(50)   | City where the driver is located                |
| VehicleType   | VARCHAR(20)   | Type of vehicle used by the driver (e.g., Sedan)|
| Rating        | DECIMAL(2,1)  | Rating of the driver, ranging from 0.0 to 5.0   |

## 2. Riders Table

| Column Name   | Data Type     | Description                                      |
|---------------|---------------|--------------------------------------------------|
| RiderID       | INT           | Unique identifier for each rider (Primary Key)   |
| FirstName     | VARCHAR(50)   | Rider's first name                               |
| LastName      | VARCHAR(50)   | Rider's last name                                |
| Phone         | VARCHAR(15)   | Rider's phone number                             |
| City          | VARCHAR(50)   | City where the rider is located                  |
| JoinDate      | DATE          | Date when the rider joined the platform          |

## 3. Rides Table

| Column Name     | Data Type     | Description                                      |
|-----------------|---------------|--------------------------------------------------|
| RideID          | INT           | Unique identifier for each ride (Primary Key)    |
| RiderID         | INT           | Foreign Key referencing RiderID in Riders table  |
| DriverID        | INT           | Foreign Key referencing DriverID in Drivers table|
| RideDate        | DATETIME      | Date and time when the ride took place           |
| PickupLocation  | VARCHAR(100)  | Pickup location for the ride                     |
| DropLocation    | VARCHAR(100)  | Drop-off location for the ride                   |
| Distance        | DECIMAL(5,2)  | Distance traveled during the ride in kilometers  |
| Fare            | DECIMAL(10,2) | Fare charged for the ride                        |
| RideStatus      | VARCHAR(20)   | Status of the ride (e.g., 'Completed', 'Cancelled', 'Ongoing')|

## 4. Payments Table

| Column Name     | Data Type     | Description                                      |
|-----------------|---------------|--------------------------------------------------|
| PaymentID       | INT           | Unique identifier for each payment (Primary Key) |
| RideID          | INT           | Foreign Key referencing RideID in Rides table    |
| PaymentMethod   | VARCHAR(20)   | Payment method used (e.g., 'Card', 'Cash', 'Wallet')|
| Amount          | DECIMAL(10,2) | Amount paid for the ride                         |
| PaymentDate     | DATETIME      | Date and time when the payment was made          |

---


## Assignment Queries

### 1. Retrieve the names and contact details of all drivers with a rating of 4.5 or higher.

```sql
SELECT concat(drivers.FirstName,' ',drivers.LastName) as name , Phone, City 
FROM Drivers 
WHERE Rating >= 4.5;

```


### 2. Find the total number of rides completed by each driver.

```sql
select drivers.DriverID,concat(drivers.FirstName,' ',drivers.LastName) as name,count(*) as rides_count
from drivers 
join
rides
on drivers.DriverID=rides.DriverID 
 and RideStatus = 'Completed' 
group by drivers.DriverID,drivers.FirstName,drivers.LastName;
```


### 3. List all riders who have never booked a ride.

```sql
select riders.riderid,firstname ,lastname,phone,city
from riders
left join
rides
on riders.RiderID=rides.RiderId
where rides.RiderID is null;
```


 ###  4. Calculate the total earnings of each driver from completed rides.

```sql
select drivers.FirstName,sum(rides.fare) as total_earning
from drivers
left join
rides
on drivers.driverid=rides.driverid and RideStatus ='completed'
group by drivers.firstname;
```


###  5. Retrieve the most recent ride for each rider.

```sql
select riders.RiderID, riders.FirstName, max(rides.RideDate) as recent_ride
from riders
left join
rides
on riders.RiderID=rides.RiderID
group by riders.riderid;
```


### 6. Count the number of rides taken in each city.

```sql
select riders.city,count(rides.RideID) as number_of_rides
from riders
left join
rides
on riders.riderid=rides.riderid
group by riders.city

```


###  7. List all rides where the distance was greater than 20 km.
```sql
   select * 
      from rides 
      where distance >20;
```

###  8. Identify the most preferred payment method.
```sql
select  PaymentMethod, count(paymentmethod) as count
   from payments
   group by PaymentMethod
   order by  count desc
   limit 1;
   ```

### 9. Find the top 3 highest-earning drivers.  
```sql

select drivers.DriverID,drivers.FirstName, sum(rides.fare) as total_earning
from drivers
join
rides
on drivers.driverid=rides.driverid
group by drivers.DriverID
order by  total_earning
desc limit 3;
```
### 10. Retrieve details of all cancelled rides along with the rider's and driver's names.
```sql
select riders.FirstName as ridername ,drivers.FirstName drivername, rides. *
from rides
join 
riders
on riders.RiderID=rides.RiderID   
join 
drivers
on drivers.DriverID= rides.DriverID
where RideStatus ='cancelled';  
```
