import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.instance";
import Axios from "axios";
import { toast } from "react-hot-toast";

const url = "https://minpro-blog.purwadhikabootcamp.com/api/blog?"

export const getCategory = createAsyncThunk(
    "blog/getCategory",
    async(payload, {rejectWithValue})=>{
        try{
            const response = await Axios.get("https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory")
            console.log(response.data)
            return response.data
            
        }catch(error){
            console.log(error);
            return rejectWithValue(error.response.data);
        } 
    }
)

export const getArticles = createAsyncThunk(
    "blog/getArticles",
    async(payload, {rejectWithValue})=>{
        try{
            const {id_cat, page, sort} = payload
            const PARAMETER = `id_cat=${id_cat}&sort=${sort}&page=${page}`

            const response = await Axios.get(url + encodeURI(PARAMETER))
            return response.data
  
        }catch(error){
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
)

export const createBlog = createAsyncThunk(
    "blog/createBlog",
    async(payload, {rejectWithValue})=>{
        try{  
            const token = localStorage.getItem("token")
            console.log(token)
            // const formData = new FormData();
            // let data = JSON.stringify(payload.data)
            // formData.append('file',payload.file);
            // formData.append('data', data)
            // console.log(formData)
            // const response = await api.post("/blog", payload)
            const response = await api.post("/blog", payload, { headers : {'Content-Type' : 'multipart/form-data'
               }})
            alert(response);
            alert("Post created!")
            return{}
        }catch(error){
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
)

export const getImage = createAsyncThunk(
    "blog/getImage",
    async(payload, {rejectWithValue})=>{
        try{
            const response = await Axios.get(payload);
            window.open(response.request.responseURL, '_blank');
        }catch(error){
            toast.error(error)
            return rejectWithValue(error.message)
        }
    }
)

export const LikeArticle = createAsyncThunk(
    "blog/like",
    async(payload, {rejectWithValue})=>{
        try{
            await api.post("/blog/like",payload)
            return 
        }catch(error){
            return rejectWithValue(error.response ? error.response.data : error)
        }
    }
)

export const DeleteArticle = createAsyncThunk(
    "blog/delete",
    async(payload, {rejectWithValue})=>{
        try{
            let data = {
                id : payload
            }
            await api.patch(`/blog/remove/${payload}`)
            return{}
        }catch(error){
            return rejectWithValue(error.response ? error.response.data : error)
        }
    }
)

export const GetLikedBlog = createAsyncThunk(
    "blog/getLike",
    async(payload, {rejectWithValue})=>{
        try{
            const response = await api.get("/blog/pagLike");
            return response.data;
        }catch(error){
            return rejectWithValue(error.response ? error.response.data : error)
        }
    }
)

export const GetFavorite = createAsyncThunk(
    "blog/getFavorite",
    async(payload, {rejectWithValue})=>{
        try{
            const response = await api.get("/blog/pagFav");
            return response.data;
        }catch(error){
            return rejectWithValue(error.response ? error.response.data : error)
        }
    }
)