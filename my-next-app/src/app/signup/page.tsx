'use client'

import { signup } from '@/app/actions/auth'
import { useFormState } from 'react-dom'

export default function SignupForm() {
    const [state, action] = useFormState(signup, undefined)
    return (
        <form action={action} className='flex flex-col gap-3'>
            <div className='flex flex-col gap-1'>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" placeholder="Name" />
            </div>
            {state?.errors?.name && <p className="text-red-500 text-sm">{state.errors.name}</p>}
            <div className='flex flex-col gap-1'>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="Email" />
            </div>
            {state?.errors?.email && <p className="text-red-500 text-sm">{state.errors.email}</p>}
            <div className='flex flex-col gap-1'>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" />
            </div>
            {state?.errors?.password && <p className="text-red-500 text-sm">{state.errors.password}</p>}
            <button className='mt-4 bg-indigo-600 text-white' type="submit">Sign Up</button>
        </form>
    )
}