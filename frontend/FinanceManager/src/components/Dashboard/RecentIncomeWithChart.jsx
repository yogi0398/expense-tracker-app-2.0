import React, { useEffect, useState } from 'react'
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f5"];

const RecentIncomeWithChart = ({ data, totalIncome, theme }) => {

    const [chartData, setChartData] = useState([]);

    const prepareChartData = () => {
        const dataArr = data?.map((item) => ({
            name: item?.source,
            amount: item?.amount,
        }));

        setChartData(dataArr);
    };

    useEffect(() => {
        prepareChartData();

        return () => { }
    }, [data]);

    return (
        <div className={`${theme == "dark" ? "card-dark" : "card"}`}>
            <div className="flex items-center justify-between">
                <h5 className={`text-lg ${theme == "dark" ? "text-white" : ""}`}>Last 60 Days Income</h5>
            </div>

            <CustomPieChart
                data={chartData}
                label="Total Income"
                totalAmount={`$${totalIncome}`}
                showTextAnchor
                colors={COLORS}
                theme = {theme}
            />
        </div>
    )
}

export default RecentIncomeWithChart