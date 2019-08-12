# Habit-Tracker


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
