import React from 'react';

// Receive the onEdit and onDelete props from App.jsx
const ExpenseList = ({ expenses, loading, error, onEdit, onDelete }) => {
    if (loading) return <p>Loading expenses...</p>;
    if (error) return <p className="error-message">Error: {error}</p>;

    return (
        <div className="card full-height">
            <h2>Expense History</h2>
            {expenses && expenses.length > 0 ? (
                <ul className="expense-list">
                    {expenses.map((exp) => (
                        <li key={exp._id}>
                            <div className="expense-details">
                                <div className="expense-item-header">
                                    <strong>{exp.description}</strong>
                                    <span>₹{exp.amount.toFixed(2)}</span>
                                </div>
                                <div className="expense-item-footer">
                                    <small>Paid by {exp.paid_by.name} on {new Date(exp.date).toLocaleDateString()}</small>
                                </div>
                            </div>
                            <div className="expense-actions">
                                <button className="edit-btn" onClick={() => onEdit(exp)}>
                                    Edit
                                </button>
                                <button 
                                    className="delete-btn" 
                                    onClick={() => {
                                        if (window.confirm('Are you sure you want to delete this expense?')) {
                                            onDelete(exp._id);
                                        }
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No expenses recorded yet.</p>
            )}
        </div>
    );
};

export default ExpenseList;