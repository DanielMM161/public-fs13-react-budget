import './index.css'

interface ISaving {
    currentSaving: number
    target: number
    transferClick: () => void
    setTargetClick: () => void
    resetTargetClick: () => void
}

const Saving = ({
    currentSaving,
    target,
    transferClick,
    setTargetClick,
    resetTargetClick
}: ISaving) => {
    
    return (
        <div className='saving-container'>
            <div className='current-saving'>
                <h3>Current Savings:</h3>
                <h4>${currentSaving}</h4>
            </div>
            <div className='target'>
                <h3>Target: {target}</h3>
                <button className='btn-transfer' onClick={resetTargetClick}>Reset</button>
            </div>
            <button className='btn-transfer' onClick={transferClick}>Transfer to saving</button>
            <button className='btn-transfer' onClick={setTargetClick}>Add Target</button>
        </div>
    )
}

export default Saving