import mongoose from 'mongoose';
const { Schema } = mongoose;

// sub-schema
const SplitSchema = new Schema({
    user: 
    {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    amountOwed: 
    {
        type: Number, 
        required: true 
    },
}, 
{_id: false});

const ExpenseSchema = new Schema({
    description: 
    {
        type: String,
        required: [true, 'Description is required.'],
    },
    amount: 
    {
        type: Number,
        required: [true, 'Amount is required.'],
        min: [0.01, 'Amount must be positive.']
    },
    paid_by: 
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    split_method: 
    {
        type: String,
        enum: ['EQUAL', 'EXACT', 'PERCENTAGE'],
        required: true,
    },
    splits: 
    {
        type: [SplitSchema], 
    },  
    date: 
    {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Expense', ExpenseSchema);