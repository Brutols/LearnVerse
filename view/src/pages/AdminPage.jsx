import React from "react";
import MainLayout from "../layouts/mainLayout/MainLayout";
import { Fab, Tooltip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./adminPage.scss";
import { useDispatch } from "react-redux";
import { setAddCoursesOpen } from "../Reducers/coursesReducer/coursesReducer";
import AddCourse from "../components/addCourse/addCourse";
import AllCourseCardBO from "../components/courseCardBO/AllCourseCardBO";

const AdminPage = () => {
    const dispatch = useDispatch();

    const handleOpen = () => {
        dispatch(setAddCoursesOpen());
    }

  return (
    <MainLayout>
      <div className="adminContainer">
        <Typography variant="h4" my={2} className="adminContainer__title">
            Manage your Courses
        </Typography>
        <AllCourseCardBO />
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
