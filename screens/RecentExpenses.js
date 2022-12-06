import { useEffect, useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { getExpense } from '../util/http';

function RacentExpenses() {
    const expensesCtx = useContext(ExpensesContext)
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState()

    useEffect(() => {
       async function fetchExpenses() {
           try {
                setIsFetching(true)
               const expenses = await getExpense()
               expensesCtx.setExpenses(expenses)
            } catch (error) {
                setError('Could not fetch expenses!')
            }
            setIsFetching(false)
        }

        fetchExpenses()
    }, [])

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date()
        const date7daysAgo = getDateMinusDays(today, 7)
        return (expense.date >= date7daysAgo) && (expense.date <= today)
    })

    if(isFetching) {
        return <LoadingOverlay />
    }

    if(error && !isFetching) {
        return <ErrorOverlay message={error} />
    }

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