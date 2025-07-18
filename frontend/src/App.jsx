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
            </header>
            <main>
                <div className="main-content">
                    <div className="left-panel">
                        <ExpenseForm onExpenseAdded={refreshData} />
                        <BalanceSummary balances={balances} />
                        <SettlementSummary settlements={settlements} />
                    </div>
                    <div className="right-panel">
                        <ExpenseList expenses={expenses} loading={loading} error={error} />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;