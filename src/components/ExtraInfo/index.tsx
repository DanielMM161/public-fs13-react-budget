import { InfoAmount } from "../../interfaces/InfoAmount"
import './index.css'

const ExtraInfo = ({
    title,
    amount
}: InfoAmount) => {
    
    return (
        <div className="extra-info">
            <h3>{title}</h3>
            <h4>Amount: ${amount}</h4>
        </div>
    )
}

export default ExtraInfo