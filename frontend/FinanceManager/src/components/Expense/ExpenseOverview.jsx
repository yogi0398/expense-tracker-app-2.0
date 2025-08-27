import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu';
import { prepareExpenseLineChartData } from '../../Utils/helper';
import CustomLineChart from '../Charts/CustomLineChart';

const ExpenseOverview = ({ transactions, onAddExpense, theme }) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseLineChartData(transactions);
        setChartData(result);

        return () => { }
    }, [transactions]);

    return (
        <div className={`${theme === "dark" ? "card-dark" : "card"}`}>
            <div className="flex items-center justify-between">
                <div className="">
                    <h5 className={`text-lg ${theme == "dark" ? "text-white" : ""}`}>Expense Overview</h5>
                    <p className="text-xs text-gray-400 mt-0.5">Track your spending trends over time and gain insights into where your money goes.</p>
                </div>

                <button className={`${theme === "dark" ? "add-btn-dark" : "add-btn"}`} onClick={onAddExpense}>
                    <LuPlus className='text-lg' />
                    Add Expense
                </button>
            </div>

            <div className="mt-10">
                <CustomLineChart 
                    data = {chartData}
                    theme = {theme}
                />
            </div>
        </div>
    )
}

export default ExpenseOverview