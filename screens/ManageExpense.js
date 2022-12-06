import { useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import IconButton from '../components/UI/IconButton';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { GlobalStyles } from '../constants/style';
import { ExpensesContext } from '../store/expenses-context';
import { deleteExpense, storeExpense, updateExpense } from '../util/http';

function ManageExpense({ navigation, route }) {
    const [error, setError] = useState()
    const [isFetching, setIsFetching] = useState(false)
    const expensesCtx = useContext(ExpensesContext)
    const editedExpenseId = route.params?.expenseId
    const isEditing = !!editedExpenseId

    const selectedExpense = expensesCtx.expenses.find(
        (expense) => expense.id === editedExpenseId
    )

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        })
    }, [navigation, isEditing])

    async function deleteExpenseHandler() {
        setIsFetching(true)
        try{
            await deleteExpense(editedExpenseId)
            expensesCtx.deleteExpense(editedExpenseId)
            navigation.goBack()
        } catch (error) {
            setError('Could not delete expense - please try again later')
            setIsFetching(false)
        }
    }

    function cancelHandler() {
        navigation.goBack()
    }

    async function confirmHandler( expenseData ) {
        setIsFetching(true)
        try{
            if(editedExpenseId) {
                await updateExpense(editedExpenseId, expenseData)
                expensesCtx.updateExpense(editedExpenseId, expenseData)
            } else {
               const id = await storeExpense(expenseData)
                expensesCtx.addExpense({...expenseData, id: id})
            }
            navigation.goBack()
        } catch(error) {
            setError('Could not save expense - please try again later')
            setIsFetching(false)
        }
    }

    if(isFetching) {
        return <LoadingOverlay />
    }

    if(error && !isFetching) {
        return <ErrorOverlay message={error}/>
    } 

    return (
        <View style={styles.container}>
            <ExpenseForm 
                cancelHandler={cancelHandler}
                submitButtonLabel={isEditing ? 'Update' : 'Add'}
                onSubmit={confirmHandler}
                defaultValues={selectedExpense} 
            />
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton 
                        name='trash' 
                        size={36} 
                        color={GlobalStyles.colors.error500}
                        onPress={deleteExpenseHandler} />
                </View>
            )}
        </View>
    )
}

export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
})
