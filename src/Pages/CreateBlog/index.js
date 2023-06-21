import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createBlog, getCategory } from "../../Store/slices/blog/slices";
import { useEffect, useState } from "react";
import Header from "../../Header/header";
import Footer from "../../Footer/footer";
import React from "react";
import { BlogVerificationSchema } from "../../Store/slices/blog/validation";
import { toast } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import Axios from 'axios'

const CreateBlog = () => {
    const [data, setData] = useState(null);
    const [file, setFile] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(1);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {category, username, isVerified, token, error} = useSelector(state => {
    return{
        category : state.blog.category,
        username : state.auth.username,
        isVerified : state.auth.isVerified,
        token : state.auth.token,
        error : state.blog.isError
    }
    })

    useEffect(()=>{
        dispatch(getCategory());
    }, [])

    if(!isVerified || !token){
        return navigate('/')
    }

    const eventHandler = (e) =>{
        console.log(e.target.value)
        setSelectedCategory(e.target.value)
    }
    return(
        <>
        <Header></Header>
        <div className="w-full h-full pt-32 pb-24 bg-slate-500 flex flex-row justify-center items-center -z-0">
            <div className="w-1/2 h-full bg-slate-300 shadow-sm rounded px-4 py-4 relative flex flex-col items-center">
                <h1 className="mb-10 w-full text-center text-4xl">Create Blog</h1>
                <Formik
                initialValues={{
                    title : "", 
                    file:"",
                    CategoryId:1,
                    content:"",
                    keywords:""}}
                validate={values => {
                    try{
                        BlogVerificationSchema.validateSync(values)
                        return{}
                    }catch(error){
                        toast.error(error, error?.message)
                        return {message : error?.message}
                    }
                }}
                onSubmit={(values, {setSubmitting}) => {
                    
                    setData({
                        "title" : values.title, 
                        "keywords" : values.keywords, 
                        "content" : values.content, 
                        "CategoryId" : selectedCategory,
                    })
                    let appenddata = JSON.stringify(data)
                    setFile(values.file)
                    console.log(file)
                    const formData = new FormData();
                    formData.append('file',file[file.length]);
                    formData.append('data',appenddata);

                    const token = localStorage.getItem("token");

                    const response = Axios.post("https://minpro-blog.purwadhikabootcamp.com/api/blog", formData, { 
                        headers : {
                            'Content-Type' : 'multipart/form-data',
                            'Authorization' : 'Bearer ' + token,
                        }   
                    })
                    .then((respond)=>{
                        console.log(respond)
                    })
                    .catch((error)=>{
                        console.log(error.response.data)
                    })
                    console.log(response)
                    // alert("Post created!")
                    setSubmitting(false)
                    return{}

                    // dispatch(createBlog(formData))
                    
                }}>
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting})=>(
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-4 px-2 py-2">
                            <label for="title">Title :</label>
                            <input type="text" 
                            id="title" 
                            className="rounded-xl border-2 border-blue-400"
                            name="title" 
                            required
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}></input>

                            <label for="file">Image / Video : </label>
                            <input type="file" 
                            id="file" 
                            accept="file/*"
                            name="file"
                            value={values.file}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required></input>

                            <label for="category">Category :</label>
                            <select onChange={eventHandler} onBlur={handleBlur}>
                                {
                                    category?
                                    category?.map((category, index)=>(
                                        <option key={index} 
                                        value={category.id} 
                                        className="rounded-xl border-2 border-blue-400"
                                        name
                                        >
                                            {category.name}
                                        </option>
                                    ))
                                    :
                                    <div>
                                    </div>
                                }
                            </select>

                            <label for="contents">Contents:</label>
                            <textarea id="contents"
                            name="content" 
                            className="rounded-xl border-2 border-blue-400 w-full h-80"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.content}
                            required></textarea>

                            <label for="keywords">Keywords (separated by commas):</label>
                            <input type="text"
                            id="keywords"
                            placeholder="keywords"
                            value={values.keywords}
                            onChange={handleChange}
                            onBlur={handleBlur}/>
                            {/* {toast.error(error)} */}

                            <button type="submit" className="btn btn-primary" >Publish</button>
                        </div>
                    </form>
                    )}
                </Formik>
            </div>

        </div>
        <Footer></Footer>
        </>
    )
}

export default CreateBlog;