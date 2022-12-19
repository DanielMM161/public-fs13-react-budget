import React from "react"
import { BudgetListProps } from "../../interfaces/BudgetListProps"
import BudgetItem from "../BudgetItem"
import './index.css'

const BudgetList = ({ title = "", budges = [], onclick}: BudgetListProps) => {
        
    return (
        <section className="container">
            <section className="section-title">
                <h3>{title}</h3>
                <button onClick={() => onclick()}>Click me</button>
            </section>
            
            <section className="section-list">
                {
                    budges.map((budge) => <BudgetItem {...budge} />)
                }
            </section>
        </section>
    )
}

export default BudgetList