USE QLDKMHHP2;

-- Disable all constraints
EXEC sp_MSforeachtable "ALTER TABLE ? NOCHECK CONSTRAINT all"

-- Delete data from all tables
DELETE FROM Fee_Payments;
DELETE FROM Fee_Discounts;
DELETE FROM Fee_Rates;
DELETE FROM Credit_Rules;
DELETE FROM Tuition_Fees;
DELETE FROM Course_Registration;
DELETE FROM CourseResults;
DELETE FROM Students;
DELETE FROM Prerequisite_Course;
DELETE FROM Course;
DELETE FROM Users;
DELETE FROM MSSQLAccount;
DELETE FROM Employee;
DELETE FROM Class;
DELETE FROM Major;
DELETE FROM Department;
DELETE FROM Semesters;

-- Re-enable all constraints
EXEC sp_MSforeachtable "ALTER TABLE ? WITH CHECK CHECK CONSTRAINT all"

-- Reset identity columns
DBCC CHECKIDENT ('Fee_Payments', RESEED, 0);
DBCC CHECKIDENT ('Fee_Discounts', RESEED, 0);
DBCC CHECKIDENT ('Fee_Rates', RESEED, 0);
DBCC CHECKIDENT ('Semesters', RESEED, 0);

-- Bảng Department
INSERT INTO Department (department_id, department_name) VALUES ('D001', N'Khoa Công Nghệ Thông Tin');
INSERT INTO Department (department_id, department_name) VALUES ('D002', N'Khoa Kinh Tế');
INSERT INTO Department (department_id, department_name) VALUES ('D003', N'Khoa Ngoại Ngữ');
INSERT INTO Department (department_id, department_name) VALUES ('D004', N'Khoa Luật');
INSERT INTO Department (department_id, department_name) VALUES ('D005', N'Khoa Giáo Dục');
INSERT INTO Department (department_id, department_name) VALUES ('D006', N'Khoa Điện Tử Viễn Thông');
INSERT INTO Department (department_id, department_name) VALUES ('D007', N'Khoa Sinh Học');
INSERT INTO Department (department_id, department_name) VALUES ('D008', N'Khoa Vật Lý');
INSERT INTO Department (department_id, department_name) VALUES ('D009', N'Khoa Hóa Học');
INSERT INTO Department (department_id, department_name) VALUES ('D010', N'Khoa Toán Học');

-- Bảng Major
INSERT INTO Major (major_id, major_name, department_id) VALUES ('M001', N'Chuyên ngành Mạng Máy Tính', 'D001');
INSERT INTO Major (major_id, major_name, department_id) VALUES ('M002', N'Chuyên ngành Quản Trị Kinh Doanh', 'D002');
INSERT INTO Major (major_id, major_name, department_id) VALUES ('M003', N'Chuyên ngành Tiếng Anh', 'D003');
INSERT INTO Major (major_id, major_name, department_id) VALUES ('M004', N'Chuyên ngành Luật Kinh Doanh', 'D004');
INSERT INTO Major (major_id, major_name, department_id) VALUES ('M005', N'Chuyên ngành Giáo Dục Mầm Non', 'D005');
INSERT INTO Major (major_id, major_name, department_id) VALUES ('M006', N'Chuyên ngành Kỹ Thuật Điện', 'D006');
INSERT INTO Major (major_id, major_name, department_id) VALUES ('M007', N'Chuyên ngành Sinh Học Ứng Dụng', 'D007');
INSERT INTO Major (major_id, major_name, department_id) VALUES ('M008', N'Chuyên ngành Vật Lý Kỹ Thuật', 'D008');
INSERT INTO Major (major_id, major_name, department_id) VALUES ('M009', N'Chuyên ngành Hóa Học Phân Tích', 'D009');
INSERT INTO Major (major_id, major_name, department_id) VALUES ('M010', N'Chuyên ngành Toán Tin', 'D010');

-- Bảng Class
INSERT INTO Class (class_id, class_name, major_id, academic_year) VALUES ('C001', N'Lớp CNTT 01', 'M001', '2023-2024');
INSERT INTO Class (class_id, class_name, major_id, academic_year) VALUES ('C002', N'Lớp CNTT 02', 'M001', '2023-2024');
INSERT INTO Class (class_id, class_name, major_id, academic_year) VALUES ('C003', N'Lớp QTKD 01', 'M002', '2023-2024');
INSERT INTO Class (class_id, class_name, major_id, academic_year) VALUES ('C004', N'Lớp QTKD 02', 'M002', '2023-2024');
INSERT INTO Class (class_id, class_name, major_id, academic_year) VALUES ('C005', N'Lớp TA 01', 'M003', '2023-2024');
INSERT INTO Class (class_id, class_name, major_id, academic_year) VALUES ('C006', N'Lớp TA 02', 'M003', '2023-2024');
INSERT INTO Class (class_id, class_name, major_id, academic_year) VALUES ('C007', N'Lớp LKDB 01', 'M004', '2023-2024');
INSERT INTO Class (class_id, class_name, major_id, academic_year) VALUES ('C008', N'Lớp GDMN 01', 'M005', '2023-2024');
INSERT INTO Class (class_id, class_name, major_id, academic_year) VALUES ('C009', N'Lớp KTĐ 01', 'M006', '2023-2024');
INSERT INTO Class (class_id, class_name, major_id, academic_year) VALUES ('C010', N'Lớp SHD 01', 'M007', '2023-2024');

-- Bảng Employee
INSERT INTO Employee (employee_id, first_name, last_name, date_of_birth, hire_date, job_title, department_id, salary, email) 
VALUES ('E001', N'Nguyễn', N'A', '1985-05-15', '2020-01-01', N'Giảng viên', 'D001', 3000000, 'nguyena@example.com');
INSERT INTO Employee (employee_id, first_name, last_name, date_of_birth, hire_date, job_title, department_id, salary, email) 
VALUES ('E002', N'Trần', N'B', '1990-10-20', '2021-02-01', N'Giảng viên', 'D002', 3200000, 'tranb@example.com');
INSERT INTO Employee (employee_id, first_name, last_name, date_of_birth, hire_date, job_title, department_id, salary, email) 
VALUES ('E003', N'Lê', N'C', '1987-08-15', '2019-03-15', N'Giảng viên', 'D003', 3100000, 'lec@example.com');
INSERT INTO Employee (employee_id, first_name, last_name, date_of_birth, hire_date, job_title, department_id, salary, email) 
VALUES ('E004', N'Phạm', N'D', '1983-11-25', '2018-04-20', N'Giảng viên', 'D004', 3500000, 'phamd@example.com');
INSERT INTO Employee (employee_id, first_name, last_name, date_of_birth, hire_date, job_title, department_id, salary, email) 
VALUES ('E005', N'Hồ', N'E', '1992-02-10', '2022-05-01', N'Giảng viên', 'D005', 3300000, 'ho@example.com');
INSERT INTO Employee (employee_id, first_name, last_name, date_of_birth, hire_date, job_title, department_id, salary, email) 
VALUES ('E006', N'Ngô', N'F', '1988-07-30', '2021-06-01', N'Giảng viên', 'D006', 3400000, 'ngo@example.com');
INSERT INTO Employee (employee_id, first_name, last_name, date_of_birth, hire_date, job_title, department_id, salary, email) 
VALUES ('E007', N'Đinh', N'G', '1985-12-05', '2017-07-10', N'Giảng viên', 'D007', 3600000, 'dinh@example.com');
INSERT INTO Employee (employee_id, first_name, last_name, date_of_birth, hire_date, job_title, department_id, salary, email) 
VALUES ('E008', N'Vũ', N'H', '1990-03-20', '2022-08-15', N'Giảng viên', 'D008', 3700000, 'vu@example.com');
INSERT INTO Employee (employee_id, first_name, last_name, date_of_birth, hire_date, job_title, department_id, salary, email) 
VALUES ('E009', N'Bùi', N'I', '1991-09-12', '2020-09-01', N'Giảng viên', 'D009', 3800000, 'bui@example.com');
INSERT INTO Employee (employee_id, first_name, last_name, date_of_birth, hire_date, job_title, department_id, salary, email) 
VALUES ('E010', N'Tống', N'J', '1982-04-15', '2015-10-10', N'Giảng viên', 'D010', 3900000, 'tong@example.com');

-- Bảng MSSQLAccount
INSERT INTO MSSQLAccount (user_id, username, password_hash, employee_id) VALUES ('U001', 'nguyena', 'hashed_password1', 'E001');
INSERT INTO MSSQLAccount (user_id, username, password_hash, employee_id) VALUES ('U002', 'tranb', 'hashed_password2', 'E002');
INSERT INTO MSSQLAccount (user_id, username, password_hash, employee_id) VALUES ('U003', 'lec', 'hashed_password3', 'E003');
INSERT INTO MSSQLAccount (user_id, username, password_hash, employee_id) VALUES ('U004', 'phamd', 'hashed_password4', 'E004');
INSERT INTO MSSQLAccount (user_id, username, password_hash, employee_id) VALUES ('U005', 'ho', 'hashed_password5', 'E005');
INSERT INTO MSSQLAccount (user_id, username, password_hash, employee_id) VALUES ('U006', 'ngo', 'hashed_password6', 'E006');
INSERT INTO MSSQLAccount (user_id, username, password_hash, employee_id) VALUES ('U007', 'dinh', 'hashed_password7', 'E007');
INSERT INTO MSSQLAccount (user_id, username, password_hash, employee_id) VALUES ('U008', 'vu', 'hashed_password8', 'E008');
INSERT INTO MSSQLAccount (user_id, username, password_hash, employee_id) VALUES ('U009', 'bui', 'hashed_password9', 'E009');
INSERT INTO MSSQLAccount (user_id, username, password_hash, employee_id) VALUES ('U010', 'tong', 'hashed_password10', 'E010');

-- Bảng Users
INSERT INTO Users (user_id, username, password_hash, email, first_name, last_name, date_of_birth, employee_id) 
VALUES ('U011', 'user1', 'hashed_password11', 'user1@example.com', N'Nguyễn', N'K', '1993-01-15', 'E001');
INSERT INTO Users (user_id, username, password_hash, email, first_name, last_name, date_of_birth, employee_id) 
VALUES ('U012', 'user2', 'hashed_password12', 'user2@example.com', N'Trần', N'L', '1994-02-20', 'E002');
INSERT INTO Users (user_id, username, password_hash, email, first_name, last_name, date_of_birth, employee_id) 
VALUES ('U013', 'user3', 'hashed_password13', 'user3@example.com', N'Lê', N'M', '1995-03-25', 'E003');
INSERT INTO Users (user_id, username, password_hash, email, first_name, last_name, date_of_birth, employee_id) 
VALUES ('U014', 'user4', 'hashed_password14', 'user4@example.com', N'Phạm', N'N', '1996-04-30', 'E004');
INSERT INTO Users (user_id, username, password_hash, email, first_name, last_name, date_of_birth, employee_id) 
VALUES ('U015', 'user5', 'hashed_password15', 'user5@example.com', N'Hồ', N'O', '1991-11-30', 'E005');
INSERT INTO Users (user_id, username, password_hash, email, first_name, last_name, date_of_birth, employee_id) 
VALUES ('U016', 'user6', 'hashed_password16', 'user6@example.com', N'Ngô', N'P', '1990-06-25', 'E006');
INSERT INTO Users (user_id, username, password_hash, email, first_name, last_name, date_of_birth, employee_id) 
VALUES ('U017', 'user7', 'hashed_password17', 'user7@example.com', N'Đinh', N'Q', '1995-10-10', 'E007');
INSERT INTO Users (user_id, username, password_hash, email, first_name, last_name, date_of_birth, employee_id) 
VALUES ('U018', 'user8', 'hashed_password18', 'user8@example.com', N'Vũ', N'R', '1992-02-20', 'E008');
INSERT INTO Users (user_id, username, password_hash, email, first_name, last_name, date_of_birth, employee_id) 
VALUES ('U019', 'user9', 'hashed_password19', 'user9@example.com', N'Bùi', N'S', '1989-01-15', 'E009');
INSERT INTO Users (user_id, username, password_hash, email, first_name, last_name, date_of_birth, employee_id) 
VALUES ('U020', 'user10', 'hashed_password20', 'user10@example.com', N'Tống', N'T', '1988-03-30', 'E010');

-- Bảng Course
INSERT INTO Course (course_id, course_name, credits_num, lesson_num, course_type) 
VALUES ('C101', N'Cơ Sở Dữ Liệu', 3, 30, N'Lý thuyết');
INSERT INTO Course (course_id, course_name, credits_num, lesson_num, course_type) 
VALUES ('C102', N'Lập Trình Web', 3, 30, N'Thực hành');
INSERT INTO Course (course_id, course_name, credits_num, lesson_num, course_type) 
VALUES ('C103', N'Khoa Học Máy Tính', 3, 30, N'Lý thuyết');
INSERT INTO Course (course_id, course_name, credits_num, lesson_num, course_type) 
VALUES ('C104', N'Giáo Dục Thể Chất', 2, 20, N'Thực hành');
INSERT INTO Course (course_id, course_name, credits_num, lesson_num, course_type) 
VALUES ('C105', N'Lập Trình Di Động', 3, 30, N'Lý thuyết');
INSERT INTO Course (course_id, course_name, credits_num, lesson_num, course_type) 
VALUES ('C106', N'Mạng Máy Tính', 3, 30, N'Thực hành');
INSERT INTO Course (course_id, course_name, credits_num, lesson_num, course_type) 
VALUES ('C107', N'Hệ Điều Hành', 3, 30, N'Lý thuyết');
INSERT INTO Course (course_id, course_name, credits_num, lesson_num, course_type) 
VALUES ('C108', N'Công Nghệ Phần Mềm', 3, 30, N'Thực hành');
INSERT INTO Course (course_id, course_name, credits_num, lesson_num, course_type) 
VALUES ('C109', N'Quản Trị Dự Án', 3, 30, N'Lý thuyết');
INSERT INTO Course (course_id, course_name, credits_num, lesson_num, course_type) 
VALUES ('C110', N'Lập Trình Python', 3, 30, N'Thực hành');

-- Bảng Prerequisite_Course
INSERT INTO Prerequisite_Course (course_id, prerequisite_course_id) VALUES ('C102', 'C101');
INSERT INTO Prerequisite_Course (course_id, prerequisite_course_id) VALUES ('C105', 'C101');
INSERT INTO Prerequisite_Course (course_id, prerequisite_course_id) VALUES ('C106', 'C102');
INSERT INTO Prerequisite_Course (course_id, prerequisite_course_id) VALUES ('C107', 'C101');
INSERT INTO Prerequisite_Course (course_id, prerequisite_course_id) VALUES ('C108', 'C106');
INSERT INTO Prerequisite_Course (course_id, prerequisite_course_id) VALUES ('C109', 'C107');
INSERT INTO Prerequisite_Course (course_id, prerequisite_course_id) VALUES ('C110', 'C105');
INSERT INTO Prerequisite_Course (course_id, prerequisite_course_id) VALUES ('C103', 'C101');
INSERT INTO Prerequisite_Course (course_id, prerequisite_course_id) VALUES ('C104', 'C101');
INSERT INTO Prerequisite_Course (course_id, prerequisite_course_id) VALUES ('C105', 'C104');

-- Bảng Semesters
INSERT INTO Semesters (start_date, end_date, registration_deadline) 
VALUES ('2023-09-01', '2024-01-15', '2023-08-15');
INSERT INTO Semesters (start_date, end_date, registration_deadline) 
VALUES ('2024-02-01', '2024-06-15', '2024-01-15');
INSERT INTO Semesters (start_date, end_date, registration_deadline) 
VALUES ('2024-09-01', '2025-01-15', '2024-08-15');
INSERT INTO Semesters (start_date, end_date, registration_deadline) 
VALUES ('2025-02-01', '2025-06-15', '2025-01-15');
INSERT INTO Semesters (start_date, end_date, registration_deadline) 
VALUES ('2025-09-01', '2026-01-15', '2025-08-15');
INSERT INTO Semesters (start_date, end_date, registration_deadline) 
VALUES ('2026-02-01', '2026-06-15', '2026-01-15');
INSERT INTO Semesters (start_date, end_date, registration_deadline) 
VALUES ('2026-09-01', '2027-01-15', '2026-08-15');
INSERT INTO Semesters (start_date, end_date, registration_deadline) 
VALUES ('2027-02-01', '2027-06-15', '2027-01-15');
INSERT INTO Semesters (start_date, end_date, registration_deadline) 
VALUES ('2027-09-01', '2028-01-15', '2027-08-15');
INSERT INTO Semesters (start_date, end_date, registration_deadline) 
VALUES ('2028-02-01', '2028-06-15', '2028-01-15');

-- Bảng Students
INSERT INTO Students (student_id, first_name, last_name, date_of_birth, gender, class_id) 
VALUES ('S001', N'Nguyễn', N'H', '2000-01-01', N'Nam', 'C001');
INSERT INTO Students (student_id, first_name, last_name, date_of_birth, gender, class_id) 
VALUES ('S002', N'Trần', N'K', '2000-02-02', N'Nữ', 'C001');
INSERT INTO Students (student_id, first_name, last_name, date_of_birth, gender, class_id) 
VALUES ('S003', N'Lê', N'L', '2000-03-03', N'Nam', 'C002');
INSERT INTO Students (student_id, first_name, last_name, date_of_birth, gender, class_id) 
VALUES ('S004', N'Phạm', N'M', '2000-04-04', N'Nữ', 'C002');
INSERT INTO Students (student_id, first_name, last_name, date_of_birth, gender, class_id) 
VALUES ('S005', N'Hồ', N'N', '2000-05-05', N'Nam', 'C003');
INSERT INTO Students (student_id, first_name, last_name, date_of_birth, gender, class_id) 
VALUES ('S006', N'Ngô', N'O', '2000-06-06', N'Nữ', 'C003');
INSERT INTO Students (student_id, first_name, last_name, date_of_birth, gender, class_id) 
VALUES ('S007', N'Đinh', N'P', '2000-07-07', N'Nam', 'C004');
INSERT INTO Students (student_id, first_name, last_name, date_of_birth, gender, class_id) 
VALUES ('S008', N'Vũ', N'Q', '2000-08-08', N'Nữ', 'C004');
INSERT INTO Students (student_id, first_name, last_name, date_of_birth, gender, class_id) 
VALUES ('S009', N'Bùi', N'R', '2000-09-09', N'Nam', 'C005');
INSERT INTO Students (student_id, first_name, last_name, date_of_birth, gender, class_id) 
VALUES ('S010', N'Tống', N'S', '2000-10-10', N'Nữ', 'C005');

-- Bảng CourseResults
INSERT INTO CourseResults (result_id, student_id, course_id, semester_id, grade) VALUES ('R001', 'S001', 'C101', 1, 'A');
INSERT INTO CourseResults (result_id, student_id, course_id, semester_id, grade) VALUES ('R002', 'S002', 'C102', 1, 'B');
INSERT INTO CourseResults (result_id, student_id, course_id, semester_id, grade) VALUES ('R003', 'S003', 'C103', 1, 'C');
INSERT INTO CourseResults (result_id, student_id, course_id, semester_id, grade) VALUES ('R004', 'S004', 'C104', 1, 'A');
INSERT INTO CourseResults (result_id, student_id, course_id, semester_id, grade) VALUES ('R005', 'S005', 'C105', 1, 'B');
INSERT INTO CourseResults (result_id, student_id, course_id, semester_id, grade) VALUES ('R006', 'S006', 'C106', 1, 'A');
INSERT INTO CourseResults (result_id, student_id, course_id, semester_id, grade) VALUES ('R007', 'S007', 'C107', 1, 'C');
INSERT INTO CourseResults (result_id, student_id, course_id, semester_id, grade) VALUES ('R008', 'S008', 'C108', 1, 'B');
INSERT INTO CourseResults (result_id, student_id, course_id, semester_id, grade) VALUES ('R009', 'S009', 'C109', 1, 'A');
INSERT INTO CourseResults (result_id, student_id, course_id, semester_id, grade) VALUES ('R010', 'S010', 'C110', 1, 'B');

-- Bảng Course_Registration
INSERT INTO Course_Registration (registration_id, student_id, course_id, semester_id, registration_date, registration_status) VALUES ('REG001', 'S001', 'C101', 1, '2023-08-01', N'Đã đăng ký');
INSERT INTO Course_Registration (registration_id, student_id, course_id, semester_id, registration_date, registration_status) VALUES ('REG002', 'S002', 'C102', 1, '2023-08-02', N'Đã đăng ký');
INSERT INTO Course_Registration (registration_id, student_id, course_id, semester_id, registration_date, registration_status) VALUES ('REG003', 'S003', 'C103', 1, '2023-08-03', N'Đã đăng ký');
INSERT INTO Course_Registration (registration_id, student_id, course_id, semester_id, registration_date, registration_status) VALUES ('REG004', 'S004', 'C104', 1, '2023-08-04', N'Đã đăng ký');
INSERT INTO Course_Registration (registration_id, student_id, course_id, semester_id, registration_date, registration_status) VALUES ('REG005', 'S005', 'C105', 1, '2023-08-05', N'Đã đăng ký');
INSERT INTO Course_Registration (registration_id, student_id, course_id, semester_id, registration_date, registration_status) VALUES ('REG006', 'S006', 'C106', 1, '2023-08-06', N'Đã đăng ký');
INSERT INTO Course_Registration (registration_id, student_id, course_id, semester_id, registration_date, registration_status) VALUES ('REG007', 'S007', 'C107', 1, '2023-08-07', N'Đã đăng ký');
INSERT INTO Course_Registration (registration_id, student_id, course_id, semester_id, registration_date, registration_status) VALUES ('REG008', 'S008', 'C108', 1, '2023-08-08', N'Đã đăng ký');
INSERT INTO Course_Registration (registration_id, student_id, course_id, semester_id, registration_date, registration_status) VALUES ('REG009', 'S009', 'C109', 1, '2023-08-09', N'Đã đăng ký');
INSERT INTO Course_Registration (registration_id, student_id, course_id, semester_id, registration_date, registration_status) VALUES ('REG010', 'S010', 'C110', 1, '2023-08-10', N'Đã đăng ký');

-- Bảng Tuition_Fees
INSERT INTO Tuition_Fees (fee_id, student_id, semester_id, total_credits, tuition_fee, discount, amount_paid, payment_status) VALUES ('F001', 'S001', 1, 15, 15000000, 750000, 14250000, N'Đã thanh toán');
INSERT INTO Tuition_Fees (fee_id, student_id, semester_id, total_credits, tuition_fee, discount, amount_paid, payment_status) VALUES ('F002', 'S002', 1, 15, 15000000, 0, 15000000, N'Đã thanh toán');
INSERT INTO Tuition_Fees (fee_id, student_id, semester_id, total_credits, tuition_fee, discount, amount_paid, payment_status) VALUES ('F003', 'S003', 1, 15, 15000000, 1500000, 13500000, N'Đã thanh toán');
INSERT INTO Tuition_Fees (fee_id, student_id, semester_id, total_credits, tuition_fee, discount, amount_paid, payment_status) VALUES ('F004', 'S004', 1, 15, 15000000, 0, 15000000, N'Đã thanh toán');
INSERT INTO Tuition_Fees (fee_id, student_id, semester_id, total_credits, tuition_fee, discount, amount_paid, payment_status) VALUES ('F005', 'S005', 1, 15, 15000000, 750000, 14250000, N'Đã thanh toán');
INSERT INTO Tuition_Fees (fee_id, student_id, semester_id, total_credits, tuition_fee, discount, amount_paid, payment_status) VALUES ('F006', 'S006', 1, 15, 15000000, 0, 15000000, N'Đã thanh toán');
INSERT INTO Tuition_Fees (fee_id, student_id, semester_id, total_credits, tuition_fee, discount, amount_paid, payment_status) VALUES ('F007', 'S007', 1, 15, 15000000, 1500000, 13500000, N'Đã thanh toán');
INSERT INTO Tuition_Fees (fee_id, student_id, semester_id, total_credits, tuition_fee, discount, amount_paid, payment_status) VALUES ('F008', 'S008', 1, 15, 15000000, 0, 15000000, N'Đã thanh toán');
INSERT INTO Tuition_Fees (fee_id, student_id, semester_id, total_credits, tuition_fee, discount, amount_paid, payment_status) VALUES ('F009', 'S009', 1, 15, 15000000, 750000, 14250000, N'Đã thanh toán');
INSERT INTO Tuition_Fees (fee_id, student_id, semester_id, total_credits, tuition_fee, discount, amount_paid, payment_status) VALUES ('F010', 'S010', 1, 15, 15000000, 0, 15000000, N'Đã thanh toán');

-- Bảng Credit_Rules
INSERT INTO Credit_Rules (rule_id, class_id, semester_id, min_credits, max_credits) VALUES ('CR001', 'C001', 1, 12, 24);
INSERT INTO Credit_Rules (rule_id, class_id, semester_id, min_credits, max_credits) VALUES ('CR002', 'C002', 1, 12, 24);
INSERT INTO Credit_Rules (rule_id, class_id, semester_id, min_credits, max_credits) VALUES ('CR003', 'C003', 1, 12, 24);
INSERT INTO Credit_Rules (rule_id, class_id, semester_id, min_credits, max_credits) VALUES ('CR004', 'C004', 1, 12, 24);
INSERT INTO Credit_Rules (rule_id, class_id, semester_id, min_credits, max_credits) VALUES ('CR005', 'C005', 1, 12, 24);
INSERT INTO Credit_Rules (rule_id, class_id, semester_id, min_credits, max_credits) VALUES ('CR006', 'C006', 1, 12, 24);
INSERT INTO Credit_Rules (rule_id, class_id, semester_id, min_credits, max_credits) VALUES ('CR007', 'C007', 1, 12, 24);
INSERT INTO Credit_Rules (rule_id, class_id, semester_id, min_credits, max_credits) VALUES ('CR008', 'C008', 1, 12, 24);
INSERT INTO Credit_Rules (rule_id, class_id, semester_id, min_credits, max_credits) VALUES ('CR009', 'C009', 1, 12, 24);
INSERT INTO Credit_Rules (rule_id, class_id, semester_id, min_credits, max_credits) VALUES ('CR010', 'C010', 1, 12, 24);

-- Bảng Fee_Rates
INSERT INTO Fee_Rates (course_type, fee_per_credit) VALUES (N'Lý thuyết', 1000000);
INSERT INTO Fee_Rates (course_type, fee_per_credit) VALUES (N'Thực hành', 1200000);
INSERT INTO Fee_Rates (course_type, fee_per_credit) VALUES (N'Đồ án', 1500000);
INSERT INTO Fee_Rates (course_type, fee_per_credit) VALUES (N'Thực tập', 800000);
INSERT INTO Fee_Rates (course_type, fee_per_credit) VALUES (N'Seminar', 1100000);
INSERT INTO Fee_Rates (course_type, fee_per_credit) VALUES (N'Ngoại ngữ', 1300000);
INSERT INTO Fee_Rates (course_type, fee_per_credit) VALUES (N'Tin học', 1400000);
INSERT INTO Fee_Rates (course_type, fee_per_credit) VALUES (N'Giáo dục thể chất', 500000);
INSERT INTO Fee_Rates (course_type, fee_per_credit) VALUES (N'Giáo dục quốc phòng', 600000);
INSERT INTO Fee_Rates (course_type, fee_per_credit) VALUES (N'Kỹ năng mềm', 900000);

-- Bảng Fee_Discounts
INSERT INTO Fee_Discounts (discount_type, discount_percent) VALUES (N'Học bổng loại A', 100.00);
INSERT INTO Fee_Discounts (discount_type, discount_percent) VALUES (N'Học bổng loại B', 50.00);
INSERT INTO Fee_Discounts (discount_type, discount_percent) VALUES (N'Học bổng loại C', 25.00);
INSERT INTO Fee_Discounts (discount_type, discount_percent) VALUES (N'Con thương binh, liệt sĩ', 100.00);
INSERT INTO Fee_Discounts (discount_type, discount_percent) VALUES (N'Sinh viên dân tộc thiểu số', 50.00);
INSERT INTO Fee_Discounts (discount_type, discount_percent) VALUES (N'Sinh viên có hoàn cảnh khó khăn', 30.00);
INSERT INTO Fee_Discounts (discount_type, discount_percent) VALUES (N'Sinh viên đạt giải Olympic', 100.00);
INSERT INTO Fee_Discounts (discount_type, discount_percent) VALUES (N'Sinh viên đạt giải quốc gia', 50.00);
INSERT INTO Fee_Discounts (discount_type, discount_percent) VALUES (N'Sinh viên đạt giải khu vực', 25.00);
INSERT INTO Fee_Discounts (discount_type, discount_percent) VALUES (N'Sinh viên tham gia công tác Đoàn - Hội', 10.00);

-- Bảng Fee_Payments
INSERT INTO Fee_Payments (fee_id, payment_date, amount_paid) VALUES ('F001', '2023-08-15', 14250000);
INSERT INTO Fee_Payments (fee_id, payment_date, amount_paid) VALUES ('F002', '2023-08-16', 15000000);
INSERT INTO Fee_Payments (fee_id, payment_date, amount_paid) VALUES ('F003', '2023-08-17', 13500000);
INSERT INTO Fee_Payments (fee_id, payment_date, amount_paid) VALUES ('F004', '2023-08-18', 15000000);
INSERT INTO Fee_Payments (fee_id, payment_date, amount_paid) VALUES ('F005', '2023-08-19', 14250000);
INSERT INTO Fee_Payments (fee_id, payment_date, amount_paid) VALUES ('F006', '2023-08-20', 15000000);
INSERT INTO Fee_Payments (fee_id, payment_date, amount_paid) VALUES ('F007', '2023-08-21', 13500000);
INSERT INTO Fee_Payments (fee_id, payment_date, amount_paid) VALUES ('F008', '2023-08-22', 15000000);
INSERT INTO Fee_Payments (fee_id, payment_date, amount_paid) VALUES ('F009', '2023-08-23', 14250000);
INSERT INTO Fee_Payments (fee_id, payment_date, amount_paid) VALUES ('F010', '2023-08-24', 15000000);

-- Insert users into the Users table
INSERT INTO Users (user_id, username, password_hash, email, first_name, last_name, date_of_birth, address, phone_number, employee_id, sql_server_user)
VALUES ('user_admin', 'admin_user', 'hashed_password_admin', 'admin@example.com', 'Admin', 'User', '1980-01-01', '123 Admin St', '123-456-7890', NULL, 'admin_sql_user');

INSERT INTO Users (user_id, username, password_hash, email, first_name, last_name, date_of_birth, address, phone_number, employee_id, sql_server_user)
VALUES ('user_student', 'student_user', 'hashed_password_student', 'student@example.com', 'Student', 'User', '2000-01-01', '456 Student Ave', '234-567-8901', NULL, 'student_sql_user');

INSERT INTO Users (user_id, username, password_hash, email, first_name, last_name, date_of_birth, address, phone_number, employee_id, sql_server_user)
VALUES ('user_accounting', 'accounting_user', 'hashed_password_accounting', 'accounting@example.com', 'Accounting', 'User', '1990-01-01', '789 Accounting Blvd', '345-678-9012', NULL, 'accounting_sql_user');

INSERT INTO Users (user_id, username, password_hash, email, first_name, last_name, date_of_birth, address, phone_number, employee_id, sql_server_user)
VALUES ('user_academic', 'academic_user', 'hashed_password_academic', 'academic@example.com', 'Academic', 'User', '1995-01-01', '101 Academic Rd', '456-789-0123', NULL, 'academic_sql_user');

-- Insert roles into the Roles table
INSERT INTO Roles (role_name) VALUES ('admin');
INSERT INTO Roles (role_name) VALUES ('student');
INSERT INTO Roles (role_name) VALUES ('accounting staff');
INSERT INTO Roles (role_name) VALUES ('academic affairs staff');

-- Assign roles to users
-- Assuming role IDs are 1 for 'admin', 2 for 'student', 3 for 'accounting staff', and 4 for 'academic affairs staff'
INSERT INTO UserRoles (user_id, role_id) VALUES ('user_admin', 1);
INSERT INTO UserRoles (user_id, role_id) VALUES ('user_student', 2);
INSERT INTO UserRoles (user_id, role_id) VALUES ('user_accounting', 3);
INSERT INTO UserRoles (user_id, role_id) VALUES ('user_academic', 4);