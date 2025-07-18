import express from 'express';
import cors from 'cors';
import connectDB from './src/config/db.js';
import dotenv from 'dotenv';

import expenseRoutes from './src/routes/expenseRoutes.js';
import settlementRoutes from './src/routes/settlementRoutes.js';

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Split App API is running!');
});

app.use('/expenses', expenseRoutes);
app.use('/settlements', settlementRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));