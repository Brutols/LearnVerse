import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { useDispatch, useSelector } from "react-redux";
import { DialogContent, TextField } from "@mui/material";
import { createLesson, getSingleLesson, isAddLessonOpen, lessonsUploadImg, lessonsUploadVideo, setAddLessonOpen, setEditLesson, toggleLessonsRefresh, updateLesson } from "../../Reducers/lessonsReducer/lessonsReducer";
import { editLessonOrder, singleLessonsOrder } from "../../Reducers/lessonsOrderReducer/lessonsOrderReducer";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddLesson({courseId, isEditing, lessonId}) {
  const [formData, setFormData] = React.useState({});
  const [fileToSend, setFileToSend] = React.useState(null);
  const [videoToSend, setVideoToSend] = React.useState(null);
  const addLessonOpen = useSelector(isAddLessonOpen);
  const lessonsOrder = useSelector(singleLessonsOrder);
  const [lesson, setLesson] = React.useState({});
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setAddLessonOpen());
    if (isEditing) {
      dispatch(setEditLesson());
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value})
  };

  const handleUpload = (e) => {
    const fileToSave = e.target.files[0];
    setFileToSend(fileToSave);
  }

  const handleUploadVideo = (e) => {
    const videoToSave = e.target.files[0];
    setVideoToSend(videoToSave);
  }

  const handleContent = (field) => {
    let value = '';
    if (isEditing) {
      value = lesson[field];
    }
    return value;
  }

  const handleSave = async () => {
    const uploadedFile = await dispatch(lessonsUploadImg(fileToSend));
    const uploadVideo = await dispatch(lessonsUploadVideo(videoToSend));
    const bodyToSend = {
      ...formData,
      cover: uploadedFile.payload,
      fileUrl: uploadVideo.payload,
      courseId: courseId,
    }
    const newLesson = await dispatch(createLesson({formData: bodyToSend, img: fileToSend, video: videoToSend}));
    const newLessonsOrder = [
        ...lessonsOrder.lessonsOrder, newLesson.payload.payload._id
    ]
    console.log('NewLessonsOrder', newLessonsOrder);
    await dispatch(editLessonOrder({id: lessonsOrder._id, newLessonsOrder: newLessonsOrder}))
    dispatch(toggleLessonsRefresh());
    handleClose();
  }

  const handleEdit = async () => {
    const uploadedFile = fileToSend ? await dispatch(lessonsUploadImg(fileToSend)) : null;
    const uploadedVideo = videoToSend ? await dispatch(lessonsUploadVideo(videoToSend)) : null;
    const bodyToSend = {
      ...formData
    }
    if (uploadedFile) {
      bodyToSend.cover = uploadedFile.payload;
    }
    if (uploadedVideo) {
      bodyToSend.fileUrl = uploadedVideo.payload;
    }
    await dispatch(updateLesson({id: lessonId, formData: bodyToSend}));
    dispatch(toggleLessonsRefresh());
    handleClose();
  }

  React.useEffect(() => {
    const getLesson = async () => {
      console.log(lessonId);
      const res = await dispatch(getSingleLesson(lessonId));
      await setLesson(res.payload);
    }
    lessonId && getLesson();
  }, [lessonId])

  return (
    <React.Fragment>
      <Dialog
        maxWidth={500}
        open={addLessonOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {isEditing ? 'Edit Lesson' : 'Add a Lesson'}
            </Typography>
            <Button autoFocus color="inherit" onClick={isEditing ? handleEdit : handleSave}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <TextField
            onChange={handleChange}
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            helperText={handleContent('title')}
          />
          <TextField
            onChange={handleChange}
            autoFocus
            required
            margin="dense"
            id="desc"
            name="desc"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            helperText={handleContent('desc')}
          />
          <TextField
            onChange={handleUpload}
            autoFocus
            required
            margin="dense"
            id="cover"
            name="file"
            helperText={isEditing ? lesson.cover : 'Cover Image'}
            type="file"
            variant="outlined"
            fullWidth
          />
          <TextField
            onChange={handleUploadVideo}
            autoFocus
            required
            margin="dense"
            id="fileUrl"
            name="file"
            helperText={isEditing ? lesson.fileUrl : 'Lesson video content'}
            type="file"
            variant="outlined"
            fullWidth
          />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}