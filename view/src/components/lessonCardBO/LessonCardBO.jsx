import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./lessonCardBO.scss";
import ReactPlayer from "react-player";
import { Draggable } from "react-beautiful-dnd";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { setAddLessonOpen, setEditLesson, setLessonId } from "../../Reducers/lessonsReducer/lessonsReducer";

export default function LessonCardBO({ title, desc, cover, fileUrl, id, lessonId }) {
  const dispatch = useDispatch();

  const handleEditOpen = () => {
    dispatch(setLessonId(lessonId))
    dispatch(setEditLesson());
    dispatch(setAddLessonOpen());
  }

  return (
    <Draggable draggableId={id.toString()} index={id}>
      {(provided) => (
        <Card
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="lessonCard"
        >
          <div className="lessonCard__videoWrapper">
            <ReactPlayer
              url={fileUrl}
              light={cover}
              controls={true}
              width="100%"
              height="100%"
              className="lessonCard__videoWrapper__reactPlayer"
            />
          </div>
          <CardContent className="lessonCard__content">
            <Button variant="contained" className="lessonCard__content__btn" onClick={handleEditOpen}>Edit</Button>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography
              variant="body2"
              my={1}
              color="text.secondary"
              className="lessonCard__content__description"
            >
              {desc}
            </Typography>
          </CardContent>
          <DragIndicatorIcon className="lessonCard__icon"/>
        </Card>
      )}
    </Draggable>
  );
}
