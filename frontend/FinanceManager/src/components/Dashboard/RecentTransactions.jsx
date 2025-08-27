import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import moment from 'moment'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
const RecentTransactions = ({transactions, onSeeMore, theme}) => {

  return (
    <div className={`${theme == "dark" ? "card-dark" : "card"}`}>
        <div className="flex items-center justify-between">
            <h5 className={`text-lg ${theme == "dark" ? "text-white" : ""}`}>Recent Transactions</h5>
            <button className={`${theme === "dark" ? "card-btn-dark" : "card-btn"}`} onClick={onSeeMore}>
                See All <LuArrowRight className='text-base' />
            </button>
        </div>

        <div className="mt-6">
            {transactions?.slice(0,4)?.map((item) => {
                 return <TransactionInfoCard
                    key = {item._id}
                    title = {item.type === 'Expense' ? item.category : item.source}
                    icon = {item.icons}
                    date = {moment(item.date).format("Do MMM YYYY")}
                    amount = {item.amount}
                    type = {item.type}
                    hideDeleteBtn
                    theme = {theme}
                />
            })}
        </div>
    </div>
  )
}

export default RecentTransactions