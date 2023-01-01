import { IBudget } from "../../interfaces/Budget"
import './index.css'


const BudgetItem = ({
    amount,
    source,
    date,
    deleteItem
}: IBudget) => {
        
    return (
        <div className="budget-item">
            <div className="budget-item-amount">
                <p className="amount">${amount}</p>
                <p className="source">{source}</p>
            </div>
            <div className="budget-item-info">
                <p>{date}</p>
                <div className="icon-content" onClick={() => { if(deleteItem) deleteItem() }}>
                    <i className="icon-trash"></i>
                </div>
            </div>
        </div>
    )
}

export default BudgetItem