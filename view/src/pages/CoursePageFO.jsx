import React, { useEffect } from "react";
import MainLayout from "../layouts/mainLayout/MainLayout";
import {
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Box,
  Container,
  Paper,
} from "@mui/material";
import "./coursePageFO.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleCourse,
  isCourseLoading,
  singleCourseState,
} from "../Reducers/coursesReducer/coursesReducer";
import {
  getLessonsOrder,
  isLessonsOrderLoading,
  singleLessonsOrder,
} from "../Reducers/lessonsOrderReducer/lessonsOrderReducer";
import {
  editUser,
  isLoginLoading,
  user,
} from "../Reducers/navReducer/navReducer";
import SpinnerLoader from "../components/spinnerLoader/SpinnerLoader";

const CoursePageFO = () => {
  const { id } = useParams();
  const singleCourse = useSelector(singleCourseState);
  const lessonsOrder = useSelector(singleLessonsOrder);
  const courseLoading = useSelector(isCourseLoading);
  const LessonsOrderLoading = useSelector(isLessonsOrderLoading);
  const loginLoading = useSelector(isLoginLoading);
  const loggedUser = useSelector(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubscribe = () => {
    const dataToSend = {
      myCourses: [...loggedUser.myCourses, id],
    };
    dispatch(editUser({ id: loggedUser._id, data: dataToSend }));
  };

  const isSubscribed = loggedUser.myCourses
    ? loggedUser.myCourses.find((course) => course._id === id)
    : null;

  useEffect(() => {
    dispatch(getSingleCourse(id));
    dispatch(getLessonsOrder(id));
  }, [id, loggedUser]);

  return (
    <MainLayout>
      <Container className="courseFO">
        <Box className="courseFO__wrapper">
          <Paper elevation={12} className="courseFO__wrapper__img">
            <img
              className="courseFO__wrapper__img__img"
              src={singleCourse.cover}
              alt={singleCourse.title}
            />
          </Paper>
          <Box className="courseFO__wrapper__text">
            <Typography variant="h4" gutterBottom>
              {singleCourse.title}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Category: {singleCourse.category}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Description: {singleCourse.desc}
            </Typography>
          </Box>
        </Box>
        <Box className="courseFO__lessons">
          <Typography variant="h6" gutterBottom>
            Lessons:
          </Typography>
          <List>
            {lessonsOrder.lessonsOrder &&
              lessonsOrder.lessonsOrder.map((lesson, index) => (
                <Paper
                  className={`courseFO__lessons__item ${isSubscribed ? 'courseFO__lessons__subscribed' : ''}`}
                  key={index}
                  elevation={12}
                  style={{ marginBottom: "10px" }}
                  onClick={
                    isSubscribed
                      ? () => navigate(`/lesson/${lesson._id}`)
                      : null
                  }
                >
                  <img
                    src={lesson.cover}
                    alt={lesson.title}
                    className="courseFO__lessons__item__img"
                  />
                  <ListItem>
                    <ListItemText primary={lesson.title} />
                  </ListItem>
                </Paper>
              ))}
          </List>
          {loggedUser.myCourses && (
            <Button
              className="courseFO__button"
              variant="contained"
              color={isSubscribed ? "success" : "primary"}
              onClick={isSubscribed ? null : handleSubscribe}
            >
              {isSubscribed
                ? "Subscribed"
                : `Subscribe ${singleCourse.price} €`}
            </Button>
          )}
        </Box>
      </Container>
      {courseLoading || LessonsOrderLoading || loginLoading ? (
        <SpinnerLoader />
      ) : null}
    </MainLayout>
  );
};

export default CoursePageFO;
