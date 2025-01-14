# SQL Case-Based Assignment: Doctor-Patient Appointment System

This scenario involves managing data related to doctors, patients, appointments, specialties, and hospital departments.

## Database Schema

### **Doctors Table**

| Column Name   | Data Type   | Description                         |
|---------------|-------------|-------------------------------------|
| doctor_id     | INT         | Primary key                         |
| first_name    | VARCHAR(100)| Doctor's first name                |
| last_name     | VARCHAR(100)| Doctor's last name                 |
| email         | VARCHAR(100)| Doctor's email address             |
| phone         | VARCHAR(20) | Doctor's phone number              |
| department_id | INT         | Foreign key (references Departments)|
| specialty_id  | INT         | Foreign key (references Specialties)|
| joining_date  | DATE        | Date the doctor joined the hospital|

### **Patients Table**

| Column Name    | Data Type   | Description                        |
|----------------|-------------|------------------------------------|
| patient_id     | INT         | Primary key                        |
| first_name     | VARCHAR(100)| Patient's first name               |
| last_name      | VARCHAR(100)| Patient's last name                |
| email          | VARCHAR(100)| Patient's email address            |
| phone          | VARCHAR(20) | Patient's phone number             |
| date_of_birth  | DATE        | Patient's date of birth            |
| gender         | VARCHAR(10) | Patient's gender                   |
| address        | TEXT        | Patient's address                  |

### **Departments Table**

| Column Name   | Data Type   | Description                  |
|---------------|-------------|------------------------------|
| department_id | INT         | Primary key                  |
| department_name| VARCHAR(100)| Department name              |

### **Specialties Table**

| Column Name   | Data Type   | Description                  |
|---------------|-------------|------------------------------|
| specialty_id  | INT         | Primary key                  |
| specialty_name| VARCHAR(100)| Specialty name (e.g., Cardiology, Dermatology) |

### **Appointments Table**

| Column Name      | Data Type    | Description                                   |
|------------------|--------------|-----------------------------------------------|
| appointment_id   | INT          | Primary key                                   |
| doctor_id        | INT          | Foreign key (references Doctors)              |
| patient_id       | INT          | Foreign key (references Patients)             |
| appointment_date | DATETIME     | Date and time of appointment                  |
| reason           | TEXT         | Reason for the appointment                    |
| status           | VARCHAR(20)  | Status (e.g., 'Scheduled', 'Completed', 'Cancelled') |

### **Payments Table**

| Column Name     | Data Type   | Description                                      |
|-----------------|-------------|--------------------------------------------------|
| payment_id      | INT         | Primary key                                      |
| appointment_id  | INT         | Foreign key (references Appointments)            |
| payment_date    | DATE        | Date the payment was made                        |
| payment_amount  | DECIMAL(10,2)| Amount paid                                      |
| payment_method  | VARCHAR(20) | Payment method (e.g., 'Cash', 'Credit Card', 'Insurance') |

## SQL Queries

1. **Retrieve a list of all doctors with their department and specialty details.**
    ```sql
    SELECT d.first_name, d.last_name, dept.department_name, spec.specialty_name
    FROM Doctors d
    JOIN Departments dept ON d.department_id = dept.department_id
    JOIN Specialties spec ON d.specialty_id = spec.specialty_id;
    ```

2. **Find the total number of appointments for each doctor.**
    ```sql
    SELECT doctor_id, COUNT(appointment_id) AS total_appointments
    FROM Appointments
    GROUP BY doctor_id;
    ```

3. **Get the list of patients who have appointments scheduled for today.**
    ```sql
    SELECT p.first_name, p.last_name, a.appointment_date
    FROM Patients p
    JOIN Appointments a ON p.patient_id = a.patient_id
    WHERE a.appointment_date = CURDATE() AND a.status = 'Scheduled';
    ```

4. **Calculate the total payment collected for completed appointments.**
    ```sql
    SELECT SUM(payment_amount) AS total_revenue
    FROM Payments
    JOIN Appointments a ON Payments.appointment_id = a.appointment_id
    WHERE a.status = 'Completed';
    ```

5. **Retrieve the details of patients who have not made any payments for their appointments.**
    ```sql
    SELECT p.first_name, p.last_name, a.appointment_date
    FROM Patients p
    JOIN Appointments a ON p.patient_id = a.patient_id
    LEFT JOIN Payments pay ON a.appointment_id = pay.appointment_id
    WHERE pay.payment_id IS NULL;
    ```

6. **Get the list of doctors who have not yet seen any patients.**
    ```sql
    SELECT d.first_name, d.last_name
    FROM Doctors d
    LEFT JOIN Appointments a ON d.doctor_id = a.doctor_id
    WHERE a.appointment_id IS NULL;
    ```

7. **List the patients who have a specific specialty appointment (e.g., 'Cardiology').**
    ```sql
    SELECT p.first_name, p.last_name, a.appointment_date
    FROM Patients p
    JOIN Appointments a ON p.patient_id = a.patient_id
    JOIN Doctors d ON a.doctor_id = d.doctor_id
    JOIN Specialties spec ON d.specialty_id = spec.specialty_id
    WHERE spec.specialty_name = 'Cardiology';
    ```

8. **Find the doctors with the highest number of completed appointments.**
    ```sql
    SELECT d.first_name, d.last_name, COUNT(a.appointment_id) AS completed_appointments
    FROM Doctors d
    JOIN Appointments a ON d.doctor_id = a.doctor_id
    WHERE a.status = 'Completed'
    GROUP BY d.doctor_id
    ORDER BY completed_appointments DESC
    LIMIT 1;
    ```

9. **Retrieve the total amount paid by each patient for completed appointments.**
    ```sql
    SELECT p.first_name, p.last_name, SUM(pay.payment_amount) AS total_paid
    FROM Patients p
    JOIN Appointments a ON p.patient_id = a.patient_id
    JOIN Payments pay ON a.appointment_id = pay.appointment_id
    WHERE a.status = 'Completed'
    GROUP BY p.patient_id;
    ```

10. **List the departments along with the number of doctors in each department.**
    ```sql
    SELECT dept.department_name, COUNT(d.doctor_id) AS doctor_count
    FROM Departments dept
    LEFT JOIN Doctors d ON dept.department_id = d.department_id
    GROUP BY dept.department_name;
    ```

---


