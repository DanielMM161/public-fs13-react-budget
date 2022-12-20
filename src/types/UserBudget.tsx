import { Budget } from "../interfaces/Budget"

export type UserBudget = {
    incomes: Budget[]
    expenses: Budget[]
    savings: number
}