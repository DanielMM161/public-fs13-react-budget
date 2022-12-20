import React from 'react'
import { DialogProps } from '../../interfaces/DialogProps'
import { ItemImput } from '../../interfaces/ItemInput'
import './index.css'

const Dialog = ({
    title = "Incomes",
    closeDialog,
    submitForm
}: DialogProps) => {
    
    function setInputProps(): ItemImput[] {
        const inputsProps: ItemImput[] = []
        if (title === "Incomes") {
            inputsProps.push(
                {
                    title: "Income source",
                    typeInput: "text"          
                },
                {
                    title: "Amount of Income",
                    typeInput: "number"          
                },
                {
                    title: "Date of Income",
                    typeInput: "date"          
                }
            )
        }
        if (title === "Expenses") {
            inputsProps.push(
                {
                    title: "Expense source",
                    typeInput: "text"          
                },
                {
                    title: "Amount of Expense",
                    typeInput: "number"          
                },
                {
                    title: "Date of Expense",
                    typeInput: "date"          
                }
            )
        }
        if (title === "Savings") {
            inputsProps.push(
                {
                    title: "Set Target",
                    typeInput: "number"          
                }
            )
        }
        return inputsProps
    }
    
    return (
        <React.Fragment>
            <div className='modal-backdrop'></div>
            <div role="dialog" className="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={submitForm}>
                            <div className="modal-header">
                                <h3>{title}</h3>
                                <button className='btn-close' aria-label='Close' onClick={closeDialog}></button>
                            </div>
                            <div className="modal-body">
                                {
                                    setInputProps().map(
                                        value => {
                                            return (
                                                <div className='input-container'>
                                                    <label className='label'>{value.title}</label>
                                                    <input required className='input' type={value.typeInput}/>
                                                </div>
                                            )
                                        }
                                    )                            
                                }
                                <div className='btn-container'>
                                    <button type='submit' >Add {title}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Dialog

// const Dialog = (WrappedComponent: React.FC<{ props: DialogProps }>) => {
    
//     return ({ props }: { props: DialogProps }) => {
//         return (
//         <React.Fragment>
//             <div className='modal-backdrop'></div>
//             <div role="dialog" className="dialog">
//                 <div className="modal-dialog">
//                     <div className="modal-content">
//                         <form>
//                             <div className="modal-header">
//                                 <h3 className='modal-title'>Title</h3>
//                                 <button className='btn-close' aria-label='Close'></button>
//                             </div>
//                             <div className="modal-body">
//                                 <WrappedComponent  props={props}/>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </React.Fragment>
//         )
//     }  
// }

// export default Dialog