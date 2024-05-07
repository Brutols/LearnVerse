import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { handleOpenConfirmation, id, isOpenConfirmation } from '../../Reducers/navReducer/navReducer';
import { deleteCourse, toggleRefresh } from '../../Reducers/coursesReducer/coursesReducer';
import { deleteLesson } from '../../Reducers/lessonsReducer/lessonsReducer';
import { deleteLessonOrder, getLessonsOrder } from '../../Reducers/lessonsOrderReducer/lessonsOrderReducer';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDialog({isLesson, isCourse}) {
  const openConfirmation = useSelector(isOpenConfirmation);
  const idToDelete = useSelector(id);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(handleOpenConfirmation());
  };

  const handleDelete = async () => {
    if (isCourse) {
      const lessonOrder = await dispatch(getLessonsOrder(idToDelete));
      await dispatch(deleteLessonOrder(lessonOrder.payload._id))
      const message = await dispatch(deleteCourse(idToDelete));
      dispatch(handleOpenConfirmation());
      toast.success(message);
      dispatch(toggleRefresh());
    } else if (isLesson) {
      const message = await dispatch(deleteLesson(idToDelete));
      dispatch(handleOpenConfirmation());
      toast.success(message);
      dispatch(toggleRefresh());
    } else {
      return;
    }
  }

  return (
    <React.Fragment>
      <Dialog
        open={openConfirmation}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='primary' onClick={handleClose}>Cancel</Button>
          <Button variant='contained' color='error' onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}