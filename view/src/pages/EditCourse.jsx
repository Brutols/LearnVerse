import React, { useEffect } from "react";
import MainLayout from "../layouts/mainLayout/MainLayout";
import { Fab, Tooltip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./editCourse.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleCourse,
  isCourseLoading,
  isRefresh,
  singleCourseState,
} from "../Reducers/coursesReducer/coursesReducer";
import { isEditLesson, isLessonLoading, setAddLessonOpen, singleLessonId } from "../Reducers/lessonsReducer/lessonsReducer";
import AddLesson from "../components/addLesson/AddLesson";
import { isLessonsOrderLoading } from "../Reducers/lessonsOrderReducer/lessonsOrderReducer";
import AllLessonCardBO from "../components/lessonCardBO/AllLessonCardBO";
import SpinnerLoader from "../components/spinnerLoader/SpinnerLoader";

const EditCourse = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const refresh = useSelector(isRefresh);
  const singleCourse = useSelector(singleCourseState);
  const courseLoading = useSelector(isCourseLoading);
  const lessonLoading = useSelector(isLessonLoading);
  const lessonOrderLoading = useSelector(isLessonsOrderLoading);
  const lessonId = useSelector(singleLessonId);
  const editLesson = useSelector(isEditLesson);

  useEffect(() => {
    dispatch(getSingleCourse(id));
  }, [refresh, id]);

  const handleOpen = () => {
    dispatch(setAddLessonOpen());
  };

  return (
    <MainLayout>
        <Typography
          variant="h4"
          py={2}
          className="editCourseContainer__header"
          style={{ backgroundImage: `url(${singleCourse.cover})` }}
        >
          {singleCourse.title}
        </Typography>
        <div className="editCourseContainer">
          <Typography
            variant="h4"
            my={2}
            className="editCourseContainer__title"
          >
            Manage lessons
          </Typography>
          <AllLessonCardBO id={id}/>
          <AddLesson courseId={id} isEditing={editLesson} lessonId={lessonId} />
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
        {courseLoading || lessonLoading || lessonOrderLoading ? <SpinnerLoader /> : null}
    </MainLayout>
  );
};

export default EditCourse;
