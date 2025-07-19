import { useState, useEffect } from 'react';
import { fetchExpenses, fetchBalances, fetchSettlements } from './services/api';
import ExpenseForm from './components/ExpenseForm';
import BalanceSummary from './components/BalanceSummary';
import SettlementSummary from './components/SettlementSummary';
import ExpenseList from './components/ExpenseList';

function App() {
    const [expenses, setExpenses] = useState([]);
    const [balances, setBalances] = useState([]);
    const [settlements, setSettlements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null); 

    const handleOpenAddModal = () => {
        setEditingExpense(null); 
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (expense) => {
        setEditingExpense(expense); 
        setIsModalOpen(true);
    };

    const handleOperationComplete = () => {
        setIsModalOpen(false);
        setEditingExpense(null); 
        refreshData();
    };

    const refreshData = async () => {
        try {
            setLoading(true);
            const [expensesRes, balancesRes, settlementsRes] = await Promise.all([
                fetchExpenses(),
                fetchBalances(),
                fetchSettlements(),
            ]);
            setExpenses(expensesRes.data || []);
            setBalances(balancesRes.data || []);
            setSettlements(settlementsRes.data || []);
            setError(null);
        } catch (err) {
            setError(err.message);
            setExpenses([]);
            setBalances([]);
            setSettlements([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshData();
    }, []);

    return (
        <div className="app-container">
            <header>
                <h1>Expense Splitter</h1>
                <button className="add-expense-btn" onClick={handleOpenAddModal}>
                    + Add Expense
                </button>
            </header>

            {isModalOpen && (
                <ExpenseForm
                    onClose={() => setIsModalOpen(false)}
                    onComplete={handleOperationComplete}
                    existingExpense={editingExpense}
                />
            )}

            <main>
                <div className="main-content">
                    <div className="left-panel">
                        <BalanceSummary balances={balances} />
                        <SettlementSummary settlements={settlements} />
                    </div>
                    <div className="right-panel">
                        <ExpenseList 
                            expenses={expenses} 
                            loading={loading} 
                            error={error} 
                            onEdit={handleOpenEditModal}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;