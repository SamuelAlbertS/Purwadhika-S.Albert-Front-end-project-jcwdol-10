import { createSlice } from "@reduxjs/toolkit";
import { LikeArticle, createBlog, getArticles, getCategory, DeleteArticle, GetFavorite, GetLikedBlog} from "./slices";

const INITIAL_STATE = {
    articles : [],
    totalPage : 1,
    currentPage : 1,
    isLoading : false,
    isLike : false,
    filteredArticles : [],
    category : [],
    isError : null,
    likedBlog : [],
    favoriteBlog : []
}

const BlogSlice = createSlice({
    name : "blog",
    initialState : INITIAL_STATE,
    reducers : {
        SearchArticles : (state, action)=>{
            state.filteredArticles = state.data.filter(articles => {
                return articles.category?.toLowerCase().includes(action.payload?.toLowerCase)
            })
        }
    },
    extraReducers : {
        [getArticles.pending] : (state, action) => {
            state.isLoading = true
        },
        [getArticles.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                isLoading : false,
                articles : action.payload?.result,
                totalPage : action.payload?.page,
                currentPage : action.payload?.blogPage
            })
        },
        [getArticles.rejected] : (state, action) => {
            state.isLoading = false
        },
        [getCategory.pending] : (state, action) => {
            state.isLoading = true
        },
        [getCategory.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                isLoading : false,
                category : action.payload
            })
        },
        [getCategory.rejected] : (state, action) => {
            state = Object.assign(state, {
                isLoading : false,
                category : []
            })
        },
        [createBlog.pending] : (state, action) => {
            state.isLoading = true
        },
        [createBlog.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                isLoading : false,
            })
        },
        [createBlog.rejected] : (state, action) => {
            state.isLoading = false
            state.isError = action?.payload
        },
        [LikeArticle.pending] : (state, action) => {
            state.isLike = true;
        },
        [LikeArticle.fulfilled] : (state, action) => {
            state.isLike = false;
        },
        [LikeArticle.rejected] : (state, action) => {
            state.isLike = false;
        },
        [DeleteArticle.pending] : (state,action) => {
            state.isLoading = true
        },
        [DeleteArticle.fulfilled] : (state,action) => {
            state.isLoading = false
        },
        [DeleteArticle.rejected] : (state,action) => {
            state.isLoading = false
        },
        [GetFavorite.pending] : (state,action) => {
            state.isLoading = true
        },
        [GetFavorite.fulfilled] : (state,action) => {
            state = Object.assign(state, {
                isLoading : false,
                favoriteBlog : action.payload?.result,
                totalPage : action.payload?.page,
                currentPage : action.payload?.blogPage
            })
        },
        [GetFavorite.rejected] : (state,action) => {
            state.isLoading = false
        },
        [GetLikedBlog.pending] : (state,action) => {
            state.isLoading = true
        },
        [GetLikedBlog.fulfilled] : (state,action) => {
            state = Object.assign(state, {
                isLoading : false,
                likedBlog : action.payload?.result,
                totalPage : action.payload?.page,
                currentPage : action.payload?.blogPage
            })
        },
        [GetLikedBlog.rejected] : (state,action) => {
            state.isLoading = false
        }


    }

})

export default BlogSlice.reducer