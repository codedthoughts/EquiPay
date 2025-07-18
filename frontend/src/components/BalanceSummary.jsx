import React from 'react';

const BalanceSummary = ({ balances }) => {
    return (
        <div className="card">
            <h2>Balances</h2>
            {balances.length > 0 ? (
                <ul>
                    {balances.map(({ name, balance }) => (
                        <li key={name} className={balance > 0 ? 'positive' : 'negative'}>
                            {name}: <span>{balance.toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No balances to show yet.</p>
            )}
        </div>
    );
};

export default BalanceSummary;