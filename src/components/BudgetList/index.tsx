import React from "react"
import { Budget } from "../../interfaces/Budget"
import BudgetItem from "../BudgetItem"
import './index.css'

type BudgetListOwnProps = {
    title: string,
    budgets: Budget[],
    onclick: () => void,
    children?: React.ReactNode
}

const BudgetList = ({
    title = "",
    budgets = [],
    onclick,
    children
}: BudgetListOwnProps) => {
    
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

// const BudgetList = ({
//     title = "",
//     budges = [],
//     onclick,
//     extraInfo = ""
// }: BudgetListProps) => {
    
//     const amount = budges.reduce((acumulator, value) => acumulator + value.amount, 0)
        
//     return (
//         <section className="container">
//             <div className="container-list">
//                 <div className="section-title">
//                     <h3>{title}</h3>
//                     <button onClick={() => onclick()}>Click me</button>
//                 </div>
                
//                 <div className="section-list">
//                     {
//                         budges.map((budge, index) => <BudgetItem key={index} {...budge} />)
//                     }
//                 </div>
//             </div>
//             {
//                 title == 'Incomes' ? (
//                     <ExtraInfo title={extraInfo} amount={amount}/>
//                 ) :
//                 (
//                     <ExtraInfo title={extraInfo} amount={amount}/>
//                 )
//             }
//         </section>
//     )
// }