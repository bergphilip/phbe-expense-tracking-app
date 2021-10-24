import React from 'react';
import { useState, useContext } from 'react'
import { ExpenseExistContext } from '../ExpenseExistContext'

const Filter = () => {
  const {expenseExist, setExpenseExist} = useContext(ExpenseExistContext)
  let expenses = localStorage.getItem('expenses')
  expenses = JSON.parse(expenses)
  
    return (
      expenseExist &&
        <div className="filter-wrapper">
            {
                expenses.map((months)=> {
                        return <div className="filter-elements">{months.monthName+" "+months.year}</div>
                    }
                )
            }
        </div>
    );
}

export default Filter;
