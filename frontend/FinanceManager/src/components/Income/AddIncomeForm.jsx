import React, { useState } from 'react'
import Input from '../Inputs/Input';
import EmojiPickerPopup from '../EmojiPickerPopup';

const AddIncomeForm = ({onAddIncome, theme}) => {

    const [income, setIncome] = useState({
        source: "",
        amount: "",
        date: "",
        icon: "",
    });

    const handleChange = (key, value) => setIncome({...income, [key]: value});
  return (
    <div className="">

        <EmojiPickerPopup 
            icon={income.icon}
            onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            theme = {theme}
        />
        <Input 
            value = {income.source}
            onChange={({target}) => handleChange("source", target.value)}
            label="Income Source"
            placholder="Freelance, Salary, Stock Profit etc"
            type="text"
            theme={theme}
        />

        <Input 
            value = {income.amount}
            onChange={({target}) => handleChange("amount", target.value)}
            label="Amount"
            placholder=""
            type="number"
            theme={theme}
        />

        <Input 
            value = {income.date}
            onChange={({target}) => handleChange("date", target.value)}
            label="Date"
            placholder=""
            type="date"
            theme={theme}
        />

        <div className="flex justify-end mt-6">
            <button
                type="button"
                className={`${theme === "dark" ? "add-btn-dark": "add-btn add-btn-fill"}`}
                onClick={() => onAddIncome(income)}
            >
                Add Income
            </button>
        </div>
    </div>
  )
}

export default AddIncomeForm