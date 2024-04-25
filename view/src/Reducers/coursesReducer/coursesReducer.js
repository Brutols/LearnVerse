import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    addCourseOpen: false
}

const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        setAddCoursesOpen: (state) => {
            state.addCourseOpen = !state.addCourseOpen
        }
    }
})

export const isAddCourseOpen = (state) => state.coursesData.addCourseOpen;
export const { setAddCoursesOpen } = coursesSlice.actions;

export default coursesSlice.reducer;