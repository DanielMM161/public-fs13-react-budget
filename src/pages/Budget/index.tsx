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
    const [currentSaving, setCurrentSaving] = useState(0)
    const [balance, setBalance] = useState(0)
    const [showDialog, setShowDialog] = useState(
        {
            titleDialog: "",
            form: FORM.NONE
        }
    )

    useEffect(() => {
        setBalance(getBalance())        
    }, []);
    
    function totalAmount(budget: IBudget[]): number {
        return budget.reduce((a, v) => a + v.amount, 0)
    }
    
    function getBalance(): number {
        return totalAmount(incomes) - totalAmount(expenses) - currentSaving
    }
    
    function deleteMovement(
        index: number,
        movement: IBudget[],
        setState: React.Dispatch<React.SetStateAction<IBudget[]>>
    ) {       
        const prevState = JSON.stringify(movement)        
        movement.splice(index, 1)
        if (getBalance() >= 0) {
            setState([...movement])
        } else {
            alert("Expenses cannot be greater than total incomes")
            setState([...JSON.parse(prevState)])
        }    
    }
    
    function submitForm(value: IInputsValue) { 
        const budget: IBudget = {
            source: value.source ?? "",
            amount: value.amount ?? 0,
            date: value.date ?? ""
        }
        if (showDialog.form === FORM.INCOMES) {
            setIncomes([...incomes, budget])
            setBalance(getBalance())
            
        } else if (showDialog.form === FORM.EXPENSES) {
            if (budget.amount > totalAmount(incomes)) {
                alert("Expenses cannot be greater than total incomes")
            } else {
                setExpenses([...expenses, budget])
                setBalance(getBalance())
            }
            
        } else if (showDialog.form === FORM.TARGET) {
            setTarget(value.target ?? 0)
            
        } else if (showDialog.form === FORM.TRANSFER_SAVINGS) {
            const transfer = (value.valueTransfer ?? 0)
            const newBalance = getBalance() - transfer
            if (newBalance >= 0) {
                setBalance(newBalance)
                setCurrentSaving(currentSaving + transfer)
            } else {
                alert("The Balance cannot be negative")
            }
            
        } else if (showDialog.form === FORM.TRANSFER_BALANCE) {
            if ((value.valueTransfer ?? 0) <= currentSaving) {
                const newsaving = currentSaving - (value.valueTransfer ?? 0)
                setCurrentSaving(newsaving)
                setBalance(balance + newsaving)
            } else {
                alert("The Balance cannot be negative")
            }
        }
            
        // Close Dialog
        setShowDialog({titleDialog: "", form: FORM.NONE})
    }
    
    return (
        <React.Fragment>
            
            <div className="budget-container">
                <BudgetList
                    title="Incomes"
                    budgets={incomes}
                    onClick={() => setShowDialog({titleDialog: "Incomes", form:FORM.INCOMES})}
                    deleteItem={(index?: number) => deleteMovement(index ?? 0, incomes, setIncomes)}
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
                            amount={totalAmount(incomes)}
                        />
                    </div>
                </BudgetList>
                
                <BudgetList
                    title="Expenses"
                    onClick={() => setShowDialog({titleDialog: "Expenses", form: FORM.EXPENSES})}
                    budgets={expenses}
                    deleteItem={(id?: number) => deleteMovement(id ?? 0, expenses, setExpenses)}
                >
                    <div className="container-info">
                        <ExtraInfo
                            title="Total Expenses"
                            amount={totalAmount(expenses)}
                        />
                    </div>
                </BudgetList>
                
                <Balance
                    balance={getBalance()}
                    transferFromBalance={() => setShowDialog({ titleDialog: "Transfer to Balance", form: FORM.TRANSFER_BALANCE }) }
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