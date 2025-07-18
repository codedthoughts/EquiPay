# EquiPay - Expense Sharing Application

EquiPay is Fullstack solution for managing shared expenses among friends or groups. It helps track who owes what to whom and simplifies settling up.

## Features

- Create and manage expenses
- Track balances between users
- Generate settlements
- Support for different split methods (EQUAL, EXACT, PERCENTAGE)
- User management

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account or local MongoDB instance

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/codedthoughts/EquiPay.git
   cd EquiPay
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGO_URL=your_mongodb_connection_string
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   Or for production:
   ```bash
   npm start
   ```

## API Documentation

### Base URL
`http://localhost:3000`

### Users

#### Get All Users
```
GET /users
```

#### Add a New User
```
POST /users
Body: {
    "name": "John Doe"
}
```

### Expenses

#### Get All Expenses
```
GET /api/expenses
```

#### Add a New Expense
```
POST /api/expenses
Body: {
    "description": "Dinner",
    "amount": 100,
    "paid_by_name": "John",
    "split_method": "EQUAL",
    "participants": ["John", "Jane", "Bob"],
    "splits": [
        {"user": "John", "amountOwed": 33.33},
        {"user": "Jane", "amountOwed": 33.33},
        {"user": "Bob", "amountOwed": 33.34}
    ]
}
```

#### Get Expense by ID
```
GET /api/expenses/:id
```

#### Delete Expense
```
DELETE /api/expenses/:id
```

### Settlements

#### Get Balances
```
GET /api/balances
```

#### Get Settlements
```
GET /api/settlements
```

## Environment Variables

- `PORT` - Port on which the server will run (default: 3000)
- `MONGO_URL` - MongoDB connection string

## Project Structure

```
src/
  ├── config/           # Configuration files
  │   └── db.js        # Database connection
  ├── controllers/      # Route controllers
  ├── models/          # Database models
  └── routes/          # Route definitions
  └── index.js         # Application entry point
```

## Error Handling

All error responses follow this format:
```json
{
    "success": false,
    "message": "Error message"
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
