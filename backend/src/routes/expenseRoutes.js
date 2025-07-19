import express from 'express';

import 
{
    addExpense,
    getAllExpenses,
    deleteExpense,
    updateExpense,
    getExpenseById
} 
from '../controllers/expenseController.js';

const router = express.Router();

router.route('/expenses')
    .post(addExpense)
    .get(getAllExpenses);

router.route('/expenses/:id')
    .delete(deleteExpense)
    .put(updateExpense)
    .get(getExpenseById); 

export default router;  