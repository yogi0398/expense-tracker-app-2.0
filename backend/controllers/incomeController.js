const Income = require('../models/Income');
const User = require('../models/User');
const xlsx = require('xlsx');


//Add income source
exports.addIncome = async (req, res) => {
    const userId = req.user.id;
    // console.log(userId);

    try{
        const {icon, source, amount, date} = req.body;

        //validation check for missing fields
        if(!source || !amount || !date){
            return res.status(400).json({message: "All fields are required"});
        }

        const newIncome = new Income({
            userid: userId,
            icon,
            source,
            amount, 
            date: new Date(date)
        });

        // console.log(newIncome);
        await newIncome.save();
        res.status(200).json(newIncome);
    }
    catch(err){
        return res.status(500).json({message: "Internal server error", error: err.message});
    }
};


//Get all incomes
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;

    try{
        const income = await Income.find({userid : userId}).sort({date: -1});
        return res.json(income);
    }
    catch(err){
        return res.status(500).json({message: "Internal server error", error: err.message});
    }
};

//Delete income
exports.deleteIncome = async (req, res) => {
    
    try{
        const deletedIncome = await Income.findByIdAndDelete(req.params.id);
        return res.json({deletedIncome, message: "Income deleted successfully"});
    }
    catch(err){
        return res.status(500).json({message: "Internal server error", error: err.message});
    }
};

//Download Excel
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try{
        const income = await Income.find({userid : userId}).sort({date: -1});

        //Prepare data for Excel
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, 'income_details.xlsx');
        res.download('income_details.xlsx');
    }
    catch(err){
        res.status(500).json({message: "Internal server error", error: err.message});
    }
};