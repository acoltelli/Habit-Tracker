# Habit-Tracker
## Stack
This project is built using the MERN stack. The MERN stack for this project includes the following technologies:  
-Node.js backend.  
-Express framework for Node.js.   
-Mongoose library for ORM (Object-Relational Mapper).  
-MongoDB database.  
-React frontend.  
-Redux for state management.   

## Build Instructions
Create .env file in project, copy/paste the following and set values for the two variables.

```
require('dotenv').config()  

DB_URI = '<your_uri>'  
SECRET = '<your_secret>'
```
cd into project
```javascript
// Install all dependencies
npm run full-install

// Run both client & development server
npm run dev

// React client runs on http://localhost:3000
