import { useEffect, useState } from "react"
import { UserBudget } from "../types/UserBudget"

const Usebudget = () => {
    const [userBudget, setUserBudget] = useState<UserBudget>({
        incomes: [{ date: "", source: "", amount: 0}],
        expenses: [{ date: "", source: "", amount: 0}],
        savings: 0
    })
    
    useEffect(() => {
        // Brin data from local storage
    }, [])
    
    return {userBudget, setUserBudget}
}

export default Usebudget    