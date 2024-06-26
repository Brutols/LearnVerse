import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  createUser,
  handleOpenLogin,
  isLoginOpen,
  userLogin,
} from "../../Reducers/navReducer/navReducer";
import { Link } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [isRegisterForm, setIsRegisterForm] = React.useState(false);
  const [formData, setFormData] = React.useState({});
  const openLogin = useSelector(isLoginOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    dispatch(handleOpenLogin());
    setIsRegisterForm(false);
  };

  const handleIsRegisterForm = () => {
    setIsRegisterForm(!isRegisterForm);
    setFormData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (isRegisterForm) {
      await dispatch(createUser(formData))
    } else {
      const testUser = await dispatch(userLogin(formData));
      const role = testUser.payload.user.role;
      role === "admin" ? navigate("/admin") : navigate("/");
    }

    isRegisterForm
      ? toast.success("Congrats! You are now registered")
      : toast.success("You have logged in");

    handleClose();
  };

  return (
    <React.Fragment>
      <Dialog open={openLogin} onClose={handleClose}>
        <DialogTitle>{isRegisterForm ? "Register" : "Login"}</DialogTitle>
        <DialogContent>
          {isRegisterForm && (
            <>
              <TextField
                onChange={handleChange}
                autoFocus
                required
                margin="dense"
                id="firstName"
                name="firstName"
                label="First Name"
                type="text"
                fullWidth
                variant="outlined"
              />
              <TextField
                onChange={handleChange}
                autoFocus
                required
                margin="dense"
                id="lastName"
                name="lastName"
                label="Last Name"
                type="text"
                fullWidth
                variant="outlined"
              />
            </>
          )}
          <TextField
            onChange={handleChange}
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
          />
          <TextField
            onChange={handleChange}
            autoFocus
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
          />
          <DialogContentText>
            {isRegisterForm
              ? "You already have an account?"
              : "You don't have an account?"}
            <Link component="button" onClick={handleIsRegisterForm}>
              {isRegisterForm ? "Login" : "Register now"}
            </Link>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>
            {isRegisterForm ? "Register" : "Login"}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
