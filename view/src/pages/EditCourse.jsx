import React, { useEffect } from "react";
import MainLayout from "../layouts/mainLayout/MainLayout";
import { Fab, Tooltip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./editCourse.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCourse, isRefresh, singleCourseState } from "../Reducers/coursesReducer/coursesReducer";
import { setAddLessonOpen } from "../Reducers/lessonsReducer/lessonsReducer";
import AddLesson from "../components/addLesson/AddLesson";
import { getLessonsOrder } from "../Reducers/lessonsOrderReducer/lessonsOrderReducer";

const EditCourse = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const refresh = useSelector(isRefresh);
  const singleCourse = useSelector(singleCourseState);

  useEffect(() => {
    dispatch(getSingleCourse(id))
    dispatch(getLessonsOrder(id))
  }, [refresh])

  const handleOpen = () => {
    dispatch(setAddLessonOpen());
  };

  return (
    <MainLayout>
      <Typography variant="h4" py={2} className="editCourseContainer__header" style={{backgroundImage: `url(${singleCourse.cover})`}}>
        {singleCourse.title}
      </Typography>
      <div className="editCourseContainer">
        <Typography variant="h4" my={2} className="editCourseContainer__title">
          Manage lessons
        </Typography>
        <AddLesson courseId={id}/>
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
