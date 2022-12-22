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

    const [userBudget, setUserBudget] = useState<IUserBudget>({
        incomes: [],
        expenses: []
    })
    const [showDialog, setShowDialog] = useState({
        titleDialog: "",
        form: FORM.NONE
    })
    const [target, setTarget] = useState(0)
    const [transfer, setTransfer] = useState(0)
    const [currentSaving, setCurrentSaving] = useState(0)
    const [balance, setBalance] = useState(0)
    const [inputsValue, setInputsValue] = useState({})
    
    useEffect(() => {
       
    }, []);
    
    function totalIncomes(): number {
        return userBudget.incomes.reduce((a, v) => a + v.amount, 0)
    }
    
    function totalExpenses(): number {
        return userBudget.expenses.reduce((a, v) => a + v.amount, 0)
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
    
    function submitForm(value: IInputsValue) { 
        const budget: IBudget = {
            source: value.source ?? "",
            amount: value.amount ?? 0,
            date: value.date ?? ""
        }
        if (showDialog.form === FORM.INCOMES) {
            setUserBudget({
                ...userBudget,
                incomes:  [...userBudget.incomes, budget]
            })
            
        } else if (showDialog.form === FORM.EXPENSES) {
            setUserBudget({
                ...userBudget,
                expenses: [...userBudget.expenses, budget]
            })
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
                    budgets={userBudget.incomes}
                    onclick={() => handleSetShowDialog(FORM.INCOMES,  "Incomes")}
                >
                    <div className="container-info">
                        <Saving
                            currentSaving={currentSaving}
                            target={target}
                            setTargetClick={() => handleSetShowDialog(FORM.TARGET, "Target")}
                            transferClick={() => handleSetShowDialog(FORM.TRANSFER_SAVINGS, "Transfer to Savings")}
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
                    onclick={() => handleSetShowDialog(FORM.EXPENSES, "Expenses")}
                    budgets={userBudget.expenses}
                >
                    <div className="container-info">
                        <ExtraInfo
                            title="Total Expenses"
                            amount={totalExpenses()}
                        />
                    </div>
                </BudgetList>
                
                <Balance balance={getBalance()} transferFromBalance={() => { handleSetShowDialog(FORM.TRANSFER_BALANCE, "Transfer to Balance")}} />
            </div>
            {(showDialog.form === FORM.INCOMES) || (showDialog.form === FORM.EXPENSES) ? 
                <Dialog title={showDialog.titleDialog} closeDialog={() => handleSetShowDialog(FORM.NONE, "")}>
                    {/** TODO: Form Incomes */}
                    <Budget label={showDialog.titleDialog} submitForm={(value) => {submitForm(value)}}/>
                </Dialog>
            : ''}
            
            {(showDialog.form === FORM.TARGET) ? 
                <Dialog title={showDialog.titleDialog} closeDialog={() => handleSetShowDialog(FORM.NONE, "")}>
                    {/** TODO: Form Incomes */}
                    <Savings label={showDialog.titleDialog} submitForm={(value) => { submitForm(value)}}/>
                </Dialog>
            : ''}
            
            {(showDialog.form === FORM.TRANSFER_BALANCE) || (showDialog.form === FORM.TRANSFER_SAVINGS) ? 
                <Dialog title={showDialog.titleDialog} closeDialog={() => handleSetShowDialog(FORM.NONE, "")}>
                    {/** TODO: Form Incomes */}
                    <Transfer submitForm={(value) => { submitForm(value)}}/>
                </Dialog>
            : ''}
        </React.Fragment>
    )
}

export default BudgetPage;