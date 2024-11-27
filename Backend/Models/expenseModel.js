const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
    description: { type: String },
    amount: { type: Number},
    category:{ type: String},
    user_id:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    createdAt: {
        type: Date,
        default: Date.now // Automatically set the current date/time
    }
});

module.exports = mongoose.model('expense', ExpenseSchema);