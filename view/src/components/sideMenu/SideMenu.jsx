import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { useDispatch, useSelector } from "react-redux";
import { handleOpen, isOpen, user } from "../../Reducers/navReducer/navReducer";
import { useNavigate } from "react-router-dom";

export default function SideMenu() {
  const open = useSelector(isOpen);
  const loggedUser = useSelector(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDrawer = () => {
    dispatch(handleOpen());
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon onClick={() => navigate('/')}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        {loggedUser.role === "user" ? (
          <>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/browseCourses')}>
                <ListItemIcon>
                  <TravelExploreIcon />
                </ListItemIcon>
                <ListItemText primary="Browse Courses" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/userDashboard')}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="My Dashboard" />
              </ListItemButton>
            </ListItem>
          </>
        ) : null}
      </List>
      {loggedUser.role === "admin" ? (
        <>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/admin')}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Admin Dashboard" />
              </ListItemButton>
            </ListItem>
          </List>
        </>
      ) : null}
    </Box>
  );

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
