import './index.css'

interface ISaving {
    currentSaving: number
    target: number
    transferClick: () => void
    setTargetClick: () => void
}

const Saving = ({
    currentSaving,
    target,
    transferClick,
    setTargetClick
}: ISaving) => {
    
    return (
        <div className='saving-container'>
            <div className='current-saving'>
                <h3>Current Savings:</h3>
                <h4>${currentSaving}</h4>
            </div>
            <div className='target'>Target: {target}</div>
            <button className='btn-transfer' onClick={transferClick}>Transfer to saving accounts</button>
            <button className='btn-transfer' onClick={setTargetClick}>Add Target</button>
        </div>
    )
}

export default Saving