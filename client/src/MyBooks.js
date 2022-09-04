import React, {useEffect, useState} from 'react'
import axios from 'axios'
import SingleBook from "./SingleBook"
import { Button } from '@mui/material'
import "./styles/MyBooks.css"


export default function MyBooks(props) {
  const [books, setBooks] = useState()
  const [noBooks, setNoBooks] = useState(false)
  useEffect(async () => {
      const response = await axios.get("/api/mybooks")
      if(response.data.books) {
        setBooks(response.data.books)
      } else if(response.data.noBooks) {
        setNoBooks(response.data.noBooks)
      }
      const response2 = await axios.post("/api/isLoggedIn")
        if(!response2.data.isLoggedIn) {
          window.location.href = "/login"
        }
  })
  const handleClick = () => {
    window.location.href = "/book/new"
  }
  return (
    <div className='MyBooks BooksHub'>
        {noBooks === true ?  <div className='MyBooks-noBooks-container'> <h1 className='MyBooks-header'>You dont have any books yet!</h1> <Button variant="contained" color="success" onClick={handleClick}>Add one now!</Button> </div>
        : <div className='booksContainer'> {books && books.map((b) => {
          return <SingleBook bookName={b.bookName} key={b.bookName} id={b._id} removeAble/>
        })} </div> }
    </div>
  )
}

//  :
