# Project Title

MyGym

## Description

This is a fullstack project for a gym with multiple branches. It allows admins to manage branches, users, and gym plans and classes.
It also allows registered users to purchase memberships, locate branches, and checkin easily.

The technologies used here are ReactJS, Node.js (Express), and MongoDB (Mongoose). The project also processes payments using Stripe.

## Getting Started

### Dependencies

* This project needs Nodejs and NPM to run.
* You need to have MongoDB installed and running to run this project.

### Installing

* Clone this repo
* Navigate to the project's root in a terminal and type ```cd frontend && npm install && cd ../backend && npm install```
* If you need an admin account (to manage plans/branches...), make sure MongoDB is running and do the following:
    * Start the backend. In a terminal go to the project's root folder and type ```cd backend && npm start```
    * In your browser type ```http://localhost:5000/api/users/createadmin```

### Executing program

* Make sure MongoDB is running.
* Start the backend. In a terminal go to the project's root folder and type ```cd backend && npm start```
* Start the frontend. In another terminal go to the project's root folder and type ```cd frontend && npm start```

## Authors

This project is coded by Judabne (https://github.com/judabne) and reviewed by Tom Philip (https://github.com/tommysqueak).
Bashar Harfoush (https://github.com/basharh) suggested improvements for the project.

## Version History

* 0.1
    * Initial Release

## Acknowledgments

The frontend is based on Creative Tim's (https://www.creative-tim.com/) Material Kit React (https://www.creative-tim.com/product/material-kit-react)
