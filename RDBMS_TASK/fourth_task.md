# HR Management Database Schema

## Tables and Schema

### Employees Table
| Column Name   | Data Type       | Description                                          |
|---------------|-----------------|------------------------------------------------------|
| EmployeeID    | INT             | Primary key                                          |
| FirstName     | VARCHAR(100)    | Employee's first name                                |
| LastName      | VARCHAR(100)    | Employee's last name                                 |
| Email         | VARCHAR(100)    | Employee's email address                             |
| Phone         | VARCHAR(20)     | Employee's phone number                              |
| HireDate      | DATE            | Date the employee was hired                         |
| DepartmentID  | INT             | Foreign key referencing Departments(DepartmentID)   |
| ManagerID     | INT             | Foreign key referencing Employees(EmployeeID)       |
| Salary        | DECIMAL(10, 2)  | Employee's salary                                   |

---

### Departments Table
| Column Name     | Data Type       | Description                                         |
|-----------------|-----------------|-----------------------------------------------------|
| DepartmentID    | INT             | Primary key                                         |
| DepartmentName  | VARCHAR(100)    | Name of the department                              |
| ManagerID       | INT             | Foreign key referencing Employees(EmployeeID)      |

---

### PerformanceReviews Table
| Column Name       | Data Type       | Description                                         |
|-------------------|-----------------|-----------------------------------------------------|
| ReviewID          | INT             | Primary key                                         |
| EmployeeID        | INT             | Foreign key referencing Employees(EmployeeID)      |
| ReviewDate        | DATE            | Date of the performance review                     |
| PerformanceScore  | VARCHAR(20)     | Performance rating (e.g., 'Excellent', 'Good')     |
| Comments          | TEXT            | Additional comments about the performance          |

---

### Payroll Table
| Column Name     | Data Type       | Description                                         |
|-----------------|-----------------|-----------------------------------------------------|
| PayrollID       | INT             | Primary key                                         |
| EmployeeID      | INT             | Foreign key referencing Employees(EmployeeID)      |
| PaymentDate     | DATE            | Date of the payment                                 |
| Amount          | DECIMAL(10, 2)  | Amount paid to the employee                        |
| PaymentMethod   | VARCHAR(50)     | Payment method (e.g., 'Bank Transfer', 'Check')    |

## database Queries

 ### 1. Retrieve the names and contact details of employees hired after January 1, 2023.
 ```sql 
 SELECT FirstName, LastName, Email, Phone
FROM Employees
WHERE HireDate > '2023-01-01';
```

 ### 2. Find the total payroll amount paid to each department.
 ```sql
 SELECT d.DepartmentName, SUM(p.Amount) AS TotalPayroll
FROM Payroll p
JOIN Employees e ON p.EmployeeID = e.EmployeeID
JOIN Departments d ON e.DepartmentID = d.DepartmentID
GROUP BY d.DepartmentName;
```

 ### 3. List all employees who have not been assigned a manager.
 ```sql
 SELECT EmployeeID, FirstName, LastName
FROM Employees
WHERE ManagerID IS NULL;
```
 ### 4. Retrieve the highest salary in each department along with the employee’s name.
 ```sql
select departments.departmentname,employees.name,max(employees.salary)
from departments
left join employees on employees.departmentid = departments.departmentid
group by department.departmentname;
```

 ### 5. Find the most recent performance review for each employee.
 ```sql
select employee.firstname, perfomancereviews.perfomancescore, max(perfomancereviews.reviewdate) as reviewdate
from  employees join perfomancereviews
 on perfomancereviews.employeeid = perfomancereviews.employeeid
 group by employee.firstname;
 ```
 ### 6. Count the number of employees in each department.
 ```sql
 select departments.departmentname, count(employees.employeeid) as number_of_employees
 from departments left join employees  on
 departments.departmentid=employees.departmentid
 group by department.departmentname;
 ```

 ### 7. List all employees who have received a performance score of "Excellent." Identify the most frequently used payment method in payroll.
 ```sql
select emplyees.employeeid, employees.fistname, perfomancereviews.perfomancescore
from employees join 
perfomancereviews on employees.employeeid = perfomancereviews.employeeid
where perfomancereviews.perfomancescore = 'excellent';
 ```
 ```sql
 SELECT PaymentMethod, COUNT(*) AS UsageCount
FROM Payroll
GROUP BY PaymentMethod
ORDER BY UsageCount DESC
LIMIT 1;
```

 ### 8. Retrieve the top 5 highest-paid employees along with their departments.
 ```sql
 select employees.firstname, departments.departmentname,employees.salary
 from employees join departments 
 on employees.departmentid=departments.departmentid
 order by employees.salary
 limit 5;
```
 ### 9. Showdetails of all employees who report directly to a specific manager (e.g., ManagerID = 101)
```sql
SELECT EmployeeID, FirstName, LastName, Email, Phone
FROM Employees
WHERE ManagerID = 101;
```