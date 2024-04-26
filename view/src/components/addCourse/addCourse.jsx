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
import {
  coursesUploadImg,
  createCourse,
  createLessonsOrder,
  isAddCourseOpen,
  setAddCoursesOpen,
  toggleRefresh,
} from "../../Reducers/coursesReducer/coursesReducer";
import { DialogContent, TextField } from "@mui/material";
import "./addCourse.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddCourse() {
  const [formData, setFormData] = React.useState({});
  const [fileToSend, setFileToSend] = React.useState(null)
  const addCourseOpen = useSelector(isAddCourseOpen);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setAddCoursesOpen());
  };

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value})
  };

  const handleUpload = (e) => {
    const fileToSave = e.target.files[0];
    setFileToSend(fileToSave);
  }

  const handleSave = async () => {
    const uploadedFile = await dispatch(coursesUploadImg(fileToSend));
    const bodyToSend = {
      ...formData,
      cover: uploadedFile.payload
    }
    const newCourse = await dispatch(createCourse(bodyToSend, fileToSend));
    const newCourseId = newCourse.payload.payload._id
    await dispatch(createLessonsOrder(newCourseId));
    dispatch(toggleRefresh());
  }

  return (
    <React.Fragment>
      <Dialog
        maxWidth={500}
        open={addCourseOpen}
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
              Add a course
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSave}>
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
          />
          <TextField
            onChange={handleUpload}
            autoFocus
            required
            margin="dense"
            id="cover"
            name="cover"
            helperText="Cover Image"
            type="file"
            variant="outlined"
            fullWidth
          />
          <div className="inputWrapper">
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
            />
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
