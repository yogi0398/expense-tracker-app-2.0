const express = require('express');
const Expense = require('../models/Expense');
const xlsx = require('xlsx');

//Add expense
exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try{
        const {icon, category, amount, date} = req.body;

        //validation check for missing fields
        if(!category || !amount || !date){
            return req.status(400).json({message: "All fields are required"});
        }

        const newExpense = await Expense({
            userid : userId,
            icon,
            category, 
            amount,
            date : new Date(date)
        })

        await newExpense.save();
        return res.json(newExpense);
    }
    catch(err){
        return res.status(500).json({message: "Internal server error", error: err.message});
    }
};


//Get all expenses
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;

    try{
        const expense = await Expense.find({userid: userId}).sort({"date" : -1});
        res.json(expense);
    }
    catch(err){
        return res.status(500).json({message: "Internal server error", error: err.message});
    }
};


//Delete expense
exports.deleteExpense = async (req, res) => {
    try{
        const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
        return res.json({deletedExpense, message: "Expense deleted successfully"});
    }
    catch(err){
        return res.status(500).json({message: "Internal server error", error: err.message});
    }
};

//Download expense Excel file
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    try{
        const expense = await Expense.find({userid: userId}).sort({date : -1});

        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        xlsx.writeFile(wb, "expense1_details.xlsx");
        res.download("expense_details.xlsx");
    }
    catch(err){
        return res.status(500).json({message: "Internal server error", error: err.message});
    }
};

