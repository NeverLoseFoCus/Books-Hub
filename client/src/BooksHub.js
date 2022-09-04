import React, {useEffect} from 'react'
import SingleBook from "./SingleBook"
import "./styles/BooksHub.css"


export default function BooksHub(props) {
    useEffect(() => {
       if(window.localStorage.getItem("loggedSuccesfuly")) {
           props.handleOpenEventSucces("logged in succesfuly")
       }
    })
    return (
        <div className='BooksHub'>
            <div className='booksContainer'>
              {props.books.map((b) => {
              return <SingleBook bookName={b.bookName} authName={b.auth.username} key={b.bookName} id={b._id} showAuth addToFavOption/>
              })}
            </div>
        </div> 
    )
}
