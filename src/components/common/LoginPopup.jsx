import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from '@mui/material';
import { login } from '../../libs/api/user';
import { useNavigate } from 'react-router-dom';

const LoginPopup = () => {
  const [open, setOpen] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    login(username, password).then(() => {
      handleClose();
      const role = localStorage.getItem('role');
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    })
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin} variant="contained" color="primary">
          Login
        </Button>
      </DialogContent>
    </Dialog>
    </div>
  );
}

export default LoginPopup;