CREATE TABLE Department (
department_id NVARCHAR(50) PRIMARY KEY,
department_name NVARCHAR(255) NOT NULL
);

CREATE TABLE Major (
major_id NVARCHAR(50) PRIMARY KEY,
major_name NVARCHAR(255) NOT NULL,
department_id NVARCHAR(50) FOREIGN KEY REFERENCES Department(department_id)
);

CREATE TABLE Class (
class_id NVARCHAR(50) PRIMARY KEY,
class_name NVARCHAR(255) NOT NULL,
major_id NVARCHAR(50) FOREIGN KEY REFERENCES Major(major_id),
academic_year NVARCHAR(10) NOT NULL
);

CREATE TABLE Employee (
employee_id NVARCHAR(50) PRIMARY KEY,
first_name NVARCHAR(255) NOT NULL,
last_name NVARCHAR(255) NOT NULL,
date_of_birth DATETIME NOT NULL,
hire_date DATETIME NOT NULL,
job_title NVARCHAR(255) NOT NULL,
department_id NVARCHAR(50) FOREIGN KEY REFERENCES Department(department_id),
manager_id NVARCHAR(50) FOREIGN KEY REFERENCES Employee(employee_id),
salary DECIMAL(10, 2),
email NVARCHAR(255),
address NVARCHAR(255),
phone_number NVARCHAR(20),
created_at DATETIME DEFAULT GETDATE(),
updated_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE Course (
course_id NVARCHAR(50) PRIMARY KEY,
course_name NVARCHAR(255) NOT NULL,
credits_num INT NOT NULL,
lesson_num INT NOT NULL,
course_type NVARCHAR(50) NOT NULL
);

CREATE TABLE Prerequisite_Course (
id INT IDENTITY PRIMARY KEY,
course_id NVARCHAR(50) FOREIGN KEY REFERENCES Course(course_id),
prerequisite_course_id NVARCHAR(50) FOREIGN KEY REFERENCES Course(course_id)
);

CREATE TABLE Semesters (
semester_id INT IDENTITY PRIMARY KEY,
start_date DATETIME NOT NULL,
end_date DATETIME NOT NULL,
registration_deadline DATETIME NOT NULL
);

CREATE TABLE Students (
student_id NVARCHAR(50) PRIMARY KEY,
first_name NVARCHAR(255) NOT NULL,
last_name NVARCHAR(255) NOT NULL,
date_of_birth DATETIME NOT NULL,
gender NVARCHAR(10),
hometown NVARCHAR(255),
priority NVARCHAR(50),
contact_address NVARCHAR(255),
class_id NVARCHAR(50) FOREIGN KEY REFERENCES Class(class_id)
);

CREATE TABLE CourseResults (
result_id NVARCHAR(50) PRIMARY KEY,
student_id NVARCHAR(50) FOREIGN KEY REFERENCES Students(student_id),
course_id NVARCHAR(50) FOREIGN KEY REFERENCES Course(course_id),
semester_id INT FOREIGN KEY REFERENCES Semesters(semester_id),
grade NVARCHAR(10)
);

CREATE TABLE Course_Registration (
registration_id NVARCHAR(50) PRIMARY KEY,
student_id NVARCHAR(50) FOREIGN KEY REFERENCES Students(student_id),
course_id NVARCHAR(50) FOREIGN KEY REFERENCES Course(course_id),
semester_id INT FOREIGN KEY REFERENCES Semesters(semester_id),
registration_date DATETIME DEFAULT GETDATE(),
registration_status NVARCHAR(50)
);

CREATE TABLE Tuition_Fees (
fee_id NVARCHAR(50) PRIMARY KEY,
student_id NVARCHAR(50) FOREIGN KEY REFERENCES Students(student_id),
semester_id INT FOREIGN KEY REFERENCES Semesters(semester_id),
total_credits INT NOT NULL,
tuition_fee DECIMAL(18, 2) NOT NULL,
discount DECIMAL(18, 2),
amount_paid DECIMAL(18, 2),
payment_status NVARCHAR(50)
);

CREATE TABLE Credit_Rules (
rule_id NVARCHAR(50) PRIMARY KEY,
class_id NVARCHAR(50) FOREIGN KEY REFERENCES Class(class_id),
semester_id INT FOREIGN KEY REFERENCES Semesters(semester_id),
min_credits INT NOT NULL,
max_credits INT NOT NULL
);

CREATE TABLE Fee_Rates (
id INT IDENTITY PRIMARY KEY,
course_type NVARCHAR(50) NOT NULL,
fee_per_credit DECIMAL(18, 2) NOT NULL
);

CREATE TABLE Fee_Discounts (
discount_id INT IDENTITY PRIMARY KEY,
discount_type NVARCHAR(100) NOT NULL,
discount_percent DECIMAL(5, 2) NOT NULL
);

CREATE TABLE Fee_Payments (
payments_id INT IDENTITY PRIMARY KEY,
fee_id NVARCHAR(50) FOREIGN KEY REFERENCES Tuition_Fees(fee_id),
payment_date DATETIME NOT NULL,
amount_paid DECIMAL(10, 2) NOT NULL
);