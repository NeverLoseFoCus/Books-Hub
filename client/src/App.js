import React, {useEffect, useState}  from 'react'
import BooksHub from './BooksHub';
import './styles/App.css';
import Register from './Register';
import Login from './Login';
import LogOut from './Logout';
import CreateBookForm from "./CreateBookForm"
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import axios from "axios"
import NavBar from './NavBar';
import ShowBook from "./ShowBook"
import EditBookForm from "./EditBookForm"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import MyBooks from './MyBooks';
import FavBooks from './FavBooks';
import ErrorPage from './ErrorPage'


function App() {
  const [openSucces, setOpenSucces] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [snackBarSuccesMSG, setSnackBarSuccesMSG] = useState("")
  const [snackBarErrorMSG, setSnackBarErrorMSG] = useState("")
  const [books, setBooks] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState()
  const [userInfo, setUserInfo] = useState("Anonymous")


  useEffect(async () => {
    const response2 = await axios.post("/api/isLoggedIn")
    setIsLoggedIn(response2.data.isLoggedIn)
    const response = await axios.get("/api/books")
    setBooks(response.data.books)
    if(isLoggedIn) {
      const response3 = await axios.get("/api/userInfo")
      setUserInfo(response3.data.user)
    }
  })

  const handleOpenEventSucces = (MSG) => {
    setOpenSucces(true);
    setSnackBarSuccesMSG(MSG)
  };

  const handleOpenEventError = (MSG) => {
    setOpenError(true);
    setSnackBarErrorMSG(MSG)
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    window.localStorage.clear({})
    setOpenError(false);
    setOpenSucces(false)
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
    <div>
    <Router>
      <NavBar isLoggedIn={isLoggedIn} userInfo={userInfo}/>
      <Routes>
        <Route exact path="/" element={<BooksHub books={books} handleOpenEventSucces={handleOpenEventSucces}/>} />
        <Route exact path="/register" element={<Register handleOpenEvent={handleOpenEventSucces}/>} />
        <Route exact path="/login" element={<Login handleOpenEventSucces={handleOpenEventSucces} handleOpenEventError={handleOpenEventError} user={userInfo}/>} />
        <Route exact path="/logout" element={<LogOut handleOpenEvent={handleOpenEventSucces}/>} />
        <Route exact path="/book/new" element={<CreateBookForm />} />
        <Route exact path='/book/fav' element={<FavBooks />}/>
        <Route exact path="/book/:id" element={<ShowBook />} />
        <Route exact path='/mybooks' element={<MyBooks />}/>
        <Route exact path="/book/edit/:id" element={<EditBookForm handleOpenEvent={handleOpenEventSucces}/>}/>
        <Route exact path="/error/page" element={<ErrorPage />}/>
      </Routes>
    </Router>
    <Snackbar
        open={openSucces}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
        action={action}
        
      > 
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }} style={{backgroundColor: "rgb(112, 224, 112)", color: "white"}}>
          {snackBarSuccesMSG}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
        action={action}
        
      > 
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }} style={{backgroundColor: "rgb(112, 224, 112)", color: "white"}}>
          {snackBarErrorMSG}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;

// 