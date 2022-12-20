import React, { useState } from "react"
import BudgetList from "../../components/BudgetList"
import Dialog from "../../components/Dialog"
import { BudgetType } from "../../enum/BudgetType"
import { Budget } from "../../interfaces/Budget"
import { ItemImput } from "../../interfaces/ItemInput"
import { UserBudget } from "../../types/UserBudget"
import './index.css'

const BudgetPage = () => {
    
    const [userBudget, setUserBudget] = useState<UserBudget>({
        incomes: [{ date: "", source: "", amount: 0}],
        expenses: [{ date: "", source: "", amount: 0}],
        savings: 0
    })
    const [showDialog, setShowDialog] = useState({
        show: false,
        title: "Incomes",
    })

    
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
    
    function submitForm(event: any) {                
        event.preventDefault()        
        const source = event.target[1].value
        const amount = event.target[2].value
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
        if (showDialog.title === "Savings") {

        }
        setShowDialog({
            ...showDialog,
            show: !showDialog.show
        })    
    }
    
    return (
        <React.Fragment>
            
            <div className="budget-container">
                {/* // Aqui va los incomes y cuando los incomes esten calculados aparece savings al lado en el mismo container */}
                <BudgetList
                    title="Incomes"
                    onclick={addIncomes}
                    budges={userBudget.incomes}
                    extraInfo={BudgetType.Incomes}
                /> 
                
                {/* Expenses con su total expense calculado */}
                <BudgetList
                    title="Expenses"
                    onclick={addExpenses}
                    budges={userBudget.expenses}
                    extraInfo={BudgetType.Expenses}
                />
            </div>
            {
                showDialog.show &&
                    (
                        <Dialog
                            title={showDialog.title}
                            closeDialog={() => { }}
                            submitForm={submitForm} />
                    )
            }
        </React.Fragment>
    )
}

export default BudgetPage
