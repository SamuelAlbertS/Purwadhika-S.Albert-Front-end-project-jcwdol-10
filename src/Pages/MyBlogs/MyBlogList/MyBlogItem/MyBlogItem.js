import React from "react";
import Chip from "../../../../Assets/components/chips";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DeleteArticle, LikeArticle } from "../../../../Store/slices/blog/slices";

const imgURL = process.env.REACT_APP_IMAGE_URL

const MyBlogItem = (blogprops) => {
    const dispatch = useDispatch()

    const onButtonDelete = (id) => {dispatch(DeleteArticle(id))}
    const props = blogprops.props
    const imgprops = imgURL+props.imageURL;
    const imgavatar = imgURL+props.User.imgProfile;
    return(
        <div className="flex flex-col">
            <img src={imgprops} alt='cover' className="w-full h-60 object-cover rounded-2xl mb-2"></img>
            <Chip label={props.Category.name}/>
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
            <button className="btn btn-warning" onClick={()=>onButtonDelete(props.id)}>
                Delete
            </button>
        </div>
    )
};

export default MyBlogItem;