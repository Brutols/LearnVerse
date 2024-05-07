import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/mainLayout/MainLayout";
import {
  Container,
  Fab,
  Paper,
  Tooltip,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./editCourse.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  coursesUploadImg,
  getSingleCourse,
  isCourseLoading,
  isRefresh,
  singleCourseState,
  toggleRefresh,
  updateCourse,
} from "../Reducers/coursesReducer/coursesReducer";
import {
  isEditLesson,
  isLessonLoading,
  setAddLessonOpen,
  singleLessonId,
} from "../Reducers/lessonsReducer/lessonsReducer";
import AddLesson from "../components/addLesson/AddLesson";
import { isLessonsOrderLoading } from "../Reducers/lessonsOrderReducer/lessonsOrderReducer";
import AllLessonCardBO from "../components/lessonCardBO/AllLessonCardBO";
import SpinnerLoader from "../components/spinnerLoader/SpinnerLoader";
import ConfirmDialog from "../components/confirmDialog/ConfirmDialog";
import { toast } from "react-toastify";

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
  const [formData, setFormData] = useState({});
  const [fileToSave, setFileToSave] = useState(null);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value})
  };

  const handleUpload = (e) => {
    setFileToSave(e.target.files[0]);
  };

  const handleSave = async () => {
    const uploadedFile = fileToSave ? await dispatch(coursesUploadImg(fileToSave)) : null;
    const bodyToSend = {
      ...formData
    }
    if (uploadedFile) {
      bodyToSend.cover = uploadedFile.payload;
    }
    await dispatch(updateCourse({id: id, formData: bodyToSend}));
    toast.success('Course Updated!')
    dispatch(toggleRefresh());
  }

  const handleOpen = () => {
    dispatch(setAddLessonOpen());
  };

  useEffect(() => {
    dispatch(getSingleCourse(id));
  }, [refresh, id]);

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
      <Container>
        <Paper elevation={12} className="editCourseContainer__form">
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
            helperText={singleCourse.title}
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
            helperText={singleCourse.desc}
          />
          <TextField
            onChange={handleChange}
            autoFocus
            required
            margin="dense"
            id="price"
            name="price"
            label="Price"
            type="number"
            variant="outlined"
            fullWidth
            helperText={`${singleCourse.price}.00 €`}
          />
          <TextField
            onChange={handleChange}
            autoFocus
            required
            margin="dense"
            id="category"
            name="category"
            label="Category"
            type="text"
            variant="outlined"
            fullWidth
            helperText={singleCourse.category}
          />
          <TextField
            onChange={handleUpload}
            autoFocus
            required
            margin="dense"
            id="cover"
            name="file"
            helperText={singleCourse.cover}
            type="file"
            variant="outlined"
            fullWidth
          />
          <Button variant="contained" sx={{alignSelf: 'flex-end'}} onClick={handleSave}>Save</Button>
        </Paper>

        <Typography variant="h4" my={2} className="editCourseContainer__title">
          Manage lessons
        </Typography>
      </Container>
      <div className="editCourseContainer">
        <AllLessonCardBO id={id} />
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
      {courseLoading || lessonLoading || lessonOrderLoading ? (
        <SpinnerLoader />
      ) : null}
      <ConfirmDialog isLesson={true} />
    </MainLayout>
  );
};

export default EditCourse;
