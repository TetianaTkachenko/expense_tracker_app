import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';

function RacentExpenses() {
    const ExpensesCtx = useContext(ExpensesContext)

    const recentExpenses = ExpensesCtx.expenses.filter((expense) => {
        const today = new Date()
        const date7daysAgo = getDateMinusDays(today, 7)
        return (expense.date >= date7daysAgo) && (expense.date <= today)
    })
    return (
        <ExpensesOutput 
            expenses={recentExpenses} 
            expensesPeriod='Last 7 days'
            fallbackText="No expenses registhed for the last 7 days!" 
        />
    )
}

export default RacentExpenses;

const styles = StyleSheet.create({})