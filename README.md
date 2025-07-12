# Description

- Youtube video link : https://www.youtube.com/watch?v=KqRqvC3wMOc

Note : If you get a problem related to crypto.hash use node version node: ^20.19.0 || >=22.12.0


## Problem Statement 2

### StackIt – A Minimal Q&A Forum Platform

### Overview

- StackIt is a m inim al question-and-answer platform that supports collaborative
  learning and structured knowledge sharing. It’s designed to be sim ple, user- friendly,
  and focused on the core experience of asking and answering questions within a
  com m unity.

## Team overview

The team consists of 4 members-

- Aakrisht Srivastava ( Team Leader ) ( aakrisri55@gmail.com )
- Utkarsh Pandey ( utkarshpandey0214@gmail.com )
- Kumar Abhishek Ranjan ( kumarabhishek706134@gmail.com )
- Suryanshu Choudhary ( suryanshuc659@gmail.com )

## Tech Stack

- Frontend with React.js \w shadcn
- Backend with NodeJS + Express + MongoDB
- Recommendation? Similarity system using python


## Instructions to Run Locally

### Frontend 
To run the react locally
Node Version >= 22.0.0

```
npm install
npm run dev
```

### Backend
To run the backend code

Add .env file of following format
```
MONGODB_URL=<URL to your MongoDB instance>
PORT=3000
JWT_SECRET=<JWT secret key>
NODE_ENV="development"
DB_NAME="odoo"
ISSUER="Codemons"
```

and run following code

```
npm install
node index.js
```