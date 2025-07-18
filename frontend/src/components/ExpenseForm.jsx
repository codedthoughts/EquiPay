import { useState } from 'react';
import { addExpense } from '../services/api';

const ExpenseForm = ({ onExpenseAdded }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [paidBy, setPaidBy] = useState('');
    const [splitMethod, setSplitMethod] = useState('EQUAL');
    const [participants, setParticipants] = useState(''); // Comma-separated names
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!description || !amount || !paidBy || !participants) {
            setError('All fields are required.');
            return;
        }

        const expenseData = {
            description,
            amount: parseFloat(amount),
            paid_by_name: paidBy.trim(),
            split_method: splitMethod,
            // The backend expects an array of names for EQUAL split
            participants: participants.split(',').map(name => name.trim()),
            // Note: For a real app, you'd add inputs for EXACT and PERCENTAGE
            // and construct the `splits` array accordingly.
        };

        try {
            await addExpense(expenseData);
            setSuccess('Expense added successfully!');
            // Reset form
            setDescription('');
            setAmount('');
            setPaidBy('');
            setParticipants('');
            // Refresh data in the parent component
            onExpenseAdded();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="card">
            <h2>Add New Expense</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Paid by (Name)"
                    value={paidBy}
                    onChange={(e) => setPaidBy(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Participants (comma-separated names)"
                    value={participants}
                    onChange={(e) => setParticipants(e.target.value)}
                    required
                />
                {/* Simplified for EQUAL split. A full implementation would change the UI based on splitMethod */}
                <button type="submit">Add Expense</button>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </form>
        </div>
    );
};

export default ExpenseForm;