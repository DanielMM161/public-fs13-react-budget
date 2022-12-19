import { Budget } from "../../interfaces/Budget"
import './index.css'


const BudgetItem = ({
    amount,
    source,
    date
 }: Budget) => {
    
    return (
        <div className="budget-item">
            <div className="budget-item-amount">
                <p>${amount}</p>
                 <p>{source}</p>
            </div>
            <p>{date}</p>
        </div>
    )
}

export default BudgetItem