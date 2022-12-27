import { IBudgetAction } from "./BudgetAction"

export interface IBudget extends IBudgetAction {
    date: string
    source: string
    amount: number
}