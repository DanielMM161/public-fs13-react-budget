import React, { useEffect, useState } from "react"
import BudgetList from "../../components/BudgetList"
import Dialog from "../../components/Dialog"
import ExtraInfo from "../../components/ExtraInfo"
import Saving from "../../components/Saving"
import Usebudget from "../../hooks/UseBudget"
import { Budget } from "../../interfaces/Budget"
import { ItemImput } from "../../interfaces/ItemInput"
import { UserBudget } from "../../types/UserBudget"
import './index.css'

const BudgetPage = () => {

    const {userBudget, setUserBudget} = Usebudget()
    const [showDialog, setShowDialog] = useState({
        show: false,
        title: "Incomes",
    })
    
    useEffect(() => {

    }, []);

    
    function getBalance(): number {
        return 0
       // return userBudget.incomes - userBudget.expenses + userBudget.savings
    }
    
    function addIncomes() {
        setShowDialog({
            ...showDialog,
            show: !showDialog.show,
            title: 'Incomes'
        })
    }
    
    function addExpenses() {
        setShowDialog({
            ...showDialog,
            show: !showDialog.show,
            title: 'Expenses'
        })
    }
    
    function setTarget() {
            setShowDialog({
            ...showDialog,
            show: !showDialog.show,
            title: 'Savings'
        })
    }
    
    function makeTransfer() {
    
    }
    
    function submitForm(event: any) {                
        event.preventDefault()        
        const source = event.target[1].value
        const amount = Number(event.target[2].value)
        const date = event.target[3].value
        const budget: Budget = {
            source: source,
            amount: amount,
            date: date
        }
        if (showDialog.title === "Incomes") {            
            setUserBudget({
                ...userBudget,
                incomes:  [...userBudget.incomes, budget]
            })
        }
        if (showDialog.title === "Expenses") {
            setUserBudget({
                ...userBudget,
                expenses: [...userBudget.expenses, budget]
            })
        }
        closeDialog()   
    }
    
    function closeDialog() {
        setShowDialog({
            ...showDialog,
            show: !showDialog.show
        }) 
    }
    
    function test() {
        console.log("hey");
        
    }
    
    const amount = userBudget.incomes.reduce((a, v) => a + v.amount, 0)
    
    return (
        <React.Fragment>
            
            <div className="budget-container">
                {/* // Aqui va los incomes y cuando los incomes esten calculados aparece savings al lado en el mismo container */}
                <BudgetList
                    title="Incomes"
                    budgets={userBudget.incomes}
                    onclick={addIncomes}
                    children={
                        <div className="container-info">
                            <Saving currentSaving={0} target={0} setTarget={setTarget} transferClick={makeTransfer} />
                            <ExtraInfo title="Total Incomes" amount={userBudget.incomes.reduce((a, v) => a + v.amount, 0)}/>
                        </div>
                    } />
                
                {/* Expenses con su total expense calculado */}
                <BudgetList
                    title="Expenses"
                    onclick={addExpenses}
                    budgets={userBudget.expenses}
                    children={
                        <div className="container-info">
                            <ExtraInfo
                                title="Total Expenses"
                                amount={userBudget.expenses.reduce((a, v) => a + v.amount, 0)}
                            />
                        </div>
           
                    }
                />
            </div>
            {
                showDialog.show &&
                    (
                        <Dialog
                            title={showDialog.title}
                            closeDialog={closeDialog}
                            submitForm={submitForm} />
                    )
            }
        </React.Fragment>
    )
}

export default BudgetPage
