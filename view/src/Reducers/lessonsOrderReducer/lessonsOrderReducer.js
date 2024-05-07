import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    loading: false,
    error: '',
    lessonsOrder: {},
}

export const getLessonsOrder = createAsyncThunk(
    'lessonsOrder/GETlessonsOrder',
    async (courseId) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/lessonsOrder/${courseId}`)
            return await res.data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const editLessonOrder = createAsyncThunk(
    'lessonsOrder/PATCHeditLessonOrder',
    async ({id, newLessonsOrder}) => {
      try {
        const res = await axios.patch(`${process.env.REACT_APP_BASE_URL}/lessonsOrder/${id}`,
          {
            lessonsOrder: newLessonsOrder,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
      )
      return await res.data;
      } catch (error) {
        console.log(error);
      }
    }
  )

export const deleteLessonOrder = createAsyncThunk(
  'lessonsOrder/DELETElessonsOrder',
  async (id) => {
    try {
      const res = axios.delete(
        `${process.env.REACT_APP_BASE_URL}/lessonsOrder/${id}`
      )
      return (await res).data;
    } catch (error) {
      console.log(error);
    }
  }
)

  const lessonsOrderSlice = createSlice({
    name: 'lessonsOrder',
    initialState,
    reducers: {
      setLessonsOrder: (state, action) => {
        state.lessonsOrder = action.payload;
      },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getLessonsOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(getLessonsOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.lessonsOrder = action.payload;
            })
            .addCase(getLessonsOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = `${action.error.code}: ${action.error.message}`;
            })
            .addCase(editLessonOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(editLessonOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.lessonsOrder = action.payload;
            })
            .addCase(editLessonOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = `${action.error.code}: ${action.error.message}`;
            })
            .addCase(deleteLessonOrder.pending, (state) => {
              state.loading = true;
            })
            .addCase(deleteLessonOrder.fulfilled, (state) => {
              state.loading = false;
            })
            .addCase(deleteLessonOrder.rejected, (state, action) => {
              state.loading = false;
              state.error = `${action.error.code}: ${action.error.message}`;
            })
    }
  })

  export const isLessonsOrderLoading = (state) => state.lessonsOrderData.loading;
  export const isLessonsOrderError = (state) => state.lessonsOrderData.error;
  export const singleLessonsOrder = (state) => state.lessonsOrderData.lessonsOrder;
  export const { setLessonsOrder } = lessonsOrderSlice.actions;

export default lessonsOrderSlice.reducer;