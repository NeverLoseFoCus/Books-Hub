import React, { useState, useEffect } from 'react'
import axios from "axios"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from "@mui/material/Button"

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

export default function LogOut(props) {
  const [open, setOpen] = useState(true);
  useEffect(async () => {
    const response = await axios.post("/api/isLoggedIn")
        if(!response.data.isLoggedIn) {
          window.location.href = "/login"
        }
  })
  const handleClose = () => { setOpen(false); window.history.back()};
    const confirmLogout = () => {
        props.handleOpenEvent("succesfuly logged out")
        window.location.reload()
        window.location.href = "/api/logout"
    }
    return (
      <div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{color: "black"}}>
            are you sure?
            <Button variant="contained" color="error" className='SingleBook-icon SingleBook-icon-margin' onClick={handleClose}>No </Button>
            <Button variant="contained" color="primary" className='SingleBook-icon ' onClick={confirmLogout}>Yes</Button>
          </Typography>
        </Box>
      </Modal>
      </div>
    )
}

