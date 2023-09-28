<h1 align="center">
     Backend - Yoga Mangala Studio
</h1>

## About
Yoga Mangala is a Yoga studio. The application allows students to view information about their contracts, such as available classes and end dates. It also enables them to check in for available class times, keeping track of the number of remaining classes and absences. For administrators, it is possible to create users, view and edit contracts for all students, view available plans, create and edit class schedules, and create and edit new contracts.

---
## Status
In testing

---

## Technologies Used
- Node.js - Typescript - Firebase-admin - Jsonwebtoken - Nodemailer - Zod - Jest 
  
---

## Project Concept
The application is organized into 4 layers: Controller, Business, Domain, and Database, with Domain being the main layer housing business rules and entities. The project is divided into 6 modules/entities:
 - Auth/User
 - Plans/Plan
 - Calendar/YogaClass
 - Contracts/Contract
 - Booking/Checkin
 - Firm/Firm

The database used is the Firestore NoSQL database.

---

## Documentation
<a href="https://documenter.getpostman.com/view/18571104/VUjMo5rR">https://documenter.getpostman.com/view/18571104/VUjMo5rR</a>

---
## Running the Project
To run the project, follow these steps:

- Download the files
- Inside the folder, run in the terminal: npm i
- After finishing, run: npm run dev
