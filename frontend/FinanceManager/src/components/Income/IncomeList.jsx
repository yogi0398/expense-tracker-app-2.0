import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const IncomeList = ({transactions, onDelete, onDownload, theme}) => {
  return (
    <div className={`${theme === "dark" ? "card-dark" : "card"}`}>
        <div className="flex items-center justify-between">
            <h5 className={`text-lg ${theme == "dark" ? "text-white" : ""}`}>Income Sources</h5>

            <button className={`${theme === "dark" ? "card-btn-dark" : "card-btn"}`} onClick={onDownload}>
                <LuDownload className='text-base' />
                Download
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
            {transactions?.map((income) => (
                <TransactionInfoCard
                    key = {income.id}
                    title = {income.source}
                    icon = {income.icon}
                    date = {moment(income.date).format("Do MMM YYYY")}
                    amount = {income.amount}
                    type = "Income"
                    onDelete = {() => onDelete(income._id)}
                    theme = {theme}
                /> 
            ))}
        </div>
    </div>
  )
}

export default IncomeList