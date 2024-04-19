import axios from "axios"
import { CreateBookSchema } from "../lib/definitions"

export const fetchToken = () => {
    return localStorage.getItem('token')
}

export async function addBook(state: any, formData: any) {
    const token = fetchToken()
    const fields = {
        title: formData.get('title'),
        author: formData.get('author'),
        completed: formData.get('completed') === 'on' ? true : false
    }
    console.log('fields.completed', fields.completed);
    
    const validateFields = CreateBookSchema.safeParse(fields)

    if(!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors
        }
    }

    try{
        const response = await axios.post('http://localhost:3001/books', fields, {
            'headers': { 'Authorization': `Bearer ${token}` }
        })
        console.log("success", response.data)
    } catch(e){
        return {
            message: "Invalid Credentials"
        }
    }

}


export async function updateBook(state: any, formData: any) {
    const token = fetchToken()
    const fields = {
        title: formData.get('title'),
        author: formData.get('author'),
        completed: formData.get('completed') === 'on' ? true : false
    }
    console.log('fields.completed', fields);
    
    const validateFields = CreateBookSchema.safeParse(fields)

    if(!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors
        }
    }

    try{
        const response = await axios.patch(`http://localhost:3001/books/${formData.get('id')}`, fields, {
            'headers': { 'Authorization': `Bearer ${token}` }
        })
        console.log("success", response.data)
    } catch(e){
        return {
            message: "Invalid Credentials"
        }
    }

}

export async function getBooks() {
    const token = fetchToken()
    try{
        const response = await axios.get('http://localhost:3001/books', {
            'headers': { 'Authorization': `Bearer ${token}` }
        })
        console.log("success", response.data)
        return response.data
    } catch(e){
        console.log({error: e});
        return []
    }
}

export async function getBook(id: any) {
    console.log("id", id);
    
    const token = fetchToken()
    try{
        const response = await axios.get(`http://localhost:3001/books/${id}`, {
            'headers': { 'Authorization': `Bearer ${token}` }
        })
        console.log("success", response.data)
        return response.data
    } catch(e){
        console.log({error: e});
        return []
    }
}

export async function deleteBook(id: String) {
    const token = fetchToken()
    try{
        await axios.delete(`http://localhost:3001/books/${id}`, {
            'headers': { 'Authorization': `Bearer ${token}` }
        })

        const data = await getBooks()
        return data
    } catch(e){
        console.log({error: e});
        return {
            message: "Something went wrong"
        }
    }
}