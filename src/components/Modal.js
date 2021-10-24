import React from 'react'
import { useState, useContext } from 'react'
import ReactDOM from 'react-dom'
import { motion } from "framer-motion"
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, FilledInput, InputAdornment } from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import CalendarPicker from '@mui/lab/CalendarPicker'
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { ExpenseContext } from '../ExpenseContext'

const Modal = ({open, close}) => {

    const [date, setDate] = React.useState(new Date());
    const [category, setCategory] = useState(null);
    const [submitDate, setSubmitDate] = useState(new Date() );
    const [shopName, setShopName] = useState(null);
    const [shoppingValue, setShoppingValue] = useState(null);
    const {expenseState, setExpenseState} = useContext(ExpenseContext)

    const handleChange = (event) => {
      setCategory(event.target.value);
    };
    const handleShopNameInput = (e) => {
      setShopName(e.target.value);
    }
    const handleShoppingValueInput = (e) => {
      setShoppingValue(e.target.value);
    }

    const handleSetDate = (newDate) => {
      setDate(newDate);
      let calcDate = Date.parse(newDate)
      setSubmitDate(calcDate)
    }

    const setNewExpense = () => {
      let newSubmitDate = convertTime(submitDate)
      let splitDate = newSubmitDate.split('.')
      let splitMonth = splitDate[1]

      const data = JSON.parse(localStorage.getItem('expenses'))

      let expenseArr = data.filter(e => e.expense === "09")
      
      expenseArr.map(monthExp => (
        monthExp.expenses.push({
          "category": category,
          "shop": shopName,
          "value": shoppingValue,
          "date": date
        })
      ))
    }


    const convertTime = (date) => {
      var date = new Date(date);
      let newDate = ""
      
      newDate = date.getDate()+
                "."+(date.getMonth()+1)+
                "."+date.getFullYear()

      return newDate
    }


    const categories = [
      {name: "Einkauf", id: "1"},
      {name: "Kleidung", id: "2"},
      {name: "Elektronik", id: "3"},
      {name: "Auto", id: "4"},
      {name: "Freizeit", id: "5"},
      {name: "Sonstiges", id: "6"},
      {name: "Drogerien", id: "7"},
      {name: "Wiederkehrend", id: "8"},
    ]


    if (!open) return null;

    return ReactDOM.createPortal(
        <>
         <motion.div
          initial={{
            scale: 0.2
          }}
          animate={{
            scale: 1,
            delay: 1,
            default: { duration: 2 },
          }}
          className={open ? "modal modal--open" : "modal"}>
              <div className="modal-header">Ausgabe hinzufügen</div>
              <div onClick={close} className="modal-close__btn"></div>
              <div className="main-wrapper--center modal-within__content">
                <TextField onKeyUp={handleShopNameInput} fullWidth id="filled-basic" label="Wo hast du eingekauft?" variant="filled" 
                  InputLabelProps={{
                    style: {
                      color: "white",
                    }
                  }}
                  InputProps={
                    {
                      style: { 
                        backgroundColor: "#252525",
                        color: "#FFFFFF",
                        marginBottom: "20px"
                      }
                    }
                  }
                />
              
                <FormControl fullWidth variant="filled"
                  style={{
                    backgroundColor: "#252525",
                    color: "#FFFFFF",
                    marginBottom: "10px",
                    borderTopRightRadius: "5px",
                    borderTopLeftRadius: "5px",
                  }}
                >
                  <InputLabel
                    style={{
                      color: "#FFFFFF",
                    }}
                    id="demo-simple-select-label">Kategorie
                  </InputLabel>
                  <Select 
                    style={{
                      color: "#FFFFFF",
                    }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Age"
                    onChange={handleChange}
                  >
                    {categories.map((category) => 
                     <MenuItem value={category.id}>{category.name}</MenuItem>  
                    )}
                  </Select>
                </FormControl>

                <FormControl
                  onChange={handleShoppingValueInput} 
                  style={{
                    backgroundColor: "#252525",
                    color: "#FFFFFF",
                    marginBottom: "20px",
                    borderTopRightRadius: "5px",
                    borderTopLeftRadius: "5px",
                  }}
                fullWidth sx={{ m: 1 }} variant="filled">
                    <InputLabel style={{  
                    color: "#FFFFFF"
                  }} htmlFor="filled-adornment-amount">Wie viel Geld hast du ausgegeben?</InputLabel>
                    <FilledInput 
                      type="number"
                      style={{  
                        color: "#FFFFFF"
                      }}
                      id="filled-adornment-amount"
                      startAdornment={<InputAdornment style={{  
                        color: "#FFFFFF"
                      }} position="start">€</InputAdornment>}
                    />
                </FormControl>

                <p>Wähle ein Datum</p>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    
                    <CalendarPicker
                      date={date} style={{
                        marginBottom: "20px",
                        marginTop: "20px",
                      }} onChange={(newDate) => handleSetDate(newDate)} />
                  
                </LocalizationProvider>
                <Button onClick={setNewExpense} variant="outlined" fullWidth>Hinzufügen</Button>
              </div>
         </motion.div>
        </>,document.getElementById('modal')
    ) 
}

export default Modal;
