import React, { useState } from "react"
import BudgetList from "../../components/BudgetList"
import { Budget } from "../../interfaces/Budget"
import { UserBudget } from "../../types/UserBudget"
import './index.css'


const BudgetPage = () => {
    
    const [userBudget, setUserBudget] = useState<UserBudget>({
        expenses: 0,
        incomes: 0,
        savings: 0
    })
    
    function getBalance(): number {
        return userBudget.incomes - userBudget.expenses + userBudget.savings
    }
    
    function addIncomes() {
        console.log("soy incomes");
        
    }
    
    function addExpenses() {
        console.log("soy expenses");
        
    }
    
    const mockBudges: Budget[] = [
        {
            date: "12-12-2022",
            source: "Prueba1",
            amount: 200
        },
        {
            date: "12-12-2022",
            source: "Prueba1",
            amount: 200
        },
        {
            date: "12-12-2022",
            source: "Prueba1",
            amount: 200
        },
        {
            date: "12-12-2022",
            source: "Prueba1",
            amount: 200
        },
                {
            date: "12-12-2022",
            source: "Prueba1",
            amount: 200
        },
        {
            date: "12-12-2022",
            source: "Prueba1",
            amount: 200
        },
        {
            date: "12-12-2022",
            source: "Prueba1",
            amount: 200
        },
        {
            date: "12-12-2022",
            source: "Prueba1",
            amount: 200
        }
    ]
  
    return (
        <React.Fragment>
            <div className="budget-container">
                {/* // Aqui va los incomes y cuando los incomes esten calculados aparece savings al lado en el mismo container */}
                <BudgetList title="Incomes" onclick={addIncomes} budges={mockBudges} /> 
                
                {/* Expenses con su total expense calculado */}
                <BudgetList title="Expenses" onclick={addExpenses} budges={mockBudges} /> 
            </div>
            
        </React.Fragment>
    )
}

export default BudgetPage
