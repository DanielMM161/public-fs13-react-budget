import React from "react"
import { IBudget } from "../../interfaces/Budget"
import BudgetItem from "../BudgetItem"
import './index.css'

interface IBudgetList {
    title: string,
    budgets: IBudget[],
    onclick: () => void,
    children?: React.ReactNode
}

const BudgetList = ({
    title = "",
    budgets = [],
    onclick,
    children
}: IBudgetList) => {
    
   // const amount = budges.reduce((acumulator, value) => acumulator + value.amount, 0)
        
    return (
        <section className="container">
            <div className="container-list">
                <div className="section-title">
                    <h3>{title}</h3>
                    <button onClick={() => onclick()}>Click me</button>
                </div>
                
                <div className="section-list">
                    {
                        budgets.map((budge, index) => <BudgetItem key={index} {...budge} />)
                    }
                </div>
            </div>
            {children}
        </section>
    )
}

export default BudgetList