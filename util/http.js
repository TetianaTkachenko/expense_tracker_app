import axios from 'axios';

const BASE_URL = 'https://react-native-course-9199f-default-rtdb.firebaseio.com'

export async function storeExpense(expenseData) {
    const response = await axios.post(BASE_URL + '/expenses.json', expenseData)
    const id = response.data.name
    return id
}

export async function getExpense() {
   const { data } = await axios.get(BASE_URL + '/expenses.json')

   const expenses = []

   for (const key in data) {
       const expenseObj = {
           id: key,
           amount: data[key]?.amount,
           date: new Date(data[key]?.date),
           description: data[key]?.description
       }
       expenses.push(expenseObj)
   }

   return expenses
}

export function updateExpense(id, expenseData) {
    return axios.put(BASE_URL + `/expenses/${id}.json`, expenseData)
}

export function deleteExpense(id) {
    return axios.delete(BASE_URL + `/expenses/${id}.json`)
}