import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];
//when to write things over here?
const FinanceOverview = ({totalBalance, totalIncome, totalExpense, theme}) => {

    const balanceData = [
        {name: "Total Balance", amount: totalBalance},
        {name: "Total Expense", amount: totalExpense},
        {name: "Total Income", amount: totalIncome},
    ];
    //And when to write things over here?
  return (
    <div className={`${theme == "dark" ? "card-dark" : "card"}`}>
        <div className="flex items-center justify-between">
            <h5 className={`text-lg ${theme == "dark" ? "text-white" : ""}`}>Financial Overview</h5>
        </div>

        <CustomPieChart 
            data = {balanceData}
            label = "Total Balance"
            totalAmount = {`$${totalBalance}`}
            colors = {COLORS}
            showTextAnchor
            theme = {theme}
        />
    </div>
  )
}

export default FinanceOverview;