import './index.css'

interface IInfoAmount {
    title: string
    amount: number
}

const ExtraInfo = ({
    title,
    amount
}: IInfoAmount) => {
    
    return (
        <div className="extra-info">
            <h3>{title}</h3>
            <h4>Amount: ${amount}</h4>
        </div>
    )
}

export default ExtraInfo