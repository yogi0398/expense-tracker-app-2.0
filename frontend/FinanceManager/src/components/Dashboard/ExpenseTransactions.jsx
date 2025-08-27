import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const ExpenseTransactions = ({transactions, onSeeMore, theme}) => {
  return (
    <div className={`${theme == "dark" ? "card-dark" : "card"}`}>
        <div className="flex items-center justify-between">
            <h5 className={`text-lg ${theme == "dark" ? "text-white" : ""}`}>Expenses</h5>
            <button className={`${theme === "dark" ? "card-btn-dark" : "card-btn"}`} onClick={onSeeMore}>
                See All <LuArrowRight className='text-base' />
            </button>
        </div>

        <div className="mt-6">
            {transactions?.slice(0,4)?.map((expense) => (
                <TransactionInfoCard 
                    key = {expense._id}
                    title = {expense.category}
                    icon = {expense.icon}
                    date = {moment(expense.date).format("Do MMM YYYY")}
                    amount = {expense.amount}
                    type = "expense"
                    hideDeleteBtn
                    theme = {theme}
                />
            ))}
        </div>
    </div>
  )
}

export default ExpenseTransactions