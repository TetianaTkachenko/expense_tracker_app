import { useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native'
import { GlobalStyles } from '../../constants/style';
import { getFormattedDate } from '../../util/date';
import Button from '../UI/Button';
import Input from './Input'

function ExpenseForm({ cancelHandler, submitButtonLabel, onSubmit, defaultValues }) {
    const [inputs, setInput] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : '',
            isValid: true
        },
        description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true
        }
    })

    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInput((currentInput) => {
            return {
                ...currentInput,
                [inputIdentifier]: {value: enteredValue, isValid: true}
            }
        })
    }
    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        }
        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date'
        const descriptionIsValid = expenseData.description.trim().length > 0

        if( !amountIsValid || !dateIsValid || !descriptionIsValid) {
            setInput((currentInput) => {
                return {
                    amount: {
                        value: currentInput.amount.value,
                        isValid: amountIsValid
                    },
                    date: {
                        value: currentInput.date.value, 
                        isValid: dateIsValid
                    },
                    description: {
                        value: currentInput.description.value, 
                        isValid: descriptionIsValid
                    }
                }
            })
            return
        }
        onSubmit(expenseData)
    }

    const formIsInvalid = 
        !inputs.amount.isValid ||
        !inputs.date.isValid ||
        !inputs.description.isValid

    return (
        <View style={styles.form}>
            <Text style={styles.title}>
                Your expense
            </Text>
            <View style={styles.inputsRow}>
                <Input
                    style={styles.inputRow} 
                    label='Amount'
                    invalid={!inputs.amount.isValid} 
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: inputChangeHandler.bind(this, 'amount'),
                        value: inputs.amount.value
                    }} 
                />
                <Input
                    style={styles.inputRow} 
                    label='Date' 
                    invalid={!inputs.date.isValid} 
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText: inputChangeHandler.bind(this, 'date'),
                        value: inputs.date.value
                    }} 
                />
            </View>
            <Input 
                label='Description'
                invalid={!inputs.description.isValid}  
                textInputConfig={{
                    multiline: true,
                    onChangeText: inputChangeHandler.bind(this, 'description'),
                    value: inputs.description.value
                }}
            />
            {formIsInvalid && (
                <Text style={styles.invalidText}>
                    Invalid inputs values -  please check you entered data!
                </Text>
            )}
            <View style={styles.buttonContainer}>
                <Button 
                    style={styles.button} 
                    mode='flat' 
                    onPress={cancelHandler}
                >
                    Cancel
                </Button>
                <Button 
                    style={styles.button} 
                    onPress={submitHandler}
                >
                        {submitButtonLabel}
                </Button>
           </View>
        </View>
        
    )
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 40
    },
    title: {
        fontSize: 24,
        color: 'white',
        marginHorizontal: 24,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    inputRow: {
        flex: 1
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    invalidText: {
        color:  GlobalStyles.colors.error500,
        textAlign: 'center',
        margin: 12
    }
})