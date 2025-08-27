import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const RecentIncome = ({transactions, onSeeMore, theme}) => {
  return (
    <div className={`${theme == "dark" ? "card-dark" : "card"}`}>
        <div className="flex items-center justify-between">
            <h5 className={`text-lg ${theme == "dark" ? "text-white" : ""}`}>Income</h5>

            <button className={`${theme === "dark" ? "card-btn-dark" : "card-btn"}`} onClick={onSeeMore}>
                See All <LuArrowRight className='text-base' />
            </button>
        </div>

        <div className="mt-6">
            {transactions.slice(0,5)?.map((item) => (
                <TransactionInfoCard 
                    key = {item._id}
                    title = {item.source}
                    icon = {item.icon}
                    date = {moment(item.date).format("Do MMM YYYY")}
                    amount = {item.amount}
                    type = "Income"
                    hideDeleteBtn
                    theme={theme}
                />
            ))}
        </div>
    </div>
  );
};

export default RecentIncome