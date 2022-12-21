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

export interface IUserBudget {
    incomes: IBudget[]
    expenses: IBudget[]
    savings: number
}

const BudgetPage = () => {

    const [userBudget, setUserBudget] = useState<IUserBudget>({
        incomes: [{ date: "", source: "", amount: 0}],
        expenses: [{ date: "", source: "", amount: 0}],
        savings: 0
    })
    const [showDialog, setShowDialog] = useState({
        titleDialog: "",
        form: FORM.NONE
    })
    const [target, setTarget] = useState(0)
    const [inputsValue, setInputsValue] = useState({})
    
    useEffect(() => {

    }, []);

    
    function getBalance(): number {
        return 0
       // return userBudget.incomes - userBudget.expenses + userBudget.savings
    }

    function handleSetShowDialog(formType: number, title: string) {
        setShowDialog({
            titleDialog: title,
            form: formType
        })
    }
    
    function submitForm(event: IInputsValue) { 
        const budget: IBudget = {
            source: event.source ?? "",
            amount: event.amount ?? 0,
            date: event.date ?? ""
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
            
        } else if (showDialog.form === FORM.TARGET) {
             setTarget(event.target ?? 0)
        } else if (showDialog.form === FORM.TRANSFER) {
            
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
                            currentSaving={0}
                            target={target}
                            setTargetClick={() => handleSetShowDialog(FORM.TARGET, "Target")}
                            transferClick={() => handleSetShowDialog(FORM.TRANSFER, "Transfer")}
                        />
                        <ExtraInfo
                            title="Total Incomes"
                            amount={userBudget.incomes.reduce((a, v) => a + v.amount, 0)}
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
                            amount={userBudget.expenses.reduce((a, v) => a + v.amount, 0)}
                        />
                    </div>
                </BudgetList>
            </div>
            {(showDialog.form === FORM.INCOMES) || (showDialog.form === FORM.EXPENSES) ? 
                <Dialog title={showDialog.titleDialog} closeDialog={() => handleSetShowDialog(FORM.NONE, "")}>
                    {/** TODO: Form Incomes */}
                    <Budget label={showDialog.titleDialog} submitForm={(value) => {submitForm(value)}}/>
                </Dialog>
            : ''}
            
            {(showDialog.form === FORM.TARGET) || (showDialog.form === FORM.TRANSFER) ? 
                <Dialog title={showDialog.titleDialog} closeDialog={() => handleSetShowDialog(FORM.NONE, "")}>
                    {/** TODO: Form Incomes */}
                    <Savings label={showDialog.titleDialog} submitForm={(value) => { submitForm(value)}}/>
                </Dialog>
            : ''}
        </React.Fragment>
    )
}

export default BudgetPage;