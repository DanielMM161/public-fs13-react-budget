import React from "react"
import { Budget } from "../../interfaces/Budget"
import './index.css'


const BudgetItem = (props: Budget) => {
    
    return (
        <div className="budget-item">
            <div className="budget-item-amount">
                <p>{props.amount}</p>
                 <p>{props.source}</p>
            </div>
            <p>{props.date}</p>
        </div>
    )
}

export default BudgetItem