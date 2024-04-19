"use client";

import { addBook, getBook, updateBook } from "@/app/actions/book";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

export default function EditBookForm() {
    const params = useParams();
    const {id} = params;
    const [data, setData] = useState<any>({})
    const [state, action] = useFormState(updateBook, undefined);

  useEffect(() => {
    const bookData = getBook(id)
    setData(bookData)
  }, [])

  const handleSubmit = (payload: any) => {
    payload.append("id", id)
    action(payload)
  }
  
  return (
    <form action={handleSubmit} className="flex flex-col gap-3">
      {state?.message && (
        <p className="text-red-500 text-sm">{state.message}</p>
      )}

      <div className="flex flex-col gap-1">
        <label htmlFor="title">Book Title</label>
        <input id="title" value={data.title} name="title" type="title" placeholder="Book Title" />
      </div>
      {state?.errors?.title && (
        <p className="text-red-500 text-sm">{state.errors.title}</p>
      )}
      <div className="flex flex-col gap-1">
        <label htmlFor="author">Author</label>
        <input
          id="author"
          name="author"
          type="author"
          placeholder="Book author"
          value={data?.author}
        />
      </div>
      {state?.errors?.title && (
        <p className="text-red-500 text-sm">{state.errors.title}</p>
      )}

      <div className="flex flex-col gap-1">
        <label htmlFor="completed">Completed</label>
        <input id="completed" name="completed" type="checkbox" checked={data?.completed} />
      </div>
      {state?.errors?.completed && (
        <p className="text-red-500 text-sm">{state.errors.completed}</p>
      )}
      <button className="mt-4 bg-indigo-600 text-white" type="submit">
        Update
      </button>
    </form>
  );
}
