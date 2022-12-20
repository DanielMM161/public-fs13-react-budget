import { BudgetListProps } from "../../interfaces/BudgetListProps"
import BudgetItem from "../BudgetItem"
import ExtraInfo from "../ExtraInfo"
import './index.css'

const BudgetList = ({
    title = "",
    budges = [],
    onclick,
    extraInfo = ""
}: BudgetListProps) => {
        
    return (
        <section className="container">
            <div className="container-list">
                <div className="section-title">
                    <h3>{title}</h3>
                    <button onClick={() => onclick()}>Click me</button>
                </div>
                
                <div className="section-list">
                    {
                        budges.map((budge, index) => <BudgetItem key={index} {...budge} />)
                    }
                </div>
            </div>
            
            <ExtraInfo title={extraInfo} amount={300}/>
        </section>
    )
}

export default BudgetList