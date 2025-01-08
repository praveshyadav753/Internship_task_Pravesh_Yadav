# SQL Queries for University Data Analysis

## Database Schema

### Students Table
| Column Name     | Data Type    | Description                               |
|-----------------|--------------|-------------------------------------------|
| student_id      | INT          | Primary key                               |
| first_name      | VARCHAR(100) | Student's first name                      |
| last_name       | VARCHAR(100) | Student's last name                       |
| email           | VARCHAR(100) | Student's email address                   |
| phone           | VARCHAR(20)  | Student's phone number                    |
| date_of_birth   | DATE         | Student's date of birth                   |
| enrollment_date | DATE         | Date the student enrolled                 |
| department_id   | INT          | Foreign key (references Departments)      |

### Courses Table
| Column Name     | Data Type    | Description                               |
|-----------------|--------------|-------------------------------------------|
| course_id       | INT          | Primary key                               |
| course_name     | VARCHAR(100) | Course name                               |
| department_id   | INT          | Foreign key (references Departments)      |
| professor_id    | INT          | Foreign key (references Professors)       |
| credits         | INT          | Number of credits for the course          |

### Departments Table
| Column Name     | Data Type    | Description                               |
|-----------------|--------------|-------------------------------------------|
| department_id   | INT          | Primary key                               |
| department_name | VARCHAR(100) | Department name                           |

### Professors Table
| Column Name     | Data Type    | Description                               |
|-----------------|--------------|-------------------------------------------|
| professor_id    | INT          | Primary key                               |
| first_name      | VARCHAR(100) | Professor's first name                    |
| last_name       | VARCHAR(100) | Professor's last name                     |
| email           | VARCHAR(100) | Professor's email address                 |
| phone           | VARCHAR(20)  | Professor's phone number                  |

### Enrollments Table
| Column Name     | Data Type    | Description                               |
|-----------------|--------------|-------------------------------------------|
| enrollment_id   | INT          | Primary key                               |
| student_id      | INT          | Foreign key (references Students)         |
| course_id       | INT          | Foreign key (references Courses)          |
| enrollment_date | DATE         | Date the student enrolled in the course   |
| grade           | VARCHAR(5)   | Grade received in the course              |

---

## SQL Queries

### 1. Find the Total Number of Students in Each Department
```sql
select  department_name,count(student_id) as total_student
from departments 
left join students
on students.department_id= departments.department_id
GROUP BY 
departments.department_name;
```

### 2. List All Courses Taught by a Specific Professor
```sql
select courses.course_name
from professors
join courses
on  courses.professor_id=professors.professor_id
where professors.professor_id=1;
```

### 3. Find the Average Grade of Students in Each Course
```sql
select  course_name,avg(enrollments.grade) as average_grade
from courses
join enrollments
on enrollments.course_id =courses.course_id
group by course_name;
```

### 4. List All Students Who Have Not Enrolled in Any Courses
```sql
select students.first_name ,students.last_name
from students 
left join enrollments
on students.student_id=enrollments.student_id
where enrollments.student_id is null;
```

### 5. Find the Number of Courses Offered by Each Department
```sql
select departments.department_name,count(courses.course_id)
from courses
join departments
on courses.department_id=departments.department_id
group by department_name
```

### 6. List All Students Who Have Taken a Specific Course (e.g., 'Database Systems')
```sql
select students.first_name,students.last_name
from students
JOIN Enrollments  ON students.student_id = enrollments.student_id
join courses	
on enrollments.course_id=courses.course_id
where courses.course_name ='operating systems';
```

### 7. Find the Most Popular Course Based on Enrollment Numbers
```sql
SELECT courses.course_name, COUNT(enrollments.enrollment_id) AS total_enrollments
FROM Enrollments 
JOIN Courses ON enrollments.course_id = courses.course_id
GROUP BY courses.course_name
ORDER BY total_enrollments DESC
LIMIT 1;
```

### 8. Find the Average Number of Credits Per Student in a Department
```sql
SELECT d.department_name, AVG(c.credits) AS average_credits
FROM Enrollments e
JOIN Students s ON e.student_id = s.student_id
JOIN Courses c ON e.course_id = c.course_id
JOIN Departments d ON s.department_id = d.department_id
GROUP BY d.department_name;
```

### 9. List All Professors Who Teach in More Than One Department.
```sql
SELECT p.first_name, p.last_name
FROM Professors p
JOIN Courses c ON p.professor_id = c.professor_id
JOIN Departments d ON c.department_id = d.department_id
GROUP BY p.professor_id
HAVING COUNT(DISTINCT d.department_id) > 1;
``` 

### 10. Get the Highest and Lowest Grade in a Specific Course (e.g., 'Operating Systems')
```sql
SELECT MAX(e.grade) AS highest_grade, MIN(e.grade) AS lowest_grade
FROM Enrollments e
JOIN Courses c ON e.course_id = c.course_id
WHERE c.course_name = 'Operating Systems';
```
