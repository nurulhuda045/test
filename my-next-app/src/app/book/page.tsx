"use client";

import { useEffect, useState } from "react";
import { deleteBook, getBooks } from "../actions/book";
import Table from "../components/Table";
import Link from "next/link";


const columns = [
  { Header: "Title", accessor: "title" },
  { Header: "Author", accessor: "author" },
  { Header: "Completed", accessor: "completed" },
];

export default function Books() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const bookData = await getBooks();
    setData(bookData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const removeBook = async (id: string) => {
    const updatedData = await deleteBook(id)
    setData(updatedData)
  }

  const actions = [
    {
      name: "delete",
      event: removeBook,
      type: 'button'
    },
    {
      name: "update",
      content: (id: string) => {
        return (
          <Link
            href={`/book/${id}`}
            className="border border-gray-500 rounded-lg px-2 py-1"
          >
            update
          </Link>
        );
      }
    }
  ];

  return (
    <div>
      <Table data={data} columns={columns} actions={actions} />
    </div>
  );
}
