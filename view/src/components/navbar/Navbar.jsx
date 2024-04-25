import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { authToken, handleOpen, handleOpenLogin, resetToken } from '../../Reducers/navReducer/navReducer';

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const token = useSelector(authToken);
  const dispatch = useDispatch();

  const handleMenuClick = () => {
    dispatch(handleOpen())
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLoginClick = () => {
    setAnchorEl(null);
    dispatch(handleOpenLogin())
  };

  const handleLogOutClick = () => {
    setAnchorEl(null);
    dispatch(resetToken())
    localStorage.removeItem('auth')
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            LearnVerse
          </Typography>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLoginClick}>Login</MenuItem>
                <MenuItem onClick={handleLogOutClick}>Log Out</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
