import './App.css'
import { useState, useEffect, useRef } from "react"
import { ExpenseContext } from "./ExpenseContext"
import { ExpenseExistContext } from "./ExpenseExistContext"

import Header from './components/Header'
import Filter from './components/Filter'
import BottomNavigation from './components/BottomNavigation'
import Modal from './components/Modal'

import einkauf from "./assets/icons/category-icons/einkauf.png"
import tshirt from "./assets/icons/category-icons/tshirt.png"
import elektronik from "./assets/icons/category-icons/elektronik.png"
import auto from "./assets/icons/category-icons/auto.png"
import freizeit from "./assets/icons/category-icons/freizeit.png"
import sonstiges from "./assets/icons/category-icons/sonstiges.png"
import drogerie from "./assets/icons/category-icons/drogerie.png"
import wiederkehrend from "./assets/icons/category-icons/wiederkehrend.png"

function App() {
  const [expenseExist, setExpenseExist] = useState(false)
  const [expenseState, setExpenseState] = useState([])
  const ref = useRef()
  const [open, setOpen] = useState(false)

  let expenses = localStorage.getItem('expenses')
  expenses = JSON.parse(expenses)

  useEffect(() =>  {
    if (expenses) {
      setExpenseExist(true)
      setExpenseState([expenses])
    }
  },[]) 

  console.log(expenseState)

  const handleSetOpen = () => {
    setOpen(!open)
    console.log(open)
  }

  const categoryIcons = [
    {name: "Einkauf", img: einkauf, color: "6B66D3"},
    {name: "Kleidung", img: tshirt, color: "224FD4"},
    {name: "Elektronik", img: elektronik, color: "38A7A8"},
    {name: "Auto", img: auto, color: "1E754A"},
    {name: "Freizeit", img: freizeit, color: "1A691C"},
    {name: "Sonstiges", img: sonstiges, color: "49852B"},
    {name: "Drogerien", img: drogerie, color: "96A32E"},
    {name: "Wiederkehrend", img: wiederkehrend, color: "B67D2A"},
  ]

  const convertTime = (timestamp) => {
    var date = new Date(timestamp);
    let newDate = ""
    
    newDate = date.getDate()+
              "."+(date.getMonth()+1)+
              "."+date.getFullYear()

    return newDate
  }

  return (
    <div className="App">
      <ExpenseContext.Provider value={[expenseState]}>
        <Modal open={open} close={handleSetOpen}></Modal>
      </ExpenseContext.Provider>
      <div className="main-wrapper--center">
        <Header headerName="Deine Ausgaben"></Header>  
        <ExpenseExistContext.Provider value={{expenseExist, setExpenseExist}}>
          <Filter></Filter>
        </ExpenseExistContext.Provider>
        <div className="expense-content">
        {
          expenseExist ?
              expenses.map(months => {
                var totalExpenses = months.expenses.reduce(function(prev, cur) {
                  return prev + parseFloat(cur.value);
                }, 0);

              return [
                <div ref={null} className="month-overview-wrapper">
                  <div className="month-name">{ months.monthName+" "+months.year }</div>
                  <div className="month_total-expenses">{ "-"+totalExpenses.toFixed(2)+"€" }</div>
                </div>,    
                  months.expenses.map(expense => {

                    let category = expense.category.toString()
                    let obj = categoryIcons.find(o => o.name === category);
                    let expenseIcon = sonstiges
                    let expenseBgColor = "5B37B1"

                    try {
                      expenseIcon = obj.img
                      expenseBgColor = obj.color
                      
                    } catch (error) {
                      expenseIcon = sonstiges
                      expenseBgColor = "5B37B1"
                    }

                    let imgPath = expenseIcon
                    return [
                      <div className="expense-wrapper">
                        <div className="expense-icon" style={{"background-color": `#${expenseBgColor}`}}>
                        <img src={imgPath}></img>
                        </div>
                        <div className="expense__row-wrapper">
                          <div className="expense__first-row">
                            <div className="expense__shop">{expense.shop}</div>
                            <div className="expense__value">{"-"+expense.value+"€"}</div>
                          </div>
                          <div className="expense__second-row">
                            <div className="expense__category">{expense.category}</div>
                            <div className="expense__date">{convertTime(expense.date)}</div>
                          </div>
                        </div>
                      </div>
                    ]
                  })
                ]
              })
              : 
              <div>Noch kein Inhalt</div>
        }
        </div>
      </div>
      <BottomNavigation setOpen={handleSetOpen}></BottomNavigation>
    </div>
  );
}

export default App;
