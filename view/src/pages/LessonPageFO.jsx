import React, { useEffect } from "react";
import MainLayout from "../layouts/mainLayout/MainLayout";
import { Container, Paper, Typography } from "@mui/material";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleLesson,
  singleLesson,
} from "../Reducers/lessonsReducer/lessonsReducer";
import "./lessonPageFO.scss";

const LessonPageFO = () => {
  const { id } = useParams();
  const lesson = useSelector(singleLesson);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleLesson(id));
  }, [id]);
  return (
    <MainLayout>
      <Container className="lesson">
        <Paper className="lesson__text" elevation={12}>
          <Typography variant="h4">{lesson.title}</Typography>
          <Typography variant="body1">{lesson.desc}</Typography>
        </Paper>
        <Paper className="lesson__videoWrapper" elevation={12}>
          <ReactPlayer
            url={lesson.fileUrl}
            light={lesson.cover}
            controls={true}
            width="100%"
            height="100%"
            className="lesson__videoWrapper__video"
            pip={true}
          />
        </Paper>
      </Container>
    </MainLayout>
  );
};

export default LessonPageFO;
