import React from "react";
import MainLayout from "../layouts/mainLayout/MainLayout";
import { Fab, Tooltip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./adminPage.scss";
import { useDispatch } from "react-redux";
import { setAddCoursesOpen } from "../Reducers/coursesReducer/coursesReducer";
import AddCourse from "../components/addCourse/addCourse";

const AdminPage = () => {
    const dispatch = useDispatch();

    const handleOpen = () => {
        dispatch(setAddCoursesOpen());
    }

  return (
    <MainLayout>
      <div className="adminContainer">
        <Typography variant="h3" my={2}>
            Your Courses
        </Typography>
        <Tooltip title='Add course' followCursor enterDelay={500} color="">
        <Fab color="secondary" aria-label="add" className="adminContainer__addIcon" onClick={handleOpen}>
          <AddIcon />
        </Fab>
        </Tooltip>
      </div>
      <AddCourse />
    </MainLayout>
  );
};

export default AdminPage;
