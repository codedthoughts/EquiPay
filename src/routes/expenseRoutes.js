import express from 'express';

import 
{
    addExpense,
    getAllExpenses,
    deleteExpense,
    getExpenseById
} 
from '../controllers/expenseController.js';

const router = express.Router();

router.route('/expenses')
    .post(addExpense)
    .get(getAllExpenses);

router.route('/expenses/:id')
    .delete(deleteExpense)
    .get(getExpenseById); 

export default router;  