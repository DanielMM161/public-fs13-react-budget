import React, { useState } from 'react'
import { IForm } from '../../interfaces/Form'
import { IInputsValue } from '../../interfaces/InputsValue'
import './index.css'

const Transfer = ({ submitForm }: IForm) => {
    
    const [valueTransfer, setValueTransfer] = useState("")

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (submitForm) {
            const values: IInputsValue = {
                valueTransfer: Number(valueTransfer),
            }
            submitForm(values);
        }
    }
    
    return (
        <form className="Form" onSubmit={onSubmit}>                           
            <label className='label'>Amount</label>
            <input
                value={valueTransfer}
                onChange={(event) => setValueTransfer(event.target.value)}
                className='input'
                type="number"
                required
            />           
            <button className='button' type='submit' >Accept</button>
        </form>
    )
}

export default Transfer