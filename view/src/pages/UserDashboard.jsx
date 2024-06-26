import React from "react";
import MainLayout from "../layouts/mainLayout/MainLayout";
import {
  Avatar,
  Container,
  Grid,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  editUser,
  isLoginLoading,
  uploadProfilePic,
  user,
} from "../Reducers/navReducer/navReducer";
import "./userDashboard.scss";
import CourseCardFO from "../components/courseCardFO/CourseCardFO";
import SpinnerLoader from "../components/spinnerLoader/SpinnerLoader";

const UserDashboard = () => {
  const loggedUser = useSelector(user);
  const loginLoading = useSelector(isLoginLoading);
  const dispatch = useDispatch();

  const handlePicChange = async (e) => {
    const file = e.target.files[0];
    const uploadedFile = await dispatch(uploadProfilePic(file));
    const bodyToSend = {
      profilePic: uploadedFile.payload,
    };
    await dispatch(editUser({ id: loggedUser._id, data: bodyToSend }));
  };

  return (
    <MainLayout>
      <Container className="userDashboard">
        <Paper elevation={12} className="userDashboard__profileWrapper">
          <Tooltip title='Edit profile pic' followCursor enterDelay={500}>
            <div className="userDashboard__profileWrapper__profilePicWrapper">
              <Avatar
                alt={loggedUser.firstName}
                src={loggedUser.profilePic}
                sx={{ width: 100, height: 100 }}
                className="userDashboard__profileWrapper__profilePic"
              />
              <input type="file" onChange={handlePicChange} />
            </div>
          </Tooltip>
          <Typography variant="h5">
            {`${loggedUser.firstName} ${loggedUser.lastName}`}
          </Typography>
          <Typography>{loggedUser.email}</Typography>
        </Paper>
        <Paper elevation={12} className="userDashboard__courses">
          <Typography variant="h4">Your Courses</Typography>
          <Grid container spacing={3}>
            {loggedUser &&
              loggedUser.myCourses.map((course, i) => (
                <CourseCardFO key={i} course={course} />
              ))}
          </Grid>
        </Paper>
      </Container>
      {loginLoading && <SpinnerLoader />}
    </MainLayout>
  );
};

export default UserDashboard;
