import { SignupFormSchema, LoginFormSchema, FormState } from "../lib/definitions";
import axios from "axios";
import { setToken } from "./session";
import { redirect } from "next/navigation";

export async function signup(state: FormState, formData: FormData) {
    const fiels = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password')
    }
    const validateFields = SignupFormSchema.safeParse(fiels)

    if(!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors
        }
    }

    try{
        const response = await axios.post('http://localhost:3001/users', fiels)
        console.log("success", response.data)
        setToken(response.data.token)

        redirect('/')

    } catch(e){
        console.error(e); 
    }

}

export async function login(state: FormState, formData: FormData) {
    const fiels = {
        email: formData.get('email'),
        password: formData.get('password')
    }
    const validateFields = LoginFormSchema.safeParse(fiels)

    if(!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors
        }
    }

    try{
        const response = await axios.post('http://localhost:3001/users/login', fiels)
        console.log("success", response.data)
        setToken(response.data.token)

        redirect('/')

    } catch(e){
        return {
            message: "Invalid Credentials"
        }
        console.error(e); 
    }

}