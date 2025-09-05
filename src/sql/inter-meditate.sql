/*Intermediate (31–70)
4-Find departments without employees.

5-Show projects without employees.


7-List employees working on multiple projects (GROUP BY HAVING).

9-Find employees with same salary as someone else.

10-Find employees who share the same department.
12-Find department with highest average salary.

13-Show employees with salary equal to company average.

14-Show employee(s) with salary greater than manager’s salary (if manager field existed ? use self join).

15-Show employees earning 2nd highest salary in their department.

16-Retrieve employees hired in the last 2 years.

17-Find total salary paid in each project.

18-Show employee names and number of projects they are working on.

19-Find project with maximum employees.

20-Find employees not working on any project.

21-Retrieve department and count of projects under it.

22-Retrieve departments that manage more than 1 project.

23-Find duplicate first names.
25-Show salary difference between max and min in each department.

26-Show employees with salaries higher than “Michael Johnson”.

27-Find employees working in the same projects as “David Wilson”.

28-List employees who joined before their manager (if managers existed).

29-Show first 2 employees hired in each department.

30-Find employees earning in the top 10% of salaries.

31-List employees who don’t have matching record in EmployeeProjects (LEFT JOIN).

32-Find employees who have not been assigned to any department.*/

select * from dbo.Employees
select * from dbo.Departments
select * from dbo.EmployeeProjects
select * from dbo.Projects

--Show employee full name (concatenate).
select concat(e.FirstName,e.LastName) as [full name] from dbo.Employees as e

--Find average salary per department.
SELECT 
    d.DepartmentName,
    AVG(e.Salary) AS [Avg Salary]
FROM dbo.Employees AS e
JOIN dbo.Departments AS d
    ON e.DepartmentID = d.DepartmentID
GROUP BY d.DepartmentName;

--Find highest salary per department.
--normal way
select d.DepartmentName,max(e.Salary)as [higest salary per department] from dbo.Employees as e
join dbo.Departments as d
on e.DepartmentID=d.DepartmentID
group by d.DepartmentName

--Find highest salary per department.
--experment way
select d.DepartmentName,max(e.Salary) as [higest salary] from dbo.EmployeeProjects as ep
join dbo.Employees as e
on ep.EmpID=e.EmpID
join dbo.Projects as p
on ep.ProjectID=p.ProjectID
join dbo.Departments as d
on p.DepartmentID=d.DepartmentID
group by d.DepartmentName


--Find lowest salary per department.
--normal way
select d.DepartmentName,min(e.Salary) as [lowest salary] from dbo.Employees as e
join dbo.Departments as d
on e.DepartmentID=d.DepartmentID
group by d.DepartmentName

--experiment way
select d.DepartmentName,min(e.Salary) as [lowest salary] from dbo.EmployeeProjects as ep
join dbo.Employees as e
on ep.EmpID=e.EmpID
join dbo.Projects as p
on ep.ProjectID=p.ProjectID
join dbo.Departments as d
on p.DepartmentID=d.DepartmentID
group by d.DepartmentName

--Rank employees by salary (use RANK).
-- normal way
select 
e.FirstName,e.LastName,e.Salary,e.DepartmentID,e.HireDate,
rank() over(order by e.Salary desc) as [salary rank]
from dbo.Employees as e

--experiment way
-- Rank employees by salary and join with projects and departments
SELECT  
    e.FirstName,
    e.LastName,
    e.Salary,
    e.DepartmentID,
    e.HireDate,
    e.SalaryRank,
    d.DepartmentName,
    p.ProjectName
FROM dbo.EmployeeProjects AS ep
JOIN (
    SELECT  
        EmpID,
        FirstName,
        LastName,
        Salary,
        DepartmentID,
        HireDate,
        RANK() OVER (ORDER BY Salary DESC) AS SalaryRank
    FROM dbo.Employees
) AS e
    ON ep.EmpID = e.EmpID
JOIN dbo.Projects AS p
    ON ep.ProjectID = p.ProjectID
JOIN dbo.Departments AS d
    ON e.DepartmentID = d.DepartmentID;

    
--Find 2nd highest salary using subquery.
-- ✅ Find the employee(s) with 2nd highest salary
SELECT 
    e.FirstName,
    e.LastName,
    e.Salary,
    d.DepartmentName,
    p.ProjectName
FROM dbo.EmployeeProjects AS ep
JOIN dbo.Employees AS e
    ON ep.EmpID = e.EmpID
JOIN dbo.Projects AS p
    ON ep.ProjectID = p.ProjectID
JOIN dbo.Departments AS d
    ON p.DepartmentID = d.DepartmentID
WHERE e.Salary = (
    SELECT MAX(Salary) 
    FROM dbo.Employees
    WHERE Salary < (SELECT MAX(Salary) FROM dbo.Employees)
);


SELECT *
FROM dbo.Employees
ORDER BY Salary DESC
OFFSET 1 ROW FETCH NEXT 1 ROW ONLY; -- skips highest, fetches 2nd highest

--Find 3rd highest salary.
--normal way
select * from dbo.Employees as e
order by e.Salary desc
offset 2 row fetch next 1 row only
-- experiment way
select  e.FirstName,
    e.LastName,
    e.Salary,
    d.DepartmentName,
    p.ProjectName
    from dbo.EmployeeProjects as ep
join dbo.Employees as e
on ep.EmpID=e.EmpID
join dbo.Projects as p
on ep.ProjectID=p.ProjectID
join dbo.Departments as d
on p.DepartmentID=d.DepartmentID
where e.Salary=(
select e.Salary from dbo.Employees as e
order by e.Salary desc
offset 2 row fetch next 1 row only 
)

--List employees earning above average salary.
--normal way
select e.FirstName, e.LastName, e.Salary, d.DepartmentName from dbo.Employees as e
join dbo.Departments as d
on e.DepartmentID=d.DepartmentID
where e.Salary>(
select avg(Salary) from dbo.Employees 
)

--1-Find employees earning more than department average.
select e.FirstName, e.LastName, e.Salary, d.DepartmentName
from dbo.Employees as e
join dbo.Departments as d
on e.DepartmentID=d.DepartmentID
where e.Salary >(
select avg(Salary) from dbo.Employees
where DepartmentID=e.DepartmentID
)


--2-Show department with maximum employees.
SELECT *
FROM dbo.EmployeeProjects AS ep
JOIN dbo.Employees AS e
    ON ep.EmpID = e.EmpID
JOIN dbo.Projects AS p
    ON ep.ProjectID = p.ProjectID
JOIN dbo.Departments AS d
    ON p.DepartmentID = d.DepartmentID
WHERE e.EmpID=(
select COUNT(EmpID)
from dbo .Employees
HAVING COUNT(EmpID)>1
)
--2-Show department with maximum employees.
SELECT TOP 1
    d.DepartmentID,
    d.DepartmentName,
    COUNT(e.EmpID) AS EmployeeCount
FROM dbo.Employees AS e
JOIN dbo.Departments AS d
    ON e.DepartmentID = d.DepartmentID
GROUP BY d.DepartmentID, d.DepartmentName
ORDER BY COUNT(e.EmpID) DESC;



--3-Show department with minimum employees.
select TOP 1
    d.DepartmentID,
    d.DepartmentName,
    COUNT(e.EmpID) AS EmployeeCount 
    from dbo.Employees as e
join dbo.Departments as d
on e.DepartmentID=d.DepartmentID
group by d.DepartmentID,d.DepartmentName
order by count(e.EmpID) asc

--11-Count employees hired each year.
select year(e.HireDate) as [hire_year],count(e.EmpID)as [count employe] from dbo.Employees as e group by year(e.HireDate)order by hire_year

--8-Find employees who work in IT but not Finance.
SELECT e.EmpID, e.FirstName, e.LastName, d.DepartmentName
FROM dbo.Employees AS e
JOIN dbo.Departments AS d
    ON e.DepartmentID = d.DepartmentID
WHERE d.DepartmentName = 'IT'
  AND e.EmpID NOT IN (
        SELECT e2.EmpID
        FROM dbo.Employees AS e2
        JOIN dbo.Departments AS d2
            ON e2.DepartmentID = d2.DepartmentID
        WHERE d2.DepartmentName = 'Finance'
  );

  
--6-Show employees who are not in project 2.
select * from dbo.EmployeeProjects as ep
join dbo.Employees as e
on ep.EmpID=e.EmpID
join dbo.Projects as p
on ep.ProjectID=p.ProjectID
where e.EmpID not in(
select ep.EmpID from dbo.EmployeeProjects as ep
where ep.ProjectID=2
)
--24-Find employees with hire date in the same year.
--we dont have any data
SELECT 
    YEAR(e.HireDate) AS HireYear,
    e.FirstName,
    e.LastName,
    e.Salary
FROM dbo.Employees AS e
ORDER BY HireYear, e.FirstName;



