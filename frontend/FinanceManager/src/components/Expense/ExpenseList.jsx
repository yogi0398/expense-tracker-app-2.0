import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const ExpenseList = ({transactions, onDelete, onDownload, theme}) => {
  return (
    <div className={`${theme === "dark" ? "card-dark" : "card"}`}>
        <div className="flex items-center justify-between">
            <h5 className={`text-lg ${theme == "dark" ? "text-white" : ""}`}>All Expenses</h5>

            <button className={`${theme === "dark" ? "card-btn-dark" : "card-btn"}`} onClick={onDownload}>
                <LuDownload className='text-base' />
                Download
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
            {transactions?.map((expense, index) => (
                <TransactionInfoCard
                    key = {expense._id}
                    title = {expense.category}
                    icon = {expense.icon}
                    date = {moment(expense.date).format("Do MMM YYYY")}
                    amount = {expense.amount}
                    type = "Expense"
                    onDelete = {() => onDelete(expense._id)}
                    theme = {theme}
                /> 
            ))}
        </div>
    </div>
  )
}

export default ExpenseList