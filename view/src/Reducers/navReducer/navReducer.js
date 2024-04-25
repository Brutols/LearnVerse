import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    open: false,
    openLogin: false,
    loading: false,
    error: '',
    token: '',
    loggedUser: {}
}

export const createUser = createAsyncThunk(
    'users/POSTcreateUser',
    async (formData) => {
        await axios.post(
            `${process.env.REACT_APP_BASE_URL}/users`,
            {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
    }
)

export const userLogin = createAsyncThunk(
    'login/POSTuserLogin',
    async (formData) => {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/login`,
                {
                    email: formData.email,
                    password: formData.password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            return res.data
        } catch (error) {
            console.log(error);
        }
        
    }
)

const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        handleOpen: (state) => {
            state.open = !state.open
        },
        handleOpenLogin: (state) => {
            state.openLogin = !state.openLogin
        },
        resetToken: (state) => {
            state.token = ''
        }
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
                state.error = `${action.error.code}: ${action.error.message}`
            })
            .addCase(userLogin.pending, (state) => {
                state.loading = false;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.loggedUser = action.payload.user;
                localStorage.setItem('auth', JSON.stringify(action.payload.token));
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = `${action.error.code}: ${action.error.message}`
            })
    }
})

export const isOpen = (state) => state.navData.open;
export const isLoginOpen = (state) => state.navData.openLogin;
export const authToken = (state) => state.navData.token;
export const user = (state) => state.navData.loggedUser;
export const {handleOpen, handleOpenLogin, resetToken} = navSlice.actions;

export default navSlice.reducer;