import React, { useEffect } from "react";
import MainLayout from "../layouts/mainLayout/MainLayout";
import { Fab, Tooltip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./editCourse.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCourse, isRefresh, singleCourseState } from "../Reducers/coursesReducer/coursesReducer";

const EditCourse = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const refresh = useSelector(isRefresh);
  const singleCourse = useSelector(singleCourseState);

  useEffect(() => {
    dispatch(getSingleCourse(id))
  }, [refresh])

  console.log(singleCourse);
  const handleOpen = () => {};

  return (
    <MainLayout>
      <img src={singleCourse.cover} alt={singleCourse.title} className="editCourseContainer__img"/>
      <div className="editCourseContainer">
        <Typography variant="h4" my={2} className="editCourseContainer__title">
          Manage lessons
        </Typography>
        <Tooltip title="Add lesson" followCursor enterDelay={500} color="">
          <Fab
            color="secondary"
            aria-label="add"
            className="editCourseContainer__addIcon"
            onClick={handleOpen}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>
    </MainLayout>
  );
};

export default EditCourse;
