import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  addCourseOpen: false,
  loading: false,
  error: "",
  courses: [],
  singleCourse: {},
  refresh: false,
};

export const getAllCourses = createAsyncThunk(
  "courses/GETallCourses",
  async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/courses`);
      return await res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getSingleCourse = createAsyncThunk(
  'courses/GETsingleCourse',
  async (id) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/courses/${id}`);
      return await res.data;
    } catch (error) {
      console.log(error);
    }
  }
)

export const coursesUploadImg = createAsyncThunk(
  "courses/POSTcoursesUploadImg",
  async (file) => {
    const fileFormData = new FormData();
    fileFormData.append("file", file);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/courses/uploadImg`,
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

export const createCourse = createAsyncThunk(
  "courses/POSTcreateCourse",
  async ({formData, file}) => {
    if (!file) return;
    const bodyToSend = JSON.stringify(formData);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/courses`,
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

export const createLessonsOrder = createAsyncThunk(
  "courses/POSTcreateLessonsOrder",
  async (id) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/lessonsOrder`,
        {
          courseId: id,
          lessonsOrder: [],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteCourse = createAsyncThunk(
  'courses/DELETEdeletecourses',
  async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/courses/${id}`
      )
      return await res.data;
    } catch (error) {
      console.log(error);
    }
  }
)

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setAddCoursesOpen: (state) => {
      state.addCourseOpen = !state.addCourseOpen;
    },
    toggleRefresh: (state) => {
        state.refresh = !state.refresh;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = `${action.error.code}: ${action.error.message}`;
      })
      .addCase(getSingleCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.singleCourse = action.payload;
      })
      .addCase(getSingleCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = `${action.error.code}: ${action.error.message}`;
      })
      .addCase(coursesUploadImg.pending, (state) => {
        state.loading = true;
      })
      .addCase(coursesUploadImg.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(coursesUploadImg.rejected, (state, action) => {
        state.loading = false;
        state.error = `${action.error.code}: ${action.error.message}`;
      })
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCourse.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = `${action.error.code}: ${action.error.message}`;
      })
      .addCase(deleteCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCourse.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = `${action.error.code}: ${action.error.message}`;
      })
  },
});

export const singleCourseState = (state) => state.coursesData.singleCourse;
export const isRefresh = (state) => state.coursesData.refresh;
export const allCourses = (state) => state.coursesData.courses;
export const errorState = (state) => state.coursesData.error;
export const isCourseLoading = (state) => state.coursesData.loading;
export const isAddCourseOpen = (state) => state.coursesData.addCourseOpen;
export const { setAddCoursesOpen, toggleRefresh } = coursesSlice.actions;

export default coursesSlice.reducer;
