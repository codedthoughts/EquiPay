# Split App - Expense Splitting Application

A fullstack application designed to help groups of people split expenses fairly and calculate settlements. This project was built to handle common scenarios like splitting dinner costs, utility bills, or travel expenses.

## Table of Contents
- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [API Endpoints](#api-endpoints)
- [Postman Collection](#postman-collection)

## Live Demo

- **Frontend Application**: [https://equipay-production.up.railway.app](https://equipay-production.up.railway.app)
- **Backend API**: [https://equipay-production.up.railway.app/api](https://equipay-production.up.railway.app/api)

## Features

- **User Management**: Users are automatically created when mentioned in an expense
- **Expense Tracking**: Add, view, and delete expenses with complete details
- **Flexible Splitting Options**:
  - **Equal**: Split the cost equally among all participants
  - **Exact**: Specify the exact amount each person owes
  - **Percentage**: Split the cost based on custom percentages
- **Real-time Balance Calculation**: View who owes money and who is owed money
- **Simplified Settlements**: Calculates minimum transactions to settle all debts
- **Data Validation**: Robust backend validation with clear error messages

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Language**: JavaScript (ES Modules)

### Frontend
- **Library**: React (with Vite)
- **Styling**: CSS3
- **Language**: JavaScript (JSX)

### Deployment & Tooling
- **Backend Hosting**: Render.com
- **Frontend Hosting**: Vercel / Netlify / Render.com
- **API Testing**: Postman

## Project Structure

```
/split-app-assignment/
|
|-- /backend/
|   |-- /controllers/     # Business logic for routes
|   |-- /models/          # Mongoose data schemas (User, Expense)
|   |-- /routes/          # API route definitions
|   |-- .env              # Environment variables
|   |-- index.js          # Main server entry point
|   |-- package.json
|
|-- /frontend/
|   |-- /src/
|   |   |-- /components/  # Reusable React components
|   |   |-- /services/    # API communication logic
|   |   |-- App.jsx       # Main application component
|   |   |-- index.css     # Global styles
|   |-- package.json
|
|-- README.md
```

## Setup and Installation

### 1. Backend Setup

1. Navigate to the backend directory and install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Create a `.env` file in the backend directory:
   ```env
   PORT=3001
   MONGO_URI=mongodb+srv://<user>:<password>@your-cluster-url...
   ```
   > Replace `MONGO_URI` with your MongoDB Atlas connection string.

3. Start the development server:
   ```bash
   npm run dev
   ```
   The backend API will be available at `http://localhost:3001`

### 2. Frontend Setup

1. Navigate to the frontend directory and install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/users` | Creates a new user |
| GET    | `/users` | Retrieves all users |
| POST   | `/expenses` | Adds a new expense |
| GET    | `/expenses` | Retrieves all expenses |
| DELETE | `/expenses/:id` | Deletes a specific expense |
| GET    | `/balances` | Gets net balances for all users |
| GET    | `/settlements` | Gets simplified transactions to settle debts |

## Postman Collection

For testing the API endpoints, you can use the following Postman collection:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/collections/your-collection-id)

Or import the collection from the Gist:
[View on Gist](https://gist.github.com/your-username/your-gist-id)
