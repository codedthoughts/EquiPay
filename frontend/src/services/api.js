
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api' || 'https://equipay-production.up.railway.app/api';

const handleResponse = async (response) => {
    if (!response.ok) 
    {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
    }
    return response.json();
};

export const fetchExpenses = async () => {
    const response = await fetch(`${API_BASE_URL}/expenses`);
    return handleResponse(response);
};

export const fetchBalances = async () => {
    const response = await fetch(`${API_BASE_URL}/balances`);
    return handleResponse(response);
};

export const fetchSettlements = async () => {
    const response = await fetch(`${API_BASE_URL}/settlements`);
    return handleResponse(response);
};

export const addExpense = async (expenseData) => {
    const response = await fetch(`${API_BASE_URL}/expenses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(expenseData),
    });
    return handleResponse(response);
};

export const updateExpense = async (id, expenseData) => {
    const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(expenseData),
    });
    return handleResponse(response);
};

export const deleteExpense = async (id) => {
    const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
        method: 'DELETE',
    });
    return handleResponse(response);
};