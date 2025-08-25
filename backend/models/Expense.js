const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
    userid: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    icon: {type: String},
    category: {type: String, required: true}, //Example food, rent, groceries
    amount: {type: Number, required: true},
    date: {type: Date, default: Date.now},
    },
    {timestamps: true}
);

module.exports = mongoose.model("Expense", ExpenseSchema);