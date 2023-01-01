import { IBudget } from "../../interfaces/Budget"
import { IBudgetAction } from "../../interfaces/BudgetAction"
import './index.css'

interface IBudgetItem extends IBudget, IBudgetAction {}

const BudgetItem = ({
    amount,
    source,
    date,
    deleteItem
}: IBudgetItem) => {
        
    return (
        <div className="budget-item">
            <div className="budget-item-amount">
                <p className="amount">${amount}</p>
                <p className="source">{source}</p>
            </div>
            <div className="budget-item-info">
                <p>{date}</p>
                <div className="icon-content" onClick={() => { deleteItem() }}>
                    <i className="icon-trash"></i>
                </div>
            </div>
        </div>
    )
}

export default BudgetItem