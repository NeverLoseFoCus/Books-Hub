import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import "./styles/ShowBook.css"


export default function ShowBook() {
    let {id} = useParams()
    const [name, setName] = useState()
    const [content, setContent] = useState()
    useEffect(async () => {
        const response = await axios.get(`/api/book/${id}`)
        setContent(response.data.book.bookContent)
        setName(response.data.book.bookName)
    }, [])
    return (
      <div className='ShowBook'>
          <div className='ShowBook-container'>
            <h1 className='ShowBook-name'>{name}</h1>
            <p className='ShowBook-content'>{content}</p>
          </div>
      </div>
    )
}
