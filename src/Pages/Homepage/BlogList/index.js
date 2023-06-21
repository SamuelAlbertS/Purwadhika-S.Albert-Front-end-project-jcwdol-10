import React from "react";
import BlogItem from "./BlogItem";

const BlogList = (props) => {
    const blogs = props.blog
    return (
    <div className="grid grid-cols-3 gap-12 pt-40 pb-40 pl-10 pr-10">
        {blogs?.map((blog)=>(<BlogItem blog={blog}
         key={blog.id}
         props={blog}
         />))}
    </div>
    )
    
}   

export default BlogList