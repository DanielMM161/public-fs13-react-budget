import React, { useState } from 'react'
import { IForm } from '../../interfaces/Form'
import { IInputsValue } from '../../interfaces/InputsValue'
import './index.css'

const Budget = ({
    label,
    submitForm
}: IForm) => {
    
    const [source, setSource] = useState("")
    const [amount, setAmount] = useState("")
    const [date, setDate] = useState("")

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (submitForm) {
            const values: IInputsValue = {
                source,
                amount: Number(amount),
                date
            }
            submitForm(values);
        }
    }
    
    return (
        <form className="Form" onSubmit={onSubmit}>                           
            <label className='label'>{label} Source</label>
            <input
                value={source}
                onChange={(event) => setSource(event.target.value)}
                className='input'
                type="text"
                required
            /> 
            
            <label className='label'>{label} Amount</label>
            <input
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                className='input'
                type="number"
                required
            /> 
            
            <label className='label'>{label} Date</label>
            <input
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className='input'
                type="date"
                required
            />                     
            <button  className="button" type='submit' >Add {label}</button>
        </form>
    )
}

export default Budget