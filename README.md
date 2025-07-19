# EquiPay - Expense Splitting Application

A fullstack application designed to help groups of people split expenses fairly and calculate settlements. This project handles common scenarios like splitting dinner costs, utility bills, or travel expenses with multiple participants.

## Table of Contents
- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [API Documentation](#api-documentation)

## 🌟 Live Demo

- **Frontend Application**: [https://equi-36h03n4rh-saarthaks-projects-9c9bdb2b.vercel.app/](https://equi-36h03n4rh-saarthaks-projects-9c9bdb2b.vercel.app/)
- **Backend API**: [https://equipay-production.up.railway.app/api](https://equipay-production.up.railway.app/api)

## ✨ Features

- **User Management**: Automatic user creation when mentioned in expenses
- **Expense Tracking**: Comprehensive expense management
- **Flexible Splitting**:
  - ✅ **Equal Split**: Divide costs equally
  - 💰 **Exact Amounts**: Specify exact shares
  - 📊 **Percentage Split**: Allocate by percentages
- **Balance Tracking**: Real-time who-owes-what
- **Smart Settlements**: Minimal transactions to clear all debts
- **Data Validation**: Robust input validation

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **ODM**: Mongoose

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: CSS3 with CSS Variables
- **State Management**: React Hooks

### Deployment
- **Frontend**: Vercel
- **Backend**: Railway
- **Database**: MongoDB Atlas

## 📁 Project Structure

```
equipay-dev-dynamics/
│
├── backend/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom middleware
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API routes
│   ├── utils/          # Helper functions
│   ├── .env            # Environment variables
│   ├── index.js        # Entry point
│   └── package.json
│
└── frontend/
    ├── public/         # Static files
    └── src/
        ├── assets/     # Images, fonts, etc.
        ├── components/ # Reusable components
        ├── services/   # API services
        ├── App.jsx     # Root component
        ├── main.jsx    # Entry point
        └── index.css   # Global styles
```

## 🚀 Setup and Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB Atlas account

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/username/equipay-dev-dynamics.git
   cd equipay-dev-dynamics/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```env
   PORT=3001
   MONGO_URI=your_mongodb_connection_string
   NODE_ENV=development
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   API will be available at `http://localhost:3001`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```env
   VITE_API_URL=http://localhost:3001/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   App will be available at `http://localhost:5173`

## 📚 API Documentation

Base URL: `https://equipay-production.up.railway.app/api`

### Users

#### Create User
```http
POST /users
Content-Type: application/json

{
  "name": "John Doe"
}
```

#### List All Users
```http
GET /users
```

### Expenses

#### Create Expense
```http
POST /expenses
Content-Type: application/json

{
  "description": "Dinner",
  "amount": 1000,
  "paid_by_name": "John",
  "split_method": "EQUAL",
  "participants": ["John", "Alice", "Bob"]
}
```

#### List All Expenses
```http
GET /expenses
```

#### Delete Expense
```http
DELETE /expenses/:id
```

### Balances

#### Get All Balances
```http
GET /balances
```

### Settlements

#### Get Settlement Transactions
```http
GET /settlements
```



## 🔗 Useful Links

- [Frontend Repository](https://github.com/username/equipay-frontend)
- [Backend Repository](https://github.com/username/equipay-backend)


- Built with ❤️ by [Sarthak](https://github.com/codedthoughts)
