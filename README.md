# EquiPay - Expense Splitting Application

A fullstack application designed to help groups of people split expenses fairly and calculate settlements. This project handles common scenarios like splitting dinner costs, utility bills, or travel expenses with multiple participants.

## Table of Contents
- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [API Documentation](#api-documentation)
- [Settlement Algorithm](#settlement-algorithm)
- [Known Limitations & Assumptions](#known-limitations--assumptions)

## 🌟 Live Demo

- **Frontend Application**: [https://equi-36h03n4rh-saarthaks-projects-9c9bdb2b.vercel.app/](https://equi-36h03n4rh-saarthaks-projects-9c9bdb2b.vercel.app/)
- **Backend API**: [https://equipay-production.up.railway.app/api](https://equipay-production.up.railway.app/api)
- Gist Link : [Link](https://gist.github.com/codedthoughts/a509a39ba1c4f38be901c11458044c00)
- Postman Collection : [Link](https://techwaala-4837.postman.co/workspace/Sarthak's-Assignment~1f53a90b-e2c1-4389-848b-cb46f6c61015/collection/42342101-2eb0e9fe-0739-4fe7-8450-d2155005e3ae?action=share&creator=42342101&active-environment=42342101-d1c64f60-4dcd-4641-8da9-d8053faca06f)

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

## 🔄 Settlement Algorithm

EquiPay uses an efficient algorithm to calculate and settle expenses with the minimum number of transactions. Here's how it works:

### Step 1: Calculate Net Balances
1. The system iterates through all expenses in the database
2. For each expense:
   - Credits the user who paid (`paid_by`) with the full expense amount
   - Debits each participant for their specific share (`amountOwed`)
3. This results in a final net balance for every user:
   - Positive balance: User is a creditor (paid more than they owed)
   - Negative balance: User is a debtor (owed more than they paid)

### Step 2: Simplify Transactions
1. Users are separated into two lists:
   - Creditors (positive balances)
   - Debtors (negative balances)
2. While there are both debtors and creditors:
   - Take the first debtor and first creditor
   - Calculate the settlement amount as the minimum of:
     - Creditor's positive balance
     - Absolute value of debtor's negative balance
   - Create a transaction (e.g., "Person A pays Person B $X")
   - Update both balances by the settlement amount
   - If a user's balance becomes zero, remove them from their list
3. The process continues until all debts are settled with the minimum number of transactions

This algorithm ensures that the number of transactions is minimized, making it efficient for groups of any size.

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



## ⚠️ Known Limitations & Assumptions

### Single Group
- The current implementation assumes a single, global group of users
- All expenses are added to one shared pool
- *Future Enhancement*: Add a Group model to separate expenses (e.g., "Roommates," "Trip to Goa")

### Currency
- Supports only a single default currency (INR)
- No multi-currency support implemented
- All monetary values are treated in the same currency unit

### Authentication
- Users are identified by unique names only
- No login system or authentication implemented
- Anyone can add expenses on behalf of others

### Technical Considerations
- Uses JavaScript's native floating-point arithmetic
- Values are rounded to 2 decimal places for display
- For financial applications requiring absolute precision, consider using `Decimal.js`

### Feature Limitations
- Supports adding and deleting expenses
- Editing existing expenses is not implemented
- No transaction history or audit logging
- No receipt/image attachment support

## 🔗 Useful Links

- [Frontend Repository](https://github.com/username/equipay-frontend)
- [Backend Repository](https://github.com/username/equipay-backend)

- Built with ❤️ by [Sarthak](https://github.com/codedthoughts)
