import { createSlice } from "@reduxjs/toolkit";

import { register, login, logout, keepLogin, changePassword, verifyEmail, changeEmail, changePhoneNumber, changeUsername, updateProfilePicture, forgetPassword, resetPassword} from "./slices";

const authSlice = createSlice({
    name : "auth",
    initialState : {
        loading : false,
        isKeepLoginLoading : false,
        id : null,
        username : null,
        password : null,
        email : null,
        phone : null,
        token : null,
        imgProfile : "",
        isVerified : null,
        isChangeLoading : null
    },
    reducers : {

    },
    extraReducers : {
        [register.pending] : (state, action) => {
            state.loading = true
        },
        [register.fulfilled] : (state, action) => {
            state.loading = false
            state.id = action.payload?.id
            state.username = action.payload?.username
            state.password = action.payload?.password
            state.email = action.payload?.email
            state.phone = action.payload?.phone
            state.token = action.payload?.token
            state.imgProfile = action.payload?.imgProfile
            state.isVerified = action.payload?.isVerified
        },
        [register.rejected] : (state,action) => {
            state.loading = false
        },
        [login.pending] : (state,action) => {
            state.loading = true
        },
        [login.fulfilled] : (state,action) => {
            console.log(action.payload)
            state.loading = false
            state.id = action.payload?.id
            state.username = action.payload?.isAccountExist.username
            state.password = action.payload?.isAccountExist.password
            state.email = action.payload?.isAccountExist.email
            state.phone = action.payload?.isAccountExist.phone
            state.token = action.payload?.token
            state.imgProfile = action.payload?.isAccountExist.imgProfile
            state.isVerified = action.payload?.isAccountExist.isVerified
        },
        [login.rejected] : (state,action) => {
            state.loading = false
        },
        [keepLogin.pending] : (state, action) => {
            state.isKeepLoginLoading = true
        },
        [keepLogin.fulfilled] : (state, action) => {
            state.isKeepLoginLoading = false
            state.id = action.payload?.id
            state.username = action.payload?.username
            state.password = action.payload?.password
            state.email = action.payload?.email
            state.phone = action.payload?.phone
            state.token = localStorage.getItem("token")
            state.imgProfile = action.payload?.imgProfile
            state.isVerified = action.payload?.isVerified
        },
        [keepLogin.rejected] : (state, action) => {
            state.isKeepLoginLoading = false
        },
        [logout.pending] : (state, action) => {
            state.loading = true
        },
        [logout.fulfilled] : (state, action) => {
            state.loading = false
            state.id = null
            state.username = null
            state.password = null
            state.email = null
            state.phone = null
            state.token = null
            state.imgProfile = null
            state.isVerified = false
        },
        [logout.rejected] : (state,action) => {
            state.loading = false
        },
        [changePassword.pending] : (state,action) => {
            state.loading = true
        },
        [changePassword.fulfilled] : (state,action) => {
            state.loading = false
            state.password = action.payload?.newpassword
        },
        [changePassword.rejected] : (state,action) => {
            state.loading = false
        },
        [verifyEmail.pending] : (state, action) => {
            state.loading = true
        },
        [verifyEmail.fulfilled] : (state,action) => {
            state.loading = false
            state.isVerified = true
        },
        [verifyEmail.rejected] : (state, action) => {
            state.loading = false
        },
        [changeEmail.pending] : (state, action) => {
            state.isChangeLoading = true
        },
        [changeEmail.fulfilled] : (state, action) => {
            state.isChangeLoading = false
            state.email = action.payload?.newEmail
        },
        [changeEmail.rejected] : (state, action) => {
            state.isChangeLoading = false
        },
        [changePhoneNumber.pending] : (state, action) => {
            state.isChangeLoading = true
        },
        [changePhoneNumber.fulfilled] : (state, action) => {
            state.isChangeLoading = false
            state.phone = action.payload?.newPhone
        },
        [changePhoneNumber.rejected] : (state, action) => {
            state.isChangeLoading = false
        },
        [changeUsername.pending] : (state, action) => {
            state.isChangeLoading = true
        },
        [changeUsername.fulfilled] : (state, action) => {
            state.isChangeLoading = false
            state.username = action.payload?.newUsername
        },
        [changeUsername.rejected] : (state, action) => {
            state.isChangeLoading = false
        },
        [updateProfilePicture.pending] : (state, action) => {
            state.isChangeLoading = true
        },
        [updateProfilePicture.fulfilled] : (state, action) => {
            state.isChangeLoading = false
            state.imgProfile = action.payload
        },
        [updateProfilePicture.rejected] : (state, action) => {
            state.isChangeLoading = false
        },
        [forgetPassword.pending] : (state, action) => {
            state.loading = true
        },
        [forgetPassword.fulfilled] : (state,action) => {
            state.loading = false
        },
        [forgetPassword.rejected] : (state, action) => {
            state.loading = false
        },
        [resetPassword.pending] : (state, action) => {
            state.loading = true
        },
        [resetPassword.fulfilled] : (state, action) => {
            state.loading = false
        },
    }
})

export default authSlice.reducer