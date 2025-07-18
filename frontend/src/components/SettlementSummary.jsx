import React from 'react';

const SettlementSummary = ({ settlements }) => {
    return (
        <div className="card">
            <h2>Settlements</h2>
            {settlements.length > 0 ? (
                <ul>
                    {settlements.map((s, index) => (
                        <li key={index}>
                            {s.from} owes {s.to} <span>₹{s.amount.toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>All debts are settled!</p>
            )}
        </div>
    );
};

export default SettlementSummary;