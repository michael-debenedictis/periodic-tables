# Periodic Tables Restaurant Reservation System

### deployed application links:
front end - https://periodic-tables-front-end-0uz9.onrender.com
back end - https://periodic-tables-back-end-hxym.onrender.com

### application summary:
Periodic Tables is a restaurant reservation web app intended to be used by restaurant staff and management. Its purpose is assisting in keeping track of and organizing customer reservations and available tables within the user's establishment.

This repository is set up as a monorepo, meaning that the frontend and backend projects are in one repository. This allows you to open both projects in the same editor.

### installation: 
1. Fork and clone this repository.
1. Run cp ./back-end/.env.sample ./back-end/.env.
1. Update the ./back-end/.env file with the connection URL's to your ElephantSQL database instance.
1. Run cp ./front-end/.env.sample ./front-end/.env.
1. You should not need to make changes to the ./front-end/.env file unless you want to connect to a backend at a location other than http://localhost:5001.
1. Run npm install to install project dependencies.
1. Run npm run start:dev to start your server in development mode.

### technology:
This app was built following a PERN stack, PostgreSQL, Express, React, Node. Front end routing accomplished with react-router-dom. Styling accomplished with bootstrap and vanilla css.

### documentation
dashboard - The dashboard is displayed from the home path, it stores and shows created reservations as well as created tables 
![dashboard image](./front-end/screenshots/us-01-submit-after.png)