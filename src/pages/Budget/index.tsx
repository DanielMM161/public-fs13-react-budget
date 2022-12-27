import React, { useEffect, useState } from "react";
import './index.css';
import BudgetList from "../../components/BudgetList";
import ExtraInfo from "../../components/ExtraInfo";
import Saving from "../../components/Saving";
import Dialog from "../../components/Dialog";
import Budget from "../../components/Forms/Budget";
import Savings from "../../components/Forms/Savings";
import { IInputsValue } from "../../interfaces/InputsValue";
import { IBudget } from "../../interfaces/Budget";
import { FORM } from "../../utils/constants";
import Balance from "../../components/Balance";
import Transfer from "../../components/Forms/Transfer";

export interface IUserBudget {
    incomes: IBudget[]
    expenses: IBudget[]
}

const BudgetPage = () => {

    const [incomes, setIncomes] = useState<IBudget[]>([])
    const [expenses, setExpenses] = useState<IBudget[]>([])
    const [target, setTarget] = useState(0)
    const [transfer, setTransfer] = useState(0)
    const [currentSaving, setCurrentSaving] = useState(0)
    const [balance, setBalance] = useState(0)
    const [showDialog, setShowDialog] = useState({
        titleDialog: "",
        form: FORM.NONE
    })

    useEffect(() => {
        
    }, []);
    
    function totalIncomes(): number {
        return incomes.reduce((a, v) => a + v.amount, 0)
    }
    
    function totalExpenses(): number {
        return expenses.reduce((a, v) => a + v.amount, 0)
    }
    
    function getBalance(): number {
        return totalIncomes() - totalExpenses() - currentSaving
    }

    function handleSetShowDialog(formType: number, title: string) {
        setShowDialog({
            titleDialog: title,
            form: formType
        })
    }
    
    function deleteMovement(
        id: number,
        movement: IBudget[],
        setState: React.Dispatch<React.SetStateAction<IBudget[]>>
    ) {       
        movement.splice(id, 1)
        setState([...movement])    
    }
    
    function submitForm(value: IInputsValue) { 
        const budget: IBudget = {
            source: value.source ?? "",
            amount: value.amount ?? 0,
            date: value.date ?? ""
        }
        if (showDialog.form === FORM.INCOMES) {
            setIncomes([...incomes, budget])
            
        } else if (showDialog.form === FORM.EXPENSES) {
            setExpenses([...expenses, budget])
            setBalance(getBalance())
            
        } else if (showDialog.form === FORM.TARGET) {
            setTarget(value.target ?? 0)
            
        } else if (showDialog.form === FORM.TRANSFER_SAVINGS) {
            const transfer = (value.valueTransfer ?? 0)
            const newBalance = balance - transfer
            setBalance(newBalance)
            setCurrentSaving(currentSaving + transfer)
            
        } else if (showDialog.form === FORM.TRANSFER_BALANCE) {
            if ((value.valueTransfer ?? 0) < currentSaving) {
                const newsaving = currentSaving - (value.valueTransfer ?? 0)
                setCurrentSaving(newsaving)
                setBalance(balance + newsaving)
            }
        }
            
        // Close Dialog
        handleSetShowDialog(FORM.NONE,"")   
    }
    
    return (
        <React.Fragment>
            
            <div className="budget-container">
                {/* // Aqui va los incomes y cuando los incomes esten calculados aparece savings al lado en el mismo container */}
                <BudgetList
                    title="Incomes"
                    budgets={incomes}
                    onClick={() => setShowDialog({titleDialog: "Incomes", form:FORM.INCOMES})}
                    deleteItem={(id?: number) => deleteMovement(id ?? 0, incomes, setIncomes)}
                >
                    <div className="container-info">
                        <Saving
                            currentSaving={currentSaving}
                            target={target}
                            setTargetClick={() => setShowDialog({titleDialog: "Target",form: FORM.TARGET})}
                            transferClick={() => setShowDialog({titleDialog: "Transfer to Savings", form: FORM.TRANSFER_SAVINGS})}
                            resetTargetClick={() => setTarget(0)}
                        />
                        <ExtraInfo
                            title="Total Incomes"
                            amount={totalIncomes()}
                        />
                    </div>
                </BudgetList>
                
                {/* Expenses con su total expense calculado */}
                <BudgetList
                    title="Expenses"
                    onClick={() => setShowDialog({titleDialog: "Expenses", form: FORM.EXPENSES})}
                    budgets={expenses}
                    deleteItem={(id?: number) => deleteMovement(id ?? 0, expenses, setExpenses)}
                >
                    <div className="container-info">
                        <ExtraInfo
                            title="Total Expenses"
                            amount={totalExpenses()}
                        />
                    </div>
                </BudgetList>
                
                <Balance
                    balance={getBalance()}
                    transferFromBalance={() =>
                        {
                            setShowDialog({titleDialog: "Transfer to Balance", form: FORM.TRANSFER_BALANCE})
                        }
                    }
                />
            </div>
            {(showDialog.form === FORM.INCOMES) || (showDialog.form === FORM.EXPENSES) ? 
                <Dialog
                    title={showDialog.titleDialog}
                    closeDialog={() => setShowDialog({ titleDialog: "", form: FORM.NONE })}
                >
                    <Budget
                        label={showDialog.titleDialog}
                        submitForm={(value) => { submitForm(value) }}
                    />
                </Dialog>
            : ''}
            
            {(showDialog.form === FORM.TARGET) ? 
                <Dialog
                    title={showDialog.titleDialog}
                    closeDialog={() => setShowDialog({ titleDialog: "", form: FORM.NONE })}
                >
                    <Savings
                        label={showDialog.titleDialog}
                        submitForm={(value) => { submitForm(value) }}
                    />
                </Dialog>
            : ''}
            
            {(showDialog.form === FORM.TRANSFER_BALANCE) || (showDialog.form === FORM.TRANSFER_SAVINGS) ? 
                <Dialog
                    title={showDialog.titleDialog}
                    closeDialog={() => setShowDialog({ titleDialog: "", form: FORM.NONE })}
                >
                    <Transfer submitForm={(value) => { submitForm(value)}}/>
                </Dialog>
            : ''}
        </React.Fragment>
    )
}

export default BudgetPage;