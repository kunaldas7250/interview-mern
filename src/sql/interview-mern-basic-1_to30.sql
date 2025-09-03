-- Employees table
CREATE TABLE Employees (
    EmpID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    DepartmentID INT,
    Salary DECIMAL(10,2),
    HireDate DATE
);

INSERT INTO Employees VALUES
(1, 'John', 'Doe', 1, 50000, '2018-03-12'),
(2, 'Jane', 'Smith', 2, 60000, '2019-06-15'),
(3, 'Michael', 'Johnson', 1, 70000, '2017-09-23'),
(4, 'Emily', 'Davis', 3, 55000, '2020-01-10'),
(5, 'David', 'Wilson', 2, 45000, '2021-07-01');

-- Departments table
CREATE TABLE Departments (
    DepartmentID INT PRIMARY KEY,
    DepartmentName VARCHAR(50)
);

INSERT INTO Departments VALUES
(1, 'HR'),
(2, 'IT'),
(3, 'Finance');

-- Projects table
CREATE TABLE Projects (
    ProjectID INT PRIMARY KEY,
    ProjectName VARCHAR(50),
    DepartmentID INT
);

INSERT INTO Projects VALUES
(1, 'Recruitment System', 1),
(2, 'E-Commerce Website', 2),
(3, 'Financial Dashboard', 3);

-- EmployeeProjects table (Many-to-Many)
CREATE TABLE EmployeeProjects (
    EmpID INT,
    ProjectID INT,
    PRIMARY KEY (EmpID, ProjectID)
);

INSERT INTO EmployeeProjects VALUES
(1, 1),
(2, 2),
(3, 2),
(4, 3),
(5, 2),
(5, 3);



/*Basic (1–30)

select * from INFORMATION_SCHEMA.TABLES where TABLE_NAME='employees'*/


/*Select all employees.*/
 select * from dbo.Employees

 /*Get only first name and last name of employees.*/
 select e.FirstName,e.LastName from dbo.Employees as e

 /*Find employees with salary greater than 50,000.*/
 select * from dbo.Employees as e where e.Salary>50000

 
/*List employees hired after 2019.*/
select * from dbo.Employees as e where YEAR(e.HireDate)>2019

/*Count total number of employees.*/
select count(EmpID) as [total empyee] from dbo.Employees 

/*Get distinct department IDs from Employees.*/

select distinct DepartmentID from dbo.Employees

/*Find employees in IT department (join with Departments).*/
select * from dbo.Employees as d where d.DepartmentID=(
select DepartmentID from dbo.Departments  where DepartmentName='IT'
)
select e.DepartmentID,e.EmpID,e.FirstName,e.LastName,d.DepartmentName
from dbo.Employees as e
join dbo.Departments as d
on e.DepartmentID=d.DepartmentID
where d.DepartmentName='IT'


/*Show employees ordered by salary descending.*/
select * from dbo.Employees as e order by e.Salary desc

/*Find top 3 highest paid employees.*/
select top 3* from dbo.Employees as e order by e.Salary desc

/*Get employees with salary between 45,000 and 60,000.*/
select * from dbo.Employees as e where e.Salary between 45000 and 60000

/*Find employees whose first name starts with ‘J’.*/
select * from dbo.Employees as e where e.FirstName like 'J%'

/*Show average salary of all employees.*/
select avg(e.Salary) as [avg salary] from Employees as e 

/*Show maximum salary.*/
select max(e.Salary) as [max salary] from dbo.Employees as e

/*Show minimum salary.*/
select min(e.Salary) as [min salary] from dbo.Employees as e

/*Show sum of salaries in IT department.*/
select sum(e.Salary)
as [sum of all salary employe who is in department] 
from dbo.Employees as e where e.DepartmentID=
( select DepartmentID from dbo.Departments as d where d.DepartmentName='IT')

/*Count employees per department.*/
SELECT d.DepartmentName, COUNT(*) AS EmployeeCount
FROM dbo.Employees AS e
JOIN dbo.Departments AS d 
    ON e.DepartmentID = d.DepartmentID
GROUP BY d.DepartmentName;

/*Find departments with more than 1 employee.*/
SELECT *
FROM dbo.Employees AS e
WHERE e.DepartmentID IN (
    SELECT d.DepartmentID
    FROM dbo.Departments AS d
    WHERE d.DepartmentID > 1
);


select * from dbo.Employees as e where e.DepartmentID in(select d.DepartmentID from dbo.Departments as d  where d.DepartmentID>1)

/*List employees not assigned to any project.*/

select * from dbo.Employees
select * from dbo.Projects

select e.* 
from dbo.Employees  as e
left join dbo.Projects as p
on e.EmpID=p.ProjectID
where p.ProjectID is null

SELECT *
FROM dbo.Employees AS e
WHERE e.EmpID NOT IN (SELECT p.ProjectID FROM dbo.Projects AS p);

/*Show projects and their department names.*/
SELECT p.ProjectID,p.ProjectName,p.DepartmentID,d.DepartmentName
FROM dbo.Projects AS p
JOIN dbo.Departments AS d
    ON p.DepartmentID = d.DepartmentID;

  /*  Find employees working on project “E-Commerce Website”.*/
  select * 
  from dbo.Employees as e
 join  dbo.Projects as p
 on e.DepartmentID=p.DepartmentID
 where p.DepartmentID=2

 /*Count employees in each project.*/
 select count(*) as [total employee]
 ,p.ProjectName
 from dbo.Employees as e
 join dbo.Projects as p
 on e.DepartmentID=p.DepartmentID
 group by p.ProjectName

 select p.ProjectName,count(ep.EmpID) as [total employee] 
 from dbo.EmployeeProjects as ep
 join dbo.Employees as e
 on ep.EmpID=e.EmpID
 join dbo.Projects as p
 on ep.ProjectID=p.ProjectID
 group by p.ProjectName

 /*Find employees with no department assigned (NULL check).*/
 select * from dbo.Employees as e
 full join dbo.Departments as d
 on e.EmpID=d.DepartmentID

 /*Show employees hired in 2020.*/
 select * from dbo.Employees as e where YEAR(e.HireDate)=2020

/* Find employees with last name containing “son”.*/
select * from dbo.Employees as e where e.LastName like '%son'

/*Show all employees sorted by hire date.*/
select * from dbo.Employees as e order by e.HireDate desc

/*Find employee with latest hire date.*/
select top 3* from dbo.Employees as e order by e.HireDate desc

/*List unique last names.*/
select distinct e.Lastname from dbo.Employees as e


/*Show employees who work in both IT and Finance projects.*/
SELECT e.FirstName, e.LastName
FROM dbo.EmployeeProjects AS ep
JOIN dbo.Employees AS e ON ep.EmpID = e.EmpID
JOIN dbo.Projects AS p ON ep.ProjectID = p.ProjectID
JOIN dbo.Departments AS d ON p.DepartmentID = d.DepartmentID   -- ? Correct join
WHERE d.DepartmentName IN ('IT', 'Finance')
GROUP BY e.EmpID, e.FirstName, e.LastName
HAVING COUNT(DISTINCT d.DepartmentName) = 2;


--Get employees working on more than 1 project.

SELECT e.EmpID, e.FirstName, e.LastName, COUNT(p.ProjectID) AS ProjectCount
FROM dbo.EmployeeProjects AS ep
JOIN dbo.Employees AS e ON ep.EmpID = e.EmpID
JOIN dbo.Projects AS p ON ep.ProjectID = p.ProjectID
GROUP BY e.EmpID, e.FirstName, e.LastName
HAVING COUNT(p.ProjectID) > 1;


/*Find employee with earliest hire date.*/
SELECT TOP 1 *
FROM dbo.Employees AS e
ORDER BY e.HireDate ASC;
