import './index.css'

interface IBalance {
    balance: number
    transferFromBalance: () => void
}

const Balance = ({
    balance,
    transferFromBalance
}: IBalance) => {
    
    return (
        <div className='balance-container card'>
            <h3>Current Balance</h3>
            <p>${balance}</p>
            
            <button className="button" onClick={transferFromBalance}>Transfer to Balance</button>
        </div>
    )
}

export default Balance