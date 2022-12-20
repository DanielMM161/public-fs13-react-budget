import './index.css'

interface SavingProps {
    currentSaving: number
    target: number
    transferClick: () => void
    setTarget: () => void
}

const Saving = ({
    currentSaving,
    target,
    transferClick,
    setTarget
}: SavingProps) => {
    
    
    return (
        <div className='saving-container'>
            <div className='current-saving'>
                <h3>Current Savings:</h3>
                <h4>${currentSaving}</h4>
            </div>
            <div className='target'>Target: {target}</div>
            <button className='btn-transfer' onClick={transferClick}>Transfer to saving accounts</button>
            <button className='btn-transfer' onClick={setTarget}>Add Target</button>
        </div>
    )

}

export default Saving