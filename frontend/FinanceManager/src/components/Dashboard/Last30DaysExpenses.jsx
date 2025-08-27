import React, { useState, useEffect } from 'react'
import { prepareExpenseBarChartData } from '../../Utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';

const Last30DaysExpenses = ({data, theme}) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
      const result = prepareExpenseBarChartData(data);
        setChartData(result);
      return () => {};
    }, [data]);
    
  return (
    <div className={`${theme == "dark" ? "card-dark col-span-1" : "card col-span-1"}`}>
        <div className="flex items-center justify-between">
            <h5 className={`text-lg ${theme == "dark" ? "text-white" : ""}`}>Last 30 Days Expenses</h5>
        </div>

        <CustomBarChart data = {chartData} theme = {theme}/>
    </div>
  )
}

export default Last30DaysExpenses;