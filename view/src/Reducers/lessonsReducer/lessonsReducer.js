import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const lessonsUploadVideo = createAsyncThunk(
  "lessons/POSTlessonsUploadVideo",
  async (file) => {
    const fileFormData = new FormData();
    fileFormData.append("file", file);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/lessons/uploadVideo`,
        fileFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return await res.data.source;
    } catch (error) {
      console.log(error);
    }
  }
);

export const lessonsUploadImg = createAsyncThunk(
  "lessons/POSTlessonsUploadImg",
  async (file) => {
    const fileFormData = new FormData();
    fileFormData.append("file", file);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/lessons/uploadImg`,
        fileFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return await res.data.source;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createLesson = createAsyncThunk(
  "lessons/POSTcreateLesson",
  async ({formData, img, video}) => {
    if (!img || !video) return;
    const bodyToSend = JSON.stringify(formData);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/lessons`,
        bodyToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return await res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  addLessonOpen: false,
  error: "",
  loading: false,
  lessonsRefresh: false,
  lesson: {},
};

const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {
    setAddLessonOpen: (state) => {
      state.addLessonOpen = !state.addLessonOpen;
    },
    toggleLessonsRefresh: (state) => {
        state.lessonsRefresh = !state.lessonsRefresh;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(lessonsUploadVideo.pending, (state) => {
        state.loading = true;
      })
      .addCase(lessonsUploadVideo.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(lessonsUploadVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = `${action.error.code}: ${action.error.message}`;
      })
      .addCase(lessonsUploadImg.pending, (state) => {
        state.loading = true;
      })
      .addCase(lessonsUploadImg.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(lessonsUploadImg.rejected, (state, action) => {
        state.loading = false;
        state.error = `${action.error.code}: ${action.error.message}`;
      })
      .addCase(createLesson.pending, (state) => {
        state.loading = true;
      })
      .addCase(createLesson.fulfilled, (state, action) => {
        state.loading = false;
        state.lesson = action.payload;
      })
      .addCase(createLesson.rejected, (state, action) => {
        state.loading = false;
        state.error = `${action.error.code}: ${action.error.message}`;
      });
  },
});

export const singleLesson = (state) => state.lessonsData.lesson;
export const isLessonsRefresh = (state) => state.lessonsData.lessonsRefresh;
export const isLessonError = (state) => state.lessonsData.error;
export const isLessonLoading = (state) => state.lessonsData.loading;
export const isAddLessonOpen = (state) => state.lessonsData.addLessonOpen;
export const { setAddLessonOpen, toggleLessonsRefresh } = lessonsSlice.actions;

export default lessonsSlice.reducer;
