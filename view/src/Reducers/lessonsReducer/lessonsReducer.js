import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCourseLessons = createAsyncThunk(
  "lessons/GETcourseLessons",
  async (id) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/lessons/${id}`
      );
      return await res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getSingleLesson = createAsyncThunk(
  "lessons/GETsingleLesson",
  async (id) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/lessons/single/${id}`
      );
      return await res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

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
  async ({ formData, img, video }) => {
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

export const updateLesson = createAsyncThunk(
  "lessons/PATCHupdateLesson",
  async ({ id, formData }) => {
    const bodyToSend = JSON.stringify(formData);
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/lessons/${id}`,
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

export const deleteLesson = createAsyncThunk(
  'lessons/DELETEdeleteLesson',
  async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/lessons/${id}`
      )
      return await res.data;
    } catch (error) {
      console.log(error);
    }
  }
)

const initialState = {
  addLessonOpen: false,
  editLesson: false,
  lessonId: "",
  error: "",
  loading: false,
  lessonsRefresh: false,
  lesson: {},
  allLessons: [],
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
    },
    setEditLesson: (state) => {
      state.editLesson = !state.editLesson;
    },
    setLessonId: (state, action) => {
      state.lessonId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCourseLessons.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCourseLessons.fulfilled, (state, action) => {
        state.loading = false;
        state.allLessons = action.payload;
      })
      .addCase(getCourseLessons.rejected, (state, action) => {
        state.loading = false;
        state.error = `${action.error.code}: ${action.error.message}`;
      })
      .addCase(getSingleLesson.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleLesson.fulfilled, (state, action) => {
        state.loading = false;
        state.lesson = action.payload;
      })
      .addCase(getSingleLesson.rejected, (state, action) => {
        state.loading = false;
        state.error = `${action.error.code}: ${action.error.message}`;
      })
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
      })
      .addCase(updateLesson.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLesson.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateLesson.rejected, (state, action) => {
        state.loading = false;
        state.error = `${action.error.code}: ${action.error.message}`;
      })
      .addCase(deleteLesson.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteLesson.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteLesson.rejected, (state, action) => {
        state.loading = false;
        state.error = `${action.error.code}: ${action.error.message}`;
      })
  },
});

export const singleLessonId = (state) => state.lessonsData.lessonId;
export const isEditLesson = (state) => state.lessonsData.editLesson;
export const allTheLessons = (state) => state.lessonsData.allLessons;
export const singleLesson = (state) => state.lessonsData.lesson;
export const isLessonsRefresh = (state) => state.lessonsData.lessonsRefresh;
export const isLessonError = (state) => state.lessonsData.error;
export const isLessonLoading = (state) => state.lessonsData.loading;
export const isAddLessonOpen = (state) => state.lessonsData.addLessonOpen;
export const {
  setAddLessonOpen,
  toggleLessonsRefresh,
  setEditLesson,
  setLessonId,
} = lessonsSlice.actions;

export default lessonsSlice.reducer;
