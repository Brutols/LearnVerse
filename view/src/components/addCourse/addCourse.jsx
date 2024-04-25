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
  isAddCourseOpen,
  setAddCoursesOpen,
} from "../../Reducers/coursesReducer/coursesReducer";
import { DialogContent, TextField } from "@mui/material";
import "./addCourse.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddCourse() {
  const addCourseOpen = useSelector(isAddCourseOpen);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setAddCoursesOpen());
  };

  const handleChange = () => {};

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
            <Button autoFocus color="inherit" onClick={handleClose}>
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
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            onChange={handleChange}
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
