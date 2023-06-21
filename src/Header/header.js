import React from "react";
import './Header.css';
import power from '../Assets/logout.png'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Store/slices/auth/slices";

function Header(){

    const imgURL = process.env.REACT_APP_IMAGE_URL

    const navigate = useNavigate()
    const dispatch = useDispatch()
 
    const {username, imgProfile, loading, token} = useSelector(state => {
        return {
            token : state.auth.token,
            loading : state.auth.loading,
            username : state.auth.username,
            imgProfile : state.auth.imgProfile
        }
    
    })

    const profImage = imgURL+imgProfile
    const RightNavbar = () => {
        if(token){
            return  <li className="px-4 font-bold border-slate-100 border cursor-pointer"><a onClick={() => dispatch(logout())}><img src={power} className="w-full h-full"/></a></li>
        }else{
            return(
                <>
                    <li className="px-4 font-bold border-slate-100 border cursor-pointer text-white items-center justify-center align-middle hover:bg-sky-600"><a onClick={() => navigate("/register")}>Register</a></li>
                    <li className="px-4 font-bold border-slate-100 border cursor-pointer text-white items-center justify-center align-middle hover:bg-sky-600"><a onClick={() => navigate("/login")}>Login</a></li>
                </>
            );
        }
    }

    return(
        <div className="fixed w-full z-10">
            <div className="flex flex-row bg-slate-600 w-full">
                <h1 className="pl-4 py-4 text-red-600">Blogging</h1>
                <h1 className="py-4 text-white cursor-pointer" onClick={()=>navigate("/")}>Website</h1>
                <div className="flex grow"/>
                <h1 className="py-4 right-0 text-white text-right px-4">
                    {token ? <>
                    <div className="flex flex-row items-end">
                        <img src={profImage} className="w-11 h-11 rounded" alt="Your profile Picture. Magnificent, isn't it?"></img>
                        <h1>Welcome,{username}</h1>
                    </div>
                    </> : <h1>Nice to meet you, visitor!</h1>
                    }
                    
                </h1>
            </div>
            <div className="">
                <nav className="">
                    <ul className="flex flex-row bg-slate-600 h-8">
                        <li className=" font-bold border-slate-100 border text-white">
                            <li className="peer px-4 font-bold flex-col" hidden={!token}>User Menu</li>
                            <ul className="hidden py-3 peer-hover:flex hover:flex h-auto flex-col bg-slate-600 drop-shadow-lg text-black">
                                <li><a class="my-3 hover:bg-gray-200 cursor-pointer" onClick={()=>navigate("/changePassword")}>Change Password</a></li>
                                <li><a class="my-3 hover:bg-gray-200 cursor-pointer" onClick={()=>navigate("/changeProfilePicture")}>Change Profile Picture</a></li>
                                <li><a class="my-3 hover:bg-gray-200 cursor-pointer" onClick={()=>navigate("/changeUsername")}>Change Username</a></li>
                                <li><a class="my-3 hover:bg-gray-200 cursor-pointer" onClick={()=>navigate("/changePhoneNumber")}>Change Phone Number</a></li>
                                <li><a class="my-3 hover:bg-gray-200 cursor-pointer" onClick={()=>navigate("/changeEmail")}>Change Email</a></li>
                                <li><a class="my-3 hover:bg-gray-200 cursor-pointer" onClick={()=>navigate("/CreateBlog")}>New Blog</a></li>
                                <li><a class="my-3 hover:bg-gray-200 cursor-pointer" onClick={()=>navigate("/MyBlog")}>My Blog</a></li>
                                <li><a class="my-3 hover:bg-gray-200 cursor-pointer" onClick={()=>navigate("/FavoriteBlog")}>My Favorite Blog</a></li>
                                <li><a class="my-3 hover:bg-gray-200 cursor-pointer" onClick={()=>navigate("/LikedBlog")}>Liked Blog</a></li>
                            </ul>
                        </li>                       
                        <li className="px-4 font-bold border-slate-100 border grow"></li>
                        <RightNavbar/>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Header;