import React from "react"
import './index.css'

interface IDialog {
    title: string
    closeDialog: () => void
    children: React.ReactNode
}

const Dialog = ({
    title,
    closeDialog,
    children
}: IDialog) => {
      
    return (
        <React.Fragment>
            <div className='modal-backdrop'></div>
            <div role="dialog" className="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>{title}</h3>
                            <button className='btn-close' aria-label='Close' onClick={closeDialog}></button>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Dialog