import { View, StyleSheet, Text } from 'react-native';
import { GlobalStyles } from '../../constants/style';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary'

function ExpensesOutput({ expenses, expensesPeriod, fallbackText }) {

    let content = <Text style={styles.fallbackText}>{fallbackText}</Text>

    if(expenses.length) {
        content = <ExpensesList expenses={expenses} />
    }
    return (
        <View style={styles.container}>
            <ExpensesSummary
                expenses={expenses}
                periodName={expensesPeriod}
            />
            {content}
        </View>
    )
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingBottom: 0,
        paddingTop: 24,
        backgroundColor: GlobalStyles.colors.primary700
    },
    fallbackText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        marginTop: 32
    }
})