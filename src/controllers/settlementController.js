import Expense from '../models/expense.js';


export const getBalances = async (req, res) => {
    try 
    {
        const expenses = await Expense.find()
            .populate('paid_by', 'name')
            .populate('splits.user', 'name');

        // Calculate the net balance for each person.
        const balances = {}; // Use a simple object to store balances by name.

        for (const expense of expenses) 
        {
            const payerName = expense.paid_by.name;
            
            // Credit the person who paid the full amount.
            balances[payerName] = (balances[payerName] || 0) + expense.amount;

            for (const split of expense.splits) 
            {
                const sharerName = split.user.name;
                balances[sharerName] = (balances[sharerName] || 0) - split.amountOwed;
            }
        }

        const formattedBalances = Object.keys(balances).map(name => ({
            name: name,
            balance: parseFloat(balances[name].toFixed(2))
        }));

        res.status(200).json({ success: true, data: formattedBalances });
    } 
    catch (error) 
    {
        res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
    }
};

export const getSettlements = async (req, res) => {
    try 
    {
        const expenses = await Expense.find()
            .populate('paid_by', 'name')
            .populate('splits.user', 'name');

        const balances = {};

        for (const expense of expenses) 
        {
            const payerName = expense.paid_by.name;
            balances[payerName] = (balances[payerName] || 0) + expense.amount;
            for (const split of expense.splits) 
            {
                const sharerName = split.user.name;
                balances[sharerName] = (balances[sharerName] || 0) - split.amountOwed;
            }
        }

        const debtors = [];
        const creditors = [];

        for (const name in balances) 
        {
            const balance = balances[name];
            if (balance < 0) 
            {
                debtors.push({ name, amount: balance }); // amount is negative
            } 
            else if (balance > 0) 
            {
                creditors.push({ name, amount: balance }); // amount is positive
            }
        }
        
        // Sort to handle smallest amounts first, though any order works for the algorithm.
        debtors.sort((a, b) => a.amount - b.amount); // Most negative first
        creditors.sort((a, b) => a.amount - b.amount); // Least positive first

        // Step 3: Create the list of transactions needed to settle up.
        const settlements = [];

        // Loop until either all debts are paid or all credits are received.
        while (debtors.length > 0 && creditors.length > 0) 
        {
            const debtor = debtors[0];
            const creditor = creditors[0];

            // The amount to be transferred is the smaller of the two amounts.
            const amountToSettle = Math.min(Math.abs(debtor.amount), creditor.amount);

            settlements.push({
                from: debtor.name,
                to: creditor.name,
                amount: parseFloat(amountToSettle.toFixed(2)),
            });

            // Update the balances of the two people involved.
            debtor.amount += amountToSettle;
            creditor.amount -= amountToSettle;

            if (Math.abs(debtor.amount) < 0.01)     
            {
                debtors.shift(); 
            }
            if (Math.abs(creditor.amount) < 0.01) 
            {
                creditors.shift(); 
            }
        }

        res.status(200).json({ success: true, data: settlements });

    } 
    catch (error) 
    {
        res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
    }
};