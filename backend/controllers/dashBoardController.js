const Expense = require('../models/Expense');
const Income = require('../models/Income');
const User = require('../models/User');
const {isValidObjectId, Types} = require("mongoose");


//Dashboard Data
exports.getDashboardData = async (req, res) => {
    try{
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        //Fetch total income and expenses
        const totalIncome = await Income.aggregate([
            {$match: {userid: userObjectId}},
            {$group: {_id: null, total: {$sum: "$amount"}}},
        ]);

        console.log("totalIncome", {totalIncome, userId: isValidObjectId(userId)});

        const totalExpense = await Expense.aggregate([
            {$match: {userid: userObjectId}},
            {$group: {_id: null, total: {$sum: "$amount"}}},
        ]);

        //Get income transactions in the last 60 days
        const last60DaysIncomeTransactions = await Income.find({
            userid: userId,
            date: {$gte: new Date(Date.now() - 60*24*60*60*1000)},
        }).sort({date: -1});

        //Get total income for last 60 days
        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount, 
            0
        );

        //Get expense transactions in the last 30 days
        const last30DaysExpenseTransactions = await Expense.find({
            userid: userId,
            date: {$gte: new Date(Date.now() - 30*24*60*60*1000)},
        }).sort({date: -1});

        //Get total expenses for last 30 days
        const expenseLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, transaction) => sum = transaction.amount,
            0
        );

        //Fetch last 5 transactions (income + expenses)
        const lastTransactions = [
            ...(await Income.find({userid : userId}).sort({date: -1}).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "Income",
                })
            ),
            ...(await Expense.find({userid: userId}).sort({date: -1}).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "Expense",
                })
            ),
        ].sort((a, b) => b.date - a.date); //Sort latest first


        //Final respose

        res.json({
            totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpenses: totalExpense[0]?.total || 0,
            last30DaysExpenses: {
                total: expenseLast30Days,
                transactions: last30DaysExpenseTransactions,
            },
            last60DaysIncome: {
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransactions,
            },
            recentTransactions: lastTransactions,
        });
    }
    catch(err){
        res.status(500).json({message: "Server Error", error: err.message});
    }
};