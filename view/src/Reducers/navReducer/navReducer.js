import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  open: false,
  openLogin: false,
  openConfirmation: false,
  idToDelete: "",
  loading: false,
  error: "",
  loggedUser: {},
};

export const createUser = createAsyncThunk(
  "users/POSTcreateUser",
  async (formData) => {
    await axios.post(
      `${process.env.REACT_APP_BASE_URL}/users`,
      {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
);

export const userLogin = createAsyncThunk(
  "login/POSTuserLogin",
  async (formData) => {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/login`,
      {
        email: formData.email,
        password: formData.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  }
);

export const editUser = createAsyncThunk(
  "users/PATCHeditUser",
  async ({ id, data }) => {
    const res = await axios.patch(
      `${process.env.REACT_APP_BASE_URL}/users/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  }
);

export const uploadProfilePic = createAsyncThunk(
  "users/POSTuploadProfilePic",
  async (file) => {
    const fileFormData = new FormData();
    fileFormData.append("file", file);
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/users/uploadImg`,
      fileFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return await res.data.source;
  }
);

const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    handleOpen: (state) => {
      state.open = !state.open;
    },
    handleOpenLogin: (state) => {
      state.openLogin = !state.openLogin;
    },
    handleOpenConfirmation: (state) => {
      state.openConfirmation = !state.openConfirmation;
    },
    resetToken: (state) => {
      state.token = "";
    },
    resetLoggedUser: (state) => {
      state.loggedUser = {};
    },
    setIdToDelete: (state, action) => {
      state.idToDelete = action.payload;
    },
    resetLoading: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = `${action.error.code}: ${action.error.message}`;
        toast.error(`${action.error.code}: ${action.error.message}`);
      })
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedUser = action.payload.user;
        localStorage.setItem("auth", JSON.stringify(action.payload.token));
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = `${action.error.code}: ${action.error.message}`;
        toast.error(`${action.error.code}: ${action.error.message}`);
      })
      .addCase(editUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedUser = action.payload;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = `${action.error.code}: ${action.error.message}`;
        toast.error(`${action.error.code}: ${action.error.message}`);
      })
      .addCase(uploadProfilePic.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadProfilePic.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(uploadProfilePic.rejected, (state, action) => {
        state.loading = false;
        state.error = `${action.error.code}: ${action.error.message}`;
        toast.error(`${action.error.code}: ${action.error.message}`);
      });
  },
});

export const id = (state) => state.navData.idToDelete;
export const isOpenConfirmation = (state) => state.navData.openConfirmation;
export const isLoginLoading = (state) => state.navData.loading;
export const isOpen = (state) => state.navData.open;
export const isLoginOpen = (state) => state.navData.openLogin;
export const user = (state) => state.navData.loggedUser;
export const {
  handleOpen,
  setIdToDelete,
  handleOpenConfirmation,
  handleOpenLogin,
  resetToken,
  resetLoggedUser,
  resetLoading,
} = navSlice.actions;

export default navSlice.reducer;
