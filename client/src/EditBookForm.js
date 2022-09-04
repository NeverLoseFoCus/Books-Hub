import React, {useState, useEffect} from 'react'
import "./styles/CreateBookForm.css"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useLocation, useParams } from "react-router-dom";
import axios from "axios"


export default function EditBookForm(props) {
  const [bookName, setBookName] = useState();
  const [bookContent, setBookContent] = useState();

  
  const query = new URLSearchParams(useLocation().search);
  
  let { id } = useParams();
  useEffect( async () => {
    const response = await axios.get(`/api/isAuth/${id}`)
    if(response.data.isAuth === false) {
      window.location.href = "/"
    }
    const dataBookName = query.get("bookName");
    const dataBookContent = query.get("bookContent");
    setBookName(dataBookName);
    setBookContent(dataBookContent);
    const response2 = await axios.post("/api/isLoggedIn")
        if(!response2.data.isLoggedIn) {
          window.location.href = "/login"
        }
  })
  const handleSubmit = () => {
    props.handleOpenEvent(`succesfuly updated ${bookName}`)
  }
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
              <form action={`/api/book/edit/${id}`} method="post" id="form" onSubmit={handleSubmit}>
                <TextField id="outlined-basic" label="Your book name:" variant="outlined" className='newBookName' value={bookName}  required/>
                  <TextField
                      id="outlined-multiline-static"
                      label="Enter your book content"
                      multiline
                      className='newBookContent'
                      rows={17}
                      name="updatedBookContent"
                      defaultValue={bookContent}
                      required
                  />
                  <button className='succes-button'>Update</button>
              </form>
            </Box>
      </div>
    )
  }
