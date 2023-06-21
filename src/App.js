import Header from './Header/header.js';
import Footer from './Footer/footer.js';
import './App.css';
import React, { useEffect } from 'react';
import ChangePassword from './Pages/ChangePassword/index.js';
import {Route, Routes, Router} from 'react-router-dom';
import RegisterPage from './Pages/Register/index.js';
import LoginPage from './Pages/Login/index.js';
import UpdateProfile from './Pages/UpdateProfileData/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { keepLogin } from './Store/slices/auth/slices.js';
import ProtectedRoute from './protected.routes.js';
import UpdateEmail from './Pages/UpdateEmail/index.js';
import UpdatePhoneNumber from './Pages/UpdatePhone/index.js';
import VerificationPage from './Pages/Verification/index.js';
import HomePage from './Pages/Homepage/index.js';
import BlogDetail from './Pages/Blogs/index.js';
import CreateBlog from './Pages/CreateBlog/index.js';
import UpdateProfilePicture from './Pages/UploadProfilePicture/UploadProfilePicture.js';
import ForgetPassword from './Pages/ForgetPassword/forget.js';
import NotFoundPage from './Pages/Notfound/notfound.js';
import ResetPassword from './Pages/ResetPassword/index.js';
import MyBlog from './Pages/MyBlogs/Myblog.js';
import LikedBlog from './Pages/LikedBlogs/liked.js';
import FavoriteBlog from './Pages/FavoriteBlogs/favorites.js';

function App() {
  const dispatch = useDispatch()

  let { isKeepLoginLoading } = useSelector(state=>{
    return{
      isKeepLoginLoading : state.auth?.isKeepLoginLoading
    }
  })
  useEffect(() => {
    dispatch(keepLogin())
  },[])

  if (isKeepLoginLoading) return (
    <div className="h-screen w-screen flex flex-row align-bottom justify-center">
			<span className="loading loading-dots loading-lg"></span>
		</div>
  )

  return (
    <>
      <Routes>
        <Route path="/register"
        element={
          <>
          <Header/>
          <RegisterPage/>
          <Footer/>
          </>
        }/>
        <Route path="/" Component={HomePage}></Route>
        <Route path="/login"
        element={
          <>
          <Header/>
          <LoginPage/>
          <Footer/>
          </>
        }/>
        <Route path="/verification/:token" element={
          <>
          <Header/>
          <VerificationPage/>
          <Footer/>
        </>
        }/>
        <Route path="/changePassword"
        element={
          <>
          <Header/>
          <ChangePassword/>
          <Footer/>
          </>
        }/>
        <Route path="/changeUsername"
        element={
          <>
          <Header/>
          <UpdateProfile/>
          <Footer/>
          </>
        }/>
        <Route path="/changeEmail"
        element={
          <>
          <Header/>
          <UpdateEmail/>
          <Footer/>
          </>
        }/>
        <Route path="/changePhoneNumber"
        element={
          <>
          <Header/>
          <UpdatePhoneNumber/>
          <Footer/>
          </>
        }/>
        <Route path="/blog/:id" Component={BlogDetail}>
        </Route>
        <Route path="/createBlog" Component={CreateBlog}></Route>
        <Route path="/changeProfilePicture" Component={UpdateProfilePicture}></Route>
        <Route path="/forgetPassword" Component={ForgetPassword}></Route>
        <Route path="/reset-Password/:token" Component={ResetPassword}></Route>
        <Route path="/MyBlog" Component={MyBlog}/>
        <Route path="/LikedBlog" Component={LikedBlog}/>
        <Route path="/FavoriteBlog" Component={FavoriteBlog}/>
        <Route Component={NotFoundPage}></Route>
      </Routes>
        
    </>
  );
}

export default App;
/**
  <Routes>
        <Route path="/register"
        element={
          
        }/>
        
      </Routes>
*/