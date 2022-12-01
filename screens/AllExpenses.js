import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';

function AllExpenses() {
    const ExpensesCtx = useContext(ExpensesContext)
    return (
        <ExpensesOutput 
            expenses={ExpensesCtx.expenses} 
            expensesPeriod='Total' 
            fallbackText="No registered expenses found!" 
        />
    )
}

export default AllExpenses;

const styles = StyleSheet.create({})