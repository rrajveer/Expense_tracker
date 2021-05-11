import React,{ createContext, useReducer} from 'react'
import contextReducer from './contextReducer'

const initialState = JSON.parse(localStorage.getItem('transactions')) || [{ "amount":700 ,"category":"Salary","date":"2020-10-09","type":"Income","id": "4cdcebb1-a182-4d7e-ab33-935fee334295"}];

export const ExpenseTrackerContext = createContext(initialState) 
export const Provider = ({children}) => {
    const[transactions, dispatch] = useReducer(contextReducer,initialState)

    // console.log(transactions)
    const deleteTransaction = (id) => {
        console.log(id)
        dispatch({type:"DELETE", payload:id} )
    }
    const addTransaction = (transaction) => {
        dispatch({type:"ADD", payload:transaction} )
    }

    const balance = transactions.reduce((acc,currVal) =>{
        return (currVal.type === "Expense" ? acc-currVal.amount : acc + currVal.amount)
    },0)
    return (
        <ExpenseTrackerContext.Provider value={{ balance,addTransaction, deleteTransaction, transactions}}>
            {children}
        </ExpenseTrackerContext.Provider>
    )
}


