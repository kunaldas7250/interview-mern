Tech Stack

Frontend: React.js + TailwindCSS

Backend: Node.js + Express.js

Database: Microsoft SQL Server (using mssql npm package)

Authentication: JWT-based secure login/signup

HTTP Client: Axios

Form Handling: react-hook-form

File Upload: FormData API for profile pictures using multer

Optional Enhancements: PDF download for resumes

Problems Faced & Solutions

Routing Issues in React

Problem: While navigating between pages, I faced unexpected reloads and broken routes.

Solution: Used Link and NavLink from react-router-dom to handle client-side routing properly without page refreshes.

Resume Template Rendering
Why I Chose This Tech Stack

I chose React.js for a fast, dynamic frontend with reusable components. Node.js + Express.js provides a lightweight and scalable backend to handle API requests efficiently. Microsoft SQL Server stores structured resume data and allows easy querying. JWT authentication secures user accounts, while Axios and react-hook-form simplify API calls and form handling. Multer enables profile picture uploads, and PDF download enhances the user experience. Using plain CSS keeps styling simple and easy to manage.
Problem: While displaying dynamic resume data, the template was not rendering correctly for multiple resumes.

Solution: Created a reusable custom resume template component that correctly maps and displays education, skills, and experience for each resume.
