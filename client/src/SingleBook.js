import React, {useState} from 'react'
import bookIMG from "./imgs/bookCover.jpg"
import {Link} from "react-router-dom"
import Button from "@mui/material/Button"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from "axios"
import {Navigate} from "react-router-dom"
import Bookmark from "@mui/icons-material/Bookmark"
import Tooltip from '@mui/material/Tooltip';
import "./styles/SingleBook.css"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  height: 100,
  boxShadow: 24,
  borderRadius: "5px",
  p: 4,

};

export default function SingleBook(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [url, setUrl] = useState()

  const confirmDelete = async () => {
     await axios.get(`/api/book/delete/${props.id}`)
  }
  const handleDelete = async (e) => {
    e.preventDefault()
    handleOpen()
  }
  const handleEdit = async (e) => {
    e.preventDefault()
    const response = await axios.get(`/api/book/edit/${props.id}`)
    setUrl(response.data.url)
  }
  const handleAddToFav = (e) => {
    e.preventDefault()
    console.log("in the add fun!")
    window.location.href = `/api/book/addToFav/${props.id}`
  }
  const handleRemoveFromFav = (e) => {
    e.preventDefault()
    console.log("in the remove func!")
    window.location.href = `/api/book/removeFromFav/${props.id}`
    props.handleOpenEvent("succesfuly removed from your favorites")
  }
    return (
      <div className='SingleBook'>
        {url && <Navigate replace to={url}/>}
        <Link to={`/book/${props.id}`} className='SingleBook-link'>
          {props.addToFavOption || props.favRemoveAble ? 
            <div className='SingleBook-image-container'>
              <img src={bookIMG} className="SingleBook-img" alt="book cover"/>
              <div className={`SingleBook-addToFav ${props.favRemoveAble && "active"}`}><Tooltip title={props.favRemoveAble ? "remove this book from your favorites" : "add this book to your favorites"} placement='right' arrow><Bookmark onClick={ props.favRemoveAble ? handleRemoveFromFav : handleAddToFav} className={`SingleBook-bookmark ${props.favRemoveAble && "active"}`}/></Tooltip> </div>
            </div>
          :
            <img src={bookIMG} className="SingleBook-img" alt="book cover"/>
          }
          
          <h3 className='SingleBook-h3'>{props.bookName} {props.showAuth && <Tooltip title="auther's name" placement='bottom' arrow><span style={{color: "rgb(88, 88, 88)", display: "block"}}>-By {props.authName}</span></Tooltip>}</h3>
          {props.removeAble && 
            <div className='SingleBook-icons-container'>
            <Button variant="contained" color="error" className='SingleBook-icon' onClick={handleDelete}><DeleteIcon className="SingleBook-icon-content"/> </Button>
            <Button variant="contained" color="primary" className='SingleBook-icon' onClick={handleEdit}><EditIcon className="SingleBook-icon-content"/> </Button>
            </div>}
        </Link>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="SingleBook-modal">
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{color: "black"}} >
            are you sure?
            <Button variant="contained" color="error" className='SingleBook-icon SingleBook-icon-margin' onClick={handleClose}>No </Button>
            <Button variant="contained" color="primary" className='SingleBook-icon' onClick={confirmDelete}>Yes</Button>
          </Typography>
          
        </Box>
      </Modal>
      </div>
    )
}
