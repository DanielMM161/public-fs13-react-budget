import React, { FormEventHandler, useState } from 'react'
import { IInputsValue } from '../../interfaces/InputsValue'
import './index.css'

const Savings = ({ label, submitForm}: { label: string, submitForm: (value: IInputsValue) => void }) => {
    
    const [target, setTarget] = useState("")

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (submitForm) {
            const values: IInputsValue = {
                target: Number(target),
            }
            submitForm(values);
        }
    }
    
    return (
        <form className="Form" onSubmit={onSubmit}>                           
            <label className='label'>{label} Source</label>
            <input
                value={target}
                onChange={(event) => setTarget(event.target.value)}
                className='input'
                type="number"
                required
            />           
            <button type='submit' >Add Expenses</button>
        </form>
    )
}

export default Savings