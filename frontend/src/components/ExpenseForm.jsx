import { useState, useEffect } from 'react';
import { addExpense, updateExpense } from '../services/api';
import './ExpenseForm.css';

const ExpenseForm = ({ onClose, onComplete, existingExpense }) => {
    const isEditMode = Boolean(existingExpense);

    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [paidBy, setPaidBy] = useState('');
    const [splitMethod, setSplitMethod] = useState('EQUAL');
    const [participants, setParticipants] = useState('');
    const [splits, setSplits] = useState([{ name: '', value: '' }]);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    // Pre-fill form if in edit mode
    useEffect(() => {
        if (isEditMode && existingExpense) {
            setDescription(existingExpense.description);
            setAmount(existingExpense.amount.toString());
            setPaidBy(existingExpense.paid_by.name);
            setSplitMethod(existingExpense.split_method);

            if (existingExpense.split_method === 'EQUAL') {
                setParticipants(existingExpense.splits.map(s => s.user.name).join(', '));
            } else {
                setSplits(existingExpense.splits.map(s => ({
                    name: s.user.name,
                    value: (existingExpense.split_method === 'EXACT' ? s.amountOwed : (s.amountOwed / existingExpense.amount * 100)).toString()
                })));
            }
        }
    }, [existingExpense, isEditMode]);

    const handleSplitChange = (index, field, value) => {
        const newSplits = [...splits];
        newSplits[index][field] = value;
        setSplits(newSplits);
    };

    const addSplitRow = () => {
        setSplits([...splits, { name: '', value: '' }]);
    };

    const removeSplitRow = (index) => {
        const newSplits = splits.filter((_, i) => i !== index);
        setSplits(newSplits);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        
        if (!description || !amount || !paidBy) {
            setError('Please fill in all general expense details.');
            return;
        }

        let expenseData = {
            description,
            amount: parseFloat(amount),
            paid_by_name: paidBy.trim(),
            split_method: splitMethod,
        };

        try {
            if (splitMethod === 'EQUAL') {
                if (!participants) {
                    setError('Please provide a comma-separated list of participants.');
                    return;
                }
                expenseData.participants = participants.split(',').map(name => name.trim()).filter(Boolean);
            } else {
                const finalSplits = splits.map(s => ({
                    name: s.name.trim(),
                    [splitMethod === 'EXACT' ? 'amount' : 'percentage']: parseFloat(s.value)
                })).filter(s => s.name && !isNaN(s[splitMethod === 'EXACT' ? 'amount' : 'percentage']));

                if (finalSplits.length === 0) {
                    setError('Please define at least one valid split.');
                    return;
                }
                expenseData.splits = finalSplits;
            }

            setSubmitting(true);
            if (isEditMode) {
                await updateExpense(existingExpense._id, expenseData);
            } else {
                await addExpense(expenseData);
            }
            onComplete();
        } catch (err) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <h2>{isEditMode ? 'Edit Expense' : 'Add New Expense'}</h2>
                    
                    <div className="form-group">
                        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </div>
                    <div className="form-group form-group-inline">
                        <input type="number" placeholder="Amount (₹)" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                        <input type="text" placeholder="Paid by" value={paidBy} onChange={(e) => setPaidBy(e.target.value)} required />
                    </div>

                    <div className="form-group split-method-selector">
                        <span>Split Method:</span>
                        <button type="button" className={splitMethod === 'EQUAL' ? 'active' : ''} onClick={() => setSplitMethod('EQUAL')}>Equal</button>
                        <button type="button" className={splitMethod === 'EXACT' ? 'active' : ''} onClick={() => setSplitMethod('EXACT')}>Exact</button>
                        <button type="button" className={splitMethod === 'PERCENTAGE' ? 'active' : ''} onClick={() => setSplitMethod('PERCENTAGE')}>Percentage</button>
                    </div>

                    {splitMethod === 'EQUAL' && (
                        <div className="form-group">
                            <input type="text" placeholder="Participants (e.g., Alice, Bob, Charlie)" value={participants} onChange={(e) => setParticipants(e.target.value)} required />
                        </div>
                    )}

                    {(splitMethod === 'EXACT' || splitMethod === 'PERCENTAGE') && (
                        <div className="splits-container">
                            {splits.map((split, index) => (
                                <div key={index} className="split-row">
                                    <input type="text" placeholder="Name" value={split.name} onChange={(e) => handleSplitChange(index, 'name', e.target.value)} required />
                                    <input type="number" placeholder={splitMethod === 'EXACT' ? 'Amount (₹)' : 'Percent (%)'} value={split.value} onChange={(e) => handleSplitChange(index, 'value', e.target.value)} required />
                                    {splits.length > 1 && <button type="button" className="remove-row-btn" onClick={() => removeSplitRow(index)}>×</button>}
                                </div>
                            ))}
                            <button type="button" className="add-row-btn" onClick={addSplitRow}>+ Add Person</button>
                        </div>
                    )}
                    
                    {error && <p className="error-message">{error}</p>}
                    
                    <div className="form-actions">
                        <button type="button" className="cancel-btn" onClick={onClose} disabled={submitting}>Cancel</button>
                        <button type="submit" className="submit-btn" disabled={submitting}>
                            {submitting ? 'Saving...' : (isEditMode ? 'Save Changes' : 'Add Expense')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ExpenseForm;