import { useReducer } from 'react';
import { createContext } from 'react';

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A book',
        amount: 18.59,
        date: new Date('2022-11-29')
    },
    {
        id: 'e2',
        description: 'A dress',
        amount: 50,
        date: new Date('2021-02-15')
    },
    {
        id: 'e3',
        description: 'Tickets to the cinema',
        amount: 48.59,
        date: new Date('2022-11-28')
    },
    {
        id: 'e4',
        description: 'Bananas',
        amount: 18.59,
        date: new Date('2021-10-04')
    },
    {
        id: 'e5',
        description: 'Booking a hotel',
        amount: 189.99,
        date: new Date('2022-11-25')
    },
    {
        id: 'e6',
        description: 'A dress',
        amount: 50,
        date: new Date('2021-02-15')
    },
    {
        id: 'e7',
        description: 'Tickets to the cinema',
        amount: 48.59,
        date: new Date('2022-11-01')
    },
    {
        id: 'e8',
        description: 'Bananas',
        amount: 18.59,
        date: new Date('2021-10-04')
    },
    {
        id: 'e9',
        description: 'Booking a hotel',
        amount: 189.99,
        date: new Date('2022-11-01')
    }
]

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date}) => {}
})

function expensesReducer(state, action) {
    switch(action.type) {
        case 'ADD': 
            const id = new Date().toString() + Math.random().toString()
            return [
                {...action.payload, id: id},
                ...state
            ]
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload)
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex(
                (expense) => expense.id === action.payload.id
            )
            const updatableExpense = state[updatableExpenseIndex]
            const updatedItem = {...updatableExpense, ...action.payload.data}
            const updatedExpenses = [...state]
           updatedExpenses[updatableExpenseIndex] = updatedItem
           return updatedExpenses
        default: 
            return state
    }
}

function ExpensesContextProvider({ children }) {
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES)
    
    function addExpense(expenseData) {
        dispatch({type: 'ADD', payload: expenseData})
    }

    function deleteExpense(id) {
        dispatch({type: 'DELETE', payload: id})
    }

    function updateExpense(id, expensesData) {
        dispatch({type: 'UPDATE', payload: {id: id, data: expensesData}})
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    }

    return (
        <ExpensesContext.Provider value={value}>
            {children}
        </ExpensesContext.Provider>
    )
}

export default ExpensesContextProvider;