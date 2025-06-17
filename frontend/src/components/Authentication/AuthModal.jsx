import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import SigninForm from './SigninForm';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import SignupForm from './SignupForm';
import { useLocation, useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
   width: { xs: '90%', sm: 500 },
  bgcolor: 'background.paper',
  borderRadius: 8,
  boxShadow: 24,
  outline: "none",
  p: { xs: 1, sm: 2 },
  maxHeight: '90vh',
  overflowY: 'auto', 
};

export default function AuthModal({ open, handleClose }) {
  const location = useLocation()
  const navigate = useNavigate();
  const handleNavigate = () => {
    const path = location.pathname === "/signup" ? "/signin" : "/signup"
    navigate(path)
  }
    const isSignup = location.pathname === '/signup';

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         
         <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

          <h1 className='text-center font-bold text-3xl pb-20'>
            {isSignup ? 'Create your account' : 'Login to your account'}
        </h1>
          {location.pathname === "/signup" ? <SignupForm /> : <SigninForm />}

          <h1 className='text-centre py-5 font-semibold text-lg text-gray-500'>
            {location.pathname === "/signup" ? "Already have account" : "If you don't have a account"}
          </h1>
          <Button fullWidth variant='outlined' onClick={handleNavigate}
            sx={{ borderRadius: "29px", py: "15px" }}>
            {location.pathname === "/signup" ? "signin" : "signup"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

