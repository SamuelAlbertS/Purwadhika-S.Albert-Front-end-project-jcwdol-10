import React from "react";
import Chip from "../../../../Assets/components/chips";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LikeArticle } from "../../../../Store/slices/blog/slices";

const imgURL = process.env.REACT_APP_IMAGE_URL

const BlogItem = (blogprops) => {
    const dispatch = useDispatch()

    const onButtonLike = (id) => {dispatch(LikeArticle({BlogId : id}))}
    const props = blogprops.props
    const imgprops = imgURL+props.imageURL;
    const imgavatar = imgURL+props.User.imgProfile;
    return(
        <div className="flex flex-col">
            <img src={imgprops} alt='cover' className="w-full h-60 object-cover rounded-2xl mb-2"></img>
            <Chip label={props.Category?.name}/>
            <h3 className="ml-2 mr-4">{props.title}</h3>
            <p className="relative max-h-12 overflow-hidden text-xs pr-2 text-stone-500 before:absolute before:content-[attr(before)] bottom-0 right-0">{props.content}</p>
            <footer className="flex items-center mt-4 justify-between">
                <div className="flex items-center">
                    <img src={imgavatar} alt='avatar' className="w-10 h-10 rounded-full object-cover mr-2"/>
                    <div>
                        <h6>{props.User.username}</h6>
                        <p>{props.createdAt.toString().substring(0,10)}</p>
                    </div>
                </div>
                <Link to={`/blog/${props.id}`} className="decoration-inherit"><span>&#8594;</span></Link>
            </footer>
            <button className="btn" onClick={()=>onButtonLike(props.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                Like
            </button>
        </div>
    )
};

export default BlogItem;