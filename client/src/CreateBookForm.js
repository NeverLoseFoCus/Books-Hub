import React, { useEffect } from 'react'
import "./styles/CreateBookForm.css"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from "axios"

export default function CreateBookForm() {
  useEffect(async () => {
    const response = await axios.post("/api/isLoggedIn")
        if(!response.data.isLoggedIn) {
          window.location.href = "/login"
        }
  })
    return (
      <div className='CreateBookForm'>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                className='formContainer'
            >
              <form action='/api/book/new' method="post" id="form">
                <TextField id="outlined-basic" label="Your book name:" variant="outlined" className='newBookName' name="bookName" inputProps={{ maxLength: 20 }} required/>
                  <TextField
                      id="outlined-multiline-static"
                      label="Enter your book content"
                      multiline
                      className='newBookContent'
                      rows={17}
                      name="bookContent"
                      required
                  />
                  <button className='succes-button'>Submit</button>
              </form>
            </Box>
      </div>
    )
  }
