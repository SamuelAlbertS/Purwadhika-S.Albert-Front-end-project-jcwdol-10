import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EmptyList from "../Homepage/BlogList/EmptyList";
import Header from "../../Header/header";
import Footer from "../../Footer/footer";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Chip from "../../Assets/components/chips";
import { getImage } from "../../Store/slices/blog/slices";
import { useDispatch } from "react-redux";

function BlogDetail(){
    const dispatch = useDispatch();
    const {id} = useParams()
    const [blog, setBlog] = useState(null)

    const imgURL = process.env.REACT_APP_IMAGE_URL

    const {articles} = useSelector(state => {
        return{
            articles : state.blog.articles
        }
    })

    const handleImageSubmit = (url) => {
        dispatch(getImage(url));
    }

    useEffect(()=>{
        let blog = articles.find(articles=>articles.id===parseInt(id));

        if(blog){
            setBlog(blog);
        }
    }, []);

    const imgprops = imgURL+blog?.imageURL;
    const imgavatar = imgURL+blog?.User.imgProfile;
    return(
    <>
    <Header/>
    <div className="h-full pt-28 pb-28 bg-slate-600">
        <Link to="/" className=" text-xs font-medium block mb-8 text-white"><span>&#8592;</span>Go Back</Link>
        {
            blog ? <div className=" w-10/12 mx-auto my-auto rounded-3xl border-4 border-solid bg-white px-4 py-4">
                <header className=" text-center">
                    <p className=" font-medium text-gray-600 text-sm">Published {blog.createdAt.toString().substring(0,10)}</p>
                    <h1 className=" font-extrabold font-serif">{blog.title}</h1>
                    <div>
                    <Chip label={blog.Category.name}></Chip>
                    </div>
                </header>
                <img src={imgprops} alt="cover" onClick={() => handleImageSubmit(imgprops)}/>
                <p>{blog.content}</p>
                <footer className="flex items-center mt-4 justify-between">
                <div className="flex items-center">
                    <img src={imgavatar} alt='avatar' className="w-10 h-10 rounded-full object-cover mr-2" onClick={() => handleImageSubmit(imgavatar)}/>
                    <div>
                        <h6 className=" font-extrabold font-serif">{blog.User.username}</h6>
                    </div>
                </div>
                </footer>
            </div> : (
                <EmptyList/>
            )
        }
    </div>
    <Footer/>
    </>
    )
}

export default BlogDetail
