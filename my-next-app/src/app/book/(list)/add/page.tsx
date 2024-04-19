'use client'

import { addBook } from '@/app/actions/book'
import { useFormState } from 'react-dom'

export default function AddBookForm() {
    const [state, action] = useFormState(addBook, undefined)
    return (
        <form action={action} className='flex flex-col gap-3'>
            {state?.message && <p className="text-red-500 text-sm">{state.message}</p>}

            <div className='flex flex-col gap-1'>
                <label htmlFor="title">Book Title</label>
                <input id="title" name="title" type="title" placeholder="Book Title" />
            </div>
            {state?.errors?.title && <p className="text-red-500 text-sm">{state.errors.title}</p>}
            <div className='flex flex-col gap-1'>
                <label htmlFor="author">Author</label>
                <input id="author" name="author" type="author" placeholder="Book author" />
            </div>
            {state?.errors?.title && <p className="text-red-500 text-sm">{state.errors.title}</p>}
            
            <div className='flex flex-col gap-1'>
                <label htmlFor="completed">Completed</label>
                <input id="completed" name="completed" type="checkbox" />
            </div>
            {state?.errors?.completed && <p className="text-red-500 text-sm">{state.errors.completed}</p>}
            <button className='mt-4 bg-indigo-600 text-white' type="submit">Login</button>
        </form>
    )
}