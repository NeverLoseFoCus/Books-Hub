import React, {useEffect, useState} from 'react'
import axios from "axios"
import SingleBook from "./SingleBook"
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';



export default function FavBooks(props) {
    const [books, setBooks] = useState()
    const [open, setOpen] = useState(false);
    const [snackBarMSG, setSnackBarMSG] = useState("")

    useEffect(async () => {
        const response = await axios.post("/api/isLoggedIn")
        if(!response.data.isLoggedIn) {
          window.location.href = "/login"
        }
        const response2 = await axios.get("/api/books/fav")
        setBooks(response2.data.books)
    }, [])

    const handleOpenEvent = (MSG) => {
      setOpen(true);
      setSnackBarMSG(MSG)
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false)
    };
  
    const action = (
      <React.Fragment>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    );
  return (
    <div className='FavBooks booksContainer'>
        {books && books.map((b) => {
            return <SingleBook bookName={b.bookName} key={b.bookName} id={b._id} favRemoveAble handleOpenEvent={handleOpenEvent}/>
        })}

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
        action={action}
        
      > 
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }} style={{backgroundColor: "rgb(112, 224, 112)", color: "white"}}>
          {snackBarMSG}
        </Alert>
      </Snackbar>
    </div>
  )
}
