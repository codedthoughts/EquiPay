import Expense from '../models/expense.js';
import User from '../models/user.js';

const findOrCreateUser = async (name) => {
    let user = await User.findOne({ name });

    if (!user) 
    {
        user = new User({ name });
        await user.save();
    }

    return user;
};

export const addExpense = async (req, res) => {
    try 
    {
        const { description, amount, paid_by_name, split_method, participants, splits } = req.body;

        if (!description || !amount || !paid_by_name || !split_method) 
        {
            return res.status(400).json({ success: false, message: 'Missing required fields: description, amount, paid_by_name, split_method' });
        }

        if (typeof amount !== 'number' || amount <= 0) 
        {
            return res.status(400).json({ success: false, message: 'Amount must be a positive number.' });
        }

        const payer = await findOrCreateUser(paid_by_name);

        const calculatedSplits = [];

        switch (split_method) 
        {
            case 'EQUAL':
                if (!participants || !Array.isArray(participants) || participants.length === 0) 
                {
                    return res.status(400).json({ success: false, message: 'For EQUAL split, participants array is required.' });
                }

                const participantUsers = await Promise.all(participants.map(name => findOrCreateUser(name)));

                const share = parseFloat((amount / participantUsers.length).toFixed(2));
                
                let remainder = amount - (share * participantUsers.length);

                participantUsers.forEach((user, index) => 
                {
                    let userShare = share;

                    if (index === 0 && remainder !== 0) 
                    {
                        userShare = parseFloat((share + remainder).toFixed(2));
                    }

                    calculatedSplits.push({ user: user._id, amountOwed: userShare });
                });
                break;

            case 'EXACT':
                if (!splits || !Array.isArray(splits) || splits.length === 0) 
                {
                    return res.status(400).json({ success: false, message: 'For EXACT split, splits array is required.' });
                }

                const totalSplitAmount = splits.reduce((sum, s) => sum + s.amount, 0);

                if (Math.abs(totalSplitAmount - amount) > 0.01) 
                {
                    return res.status(400).json({ success: false, message: 'Sum of exact splits must equal the total expense amount.' });
                }

                for (const split of splits) 
                {
                    const user = await findOrCreateUser(split.name);
                    calculatedSplits.push({ user: user._id, amountOwed: split.amount });
                }
                break;
                
            case 'PERCENTAGE':
                if (!splits || !Array.isArray(splits) || splits.length === 0) 
                {
                    return res.status(400).json({ success: false, message: 'For PERCENTAGE split, splits array is required.' });
                }

                const totalPercentage = splits.reduce((sum, s) => sum + s.percentage, 0);

                if (Math.abs(totalPercentage - 100) > 0.01) 
                {
                    return res.status(400).json({ success: false, message: 'Percentages must add up to 100.' });
                }

                for (const split of splits) 
                {
                    const user = await findOrCreateUser(split.name);
                    const amountOwed = parseFloat(((amount * split.percentage) / 100).toFixed(2));
                    calculatedSplits.push({ user: user._id, amountOwed });
                }
                break;
            
            default:
                return res.status(400).json({ success: false, message: 'Invalid split method provided.' });
        }

        const newExpense = new Expense({
            description,
            amount,
            paid_by: payer._id,
            split_method,
            splits: calculatedSplits,
        });

        await newExpense.save();

        const populatedExpense = await Expense.findById(newExpense._id)
            .populate('paid_by', 'name')
            .populate('splits.user', 'name');

        res.status(201).json({ success: true, data: populatedExpense, message: 'Expense added successfully.' });

    } 
    catch (error) 
    {
        res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
    }
};

export const getAllExpenses = async (req, res) => {
    try 
    {
        const expenses = await Expense.find()
            .sort({ date: -1 })
            .populate('paid_by', 'name')
            .populate('splits.user', 'name');
            
        res.status(200).json({ success: true, count: expenses.length, data: expenses });
    } 
    catch (error) 
    {
        res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
    }
};

export const getExpenseById = async (req, res) => {
    try 
    {
        const expense = await Expense.findById(req.params.id)
            .populate('paid_by', 'name')
            .populate('splits.user', 'name');

        if (!expense) 
        {
            return res.status(404).json({ success: false, message: 'Expense not found.' });
        }

        res.status(200).json({ success: true, data: expense });
    } 
    catch (error) 
    {
        res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
    }
};

export const deleteExpense = async (req, res) => {
    try 
    {
        const expense = await Expense.findById(req.params.id);

        if (!expense) 
        {
            return res.status(404).json({ success: false, message: 'Expense not found.' });
        }

        await expense.remove();

        res.status(200).json({ success: true, message: 'Expense deleted successfully.' });
    } 
    catch (error) 
    {
        res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
    }
}; 

