import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useDispatch } from "react-redux";
import {
  handleOpen,
  handleOpenLogin,
  resetLoggedUser,
  resetToken,
} from "../../Reducers/navReducer/navReducer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const token = localStorage.getItem('auth')
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenuClick = () => {
    dispatch(handleOpen());
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLoginClick = () => {
    setAnchorEl(null);
    dispatch(handleOpenLogin());
  };

  const handleLogOutClick = () => {
    setAnchorEl(null);
    dispatch(resetToken());
    dispatch(resetLoggedUser());
    localStorage.removeItem("auth");
    navigate("/");
    toast.success("You have logged out");
  };

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
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={anchorEl}
              onClose={handleClose}
            >
              {token ? (
                <>
                  <MenuItem onClick={handleLogOutClick}>My Profile</MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogOutClick}>Log Out</MenuItem>
                </>
              ) : (
                <MenuItem onClick={handleLoginClick}>Login</MenuItem>
              )}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
