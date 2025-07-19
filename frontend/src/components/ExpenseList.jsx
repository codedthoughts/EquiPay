import React from 'react';

const ExpenseList = ({ expenses, loading, error }) => {
    if (loading) return <div className="card full-height"><p>Loading expenses...</p></div>;
    if (error) return <div className="card full-height"><p className="error-message">Error fetching data: {error}</p></div>;

    return (
        <div className="card full-height">
            <h2>Expense History</h2>
            {expenses && expenses.length > 0 ? (
                <ul className="expense-list">
                    {expenses.map((exp) => (
                        <li key={exp._id}>
                            <div className="expense-item-header">
                                <strong>{exp.description}</strong>
                                <span>₹{exp.amount.toFixed(2)}</span>
                            </div>
                            <div className="expense-item-footer">
                                <small>Paid by {exp.paid_by.name} on {new Date(exp.date).toLocaleDateString()}</small>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No expenses recorded yet. Click "+ Add Expense" to start.</p>
            )}
        </div>
    );
};

export default ExpenseList;