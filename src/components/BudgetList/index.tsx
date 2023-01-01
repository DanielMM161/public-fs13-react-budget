import React from "react"
import { IBudget } from "../../interfaces/Budget"
import { IBudgetAction } from "../../interfaces/BudgetAction"
import BudgetItem from "../BudgetItem"
import './index.css'

interface IBudgetList extends IBudgetAction {
    title: string,
    budgets: IBudget[],
    children?: React.ReactNode
}

const BudgetList = ({
    title,
    budgets,
    children,
    onClick,
    deleteItem
}: IBudgetList) => {
    
    return (
        <section className="container">
            <div className="container-list card">
                <div className="section-title">
                    <h3>{title}</h3>
                    <button className="add-icon" onClick={() => { if(onClick) onClick() }}></button>
                </div>
                <hr/>
                
                <div className="section-list">
                    {
                        budgets
                            .map((budge, index) => <BudgetItem key={index} {...budge} deleteItem={() => { deleteItem(index) }} /> )
                    }
                </div>
            </div>
            {children}
        </section>
    )
}

export default BudgetList