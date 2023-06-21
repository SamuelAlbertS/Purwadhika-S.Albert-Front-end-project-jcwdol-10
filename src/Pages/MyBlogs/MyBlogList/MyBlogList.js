import React from "react";
import MyBlogItem from "./MyBlogItem/MyBlogItem";
import { useSelector } from "react-redux";

const MyBlogList = (props) => {

    const {username} = useSelector(state=>{
        return {
            username : state.auth.username
        }
    })

    const blogs = props.blog.filter(blog => blog.User.username === username)
    return (
    <div className="grid grid-cols-3 gap-12 pt-40 pb-40 pl-10 pr-10">
        {blogs?.map((blog)=>(<MyBlogItem blog={blog}
         key={blog.id}
         props={blog}
         />))}
    </div>
    )
    
}   

export default MyBlogList