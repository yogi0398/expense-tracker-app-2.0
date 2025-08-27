import React, { useEffect, useState } from 'react'
import { prepareIncomeBarChartData } from '../../Utils/helper';
import { LuPlus } from 'react-icons/lu';
import CustomBarChart from '../Charts/CustomBarChart';

const IncomeOverview = ({ transactions, onAddIncome, theme}) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareIncomeBarChartData(transactions);
        setChartData(result);

        return () => { }
    }, [transactions]);

    return (
        <div className={`${theme == "dark" ? "card-dark" : "card"}`}>
            <div className="flex items-center justify-between">
                <div className="">
                    <h5 className={`text-lg ${theme == "dark" ? "text-white" : ""}`}>Income Overview</h5>
                    <p className="text-xs text-gray-400 mt-0.5">Track your earnings over time and analyze your income trends.</p>
                </div>

                <button className={`${theme === "dark" ? "add-btn-dark" : "add-btn"}`} onClick={onAddIncome}>
                    <LuPlus className='text-lg' />
                    Add Income
                </button>
            </div>

            <div className="mt-10 ">
                <CustomBarChart
                    data={chartData}
                    theme={theme}
                />
            </div>
        </div>
    )
}

export default IncomeOverview