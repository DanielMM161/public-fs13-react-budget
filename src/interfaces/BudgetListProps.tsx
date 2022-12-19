import { Budget } from "./Budget";

export interface BudgetListProps {
    title: string
    budges: Budget[]
    onclick: () => void
}