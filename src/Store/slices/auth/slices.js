import api from "../../utils/api.instance"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { RegisterValidationSchema, forgetPasswordSchema, resetPasswordSchema } from "./validation"
import { changePasswordSchema } from "./validation"
import { changeUsernameSchema } from "./validation"
import { changeEmailSchema } from "./validation"
import { changePhoneNumberSchema } from "./validation"
import { toast } from "react-hot-toast"

export const register = createAsyncThunk(
    "auth/register",
    async(payload, {rejectWithValue}) => {
        try{
            //do validation
            // console.log(payload)
            await RegisterValidationSchema.validate(payload)

            //do validation in remote
            // const response = await api.get("/auth" + `?username=${payload.username}&email=${payload.email}`)
            // .then((respond)=>{
            //     if(respond.data?.length > 0){
            //         return rejectWithValue({message : "username or email already exist."})
            //     }
            // })
            // .catch((error)=>{
            //     console.log(error)
            // })
            // if(response.data?.length > 0){
            //     return rejectWithValue({message : "username or email already exist."})
            // }
            //save data to database
            const data = {
                username : payload.username,
                email : payload.email,
                password : payload.password,
                phone : payload.phonenumber,
                confirmPassword : payload.repassword
            }
            console.log(data)
            const response2 = await api.post("/auth",data)
            localStorage.setItem("token", response2)

            
            alert("Please check your email!")
            return response2.data[0]    
            
        }catch(error){
            console.error(error.message)
            return rejectWithValue(error.response.data)
        }
    }
)

export const login = createAsyncThunk(
    "auth/login",
    async (payload, {rejectWithValue}) => {
        try{
        let data = {
            username : payload.username,
            password : payload.password
        }
        const response = await api.post(`/auth/login`,data)
        console.log(response.data.isAccountExist)
        if(response.data?.length === 0) {
            return rejectWithValue({ message : "username or password doesn't exist."})
        }
        if(response.data[0]?.isVerified === false){
           return rejectWithValue({ message : "account not verified!"})
        }

        localStorage.setItem("token",response.data.token)   
        return response.data
        }catch(error){
            console.error(error)
            return rejectWithValue(error.response.data)
        }
    }
)

export const keepLogin = createAsyncThunk(
    "auth/keepLogin",
    async(payload, {rejectWithValue}) => {

        try{
            const token = localStorage.getItem("token")
            console.log("token ", token)
            if(!token){
                return rejectWithValue({ message : "token not found."})
            }
            const response = await api.get(`/auth`)
            console.log(response.data)
            return response.data
        }catch(error){
            console.error(error)
            return rejectWithValue(error.response.data)
        }
    }
)

export const logout = createAsyncThunk(
    "auth/logout",
    async(payload, {rejectWithValue}) => {
        try{
            localStorage.removeItem("token")
            return{}
        }catch(error){
            console.error(error)
            return rejectWithValue(error.response.data)
        }
    }
)

export const changePassword = createAsyncThunk(
    "auth/changePassword",
    async(payload, {rejectWithValue}) => {
        try{
            let data = {
                currentPassword : payload.currentpassword,
                password : payload.newpassword,
                confirmPassword : payload.repassword
            }
            await changePasswordSchema.validate(payload)
            const token = localStorage.getItem("token")
            const id = payload.id
            const response = await api.patch("/auth/verify",data)
            alert("password changed")
            return{}
        }catch(error){
            console.error(error)
            return rejectWithValue(error.response.data)
        }
    }
)

export const verifyEmail = createAsyncThunk(
    "auth/verifyEmail",
    async(token, {rejectWithValue}) => {
        try{
            console.log(token)
            localStorage.setItem("jwttoken", token)
            const response = await api.patch(`/auth/verify`,{token},{
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
            if(response.data?.length === 0){
                return rejectWithValue({message : "The account doesn't exist."})
            }
            alert(response.data)
            return response.data
        }catch(error){
            console.error(error)
            return rejectWithValue(error.response.data)
        }
        
    }
)

export const changeUsername = createAsyncThunk(
    "auth/changeUsername",
    async(payload, {rejectWithValue}) => {
        try{
            await changeUsernameSchema.validate(payload)
            let data = {
                currentUsername : payload.username,
                newUsername : payload.newUsername
            }
            const id = payload.id
            const response = await api.patch(`/auth/changeUsername`,data)
            if(response.data?.length === 0) {
                return rejectWithValue({ message : "Username is wrong."})
            }
            alert("username changed.")
            return{}
        }catch(error){
            console.error(error)
            return rejectWithValue(error.response.data)
        }
    }
)

export const changeEmail = createAsyncThunk(
    "auth/changeEmail",
    async(payload, {rejectWithValue}) => {
        try{
            await changeEmailSchema.validate(payload)
            let data = {
                currentEmail : payload.email,
                newEmail : payload.newEmail
            }
            const id = payload.id
            const response = await api.patch(`/auth/changeEmail`,data)
            alert("Email changed")
            return{}
        }catch(error){
            console.error(error)
            return rejectWithValue(error.response.data)
        }
    }
)

export const changePhoneNumber = createAsyncThunk(
    "auth/changePhoneNumber",
    async(payload, {rejectWithValue}) => {
        try{
            await changePhoneNumberSchema.validate(payload)
            let data = {
                currentPhone : payload.phone,
                newPhone : payload.newPhone
            }
            const id = payload.id
            const response = await api.patch("/auth/changePhone",data)
            alert("Phone changed")
            return{}
        }catch(error){
            console.error(error)
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateProfilePicture = createAsyncThunk(
    "auth/updatePicture",
    async(payload, {rejectWithValue}) => {
        try{
            const {data} = await api.post("/profile/single-uploaded", payload)
            alert("Picture changed")

        }catch(error){
            console.error(error)
            toast.error("Whoops! Something wrong")
            return rejectWithValue(error.response.data)
        }
    }
)

export const forgetPassword = createAsyncThunk(
    "auth/forgetPassword",
    async(payload, {rejectWithValue}) => {
        try{
            await forgetPasswordSchema.validate(payload)
            const response= await api.put("/auth/forgotPass",payload);
            if(response.data[0].length == 0){
                return rejectWithValue("Whoops, something wrong.");
            }
            alert("Please check your email.")
            localStorage.setItem("token",response.data)
            return response.data;
        }catch(error){
            toast.error("Whoops! Something wrong")
            return rejectWithValue(error.response.data)
        }
    }
)

export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async(payload, {rejectWithValue}) => {
        try{
            await resetPasswordSchema.validate(payload)
            let data = {
                password : payload.password,
                confirmPassword : payload.confirmPassword
            }
            const response = await api.patch("/auth/resetPass",data)
            alert("Password Changed. Please remember things at it is.")
            return response.data;
        }catch(error){
            toast.error("Whoops! Something wrong")
            return rejectWithValue(error.response.data)
        }
    }
)