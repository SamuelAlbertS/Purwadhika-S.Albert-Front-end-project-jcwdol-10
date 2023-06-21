import { LikeArticle, getArticles, getCategory } from "../../Store/slices/blog/slices";
import React, { useEffect, useState } from "react";
import Header from "../../Header/header";
import Footer from "../../Footer/footer";
import BlogList from "./BlogList";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../Assets/searchPage";

function HomePage (){
    const dispatch = useDispatch()
    const [searchCategory, setSearchCategory] = useState("");
    const [showArticles, setShowArticles] = useState(false);
    const {articles, filteredArticles, category, totalpage} = useSelector(state => {
        return{
            articles : state.blog.articles,
            filteredArticles : state.blog.filteredArticles,
            category : state.blog.category,
            totalpage : state.blog.totalPage
        }
    })
    const [pagination, setPagination] = useState(1);
    const [idcat, setIdcat] = useState(1)
    const [sortcat, setSortCat] = useState("ASC")

    useEffect(() => {
        dispatch(getArticles({id_cat : idcat, page : pagination, sort : "ASC"}))
        dispatch(getCategory());
    },[pagination, idcat])
    const handleEvent = (event) =>{
        setSearchCategory(event.target.value)
    }
    const submitCategory = () =>{
        let data = []
        if(searchCategory === null) return
        if(articles){
            let count = 0;
            articles.forEach(article => {
                if(article.Category.name === searchCategory){
                    data.push(article)
                    setShowArticles(data)
                    count++;
                }
            });
            if(count == 0){
                alert(`No Data with category "${searchCategory}" Found`)
            }
        }
    }
    

    const ChangePage = (value) => {
        if(value === "PREV" && pagination-1 > 0){
            setPagination(pagination-1)
        }else if(pagination+1 <= totalpage){
            setPagination(pagination+1)
        }
    }

    const ChangeAlign = (value) => {
        if(value === "ASC"){
            setSortCat("ASC")
        }else{
            setSortCat("DES")
        }
    }

    const ChangeCategory = (value) => {
        setIdcat(value);
    }

    const eventHandler = (e) =>{
        ChangeCategory(e.target.value)
    }

    return(
        <>
            <Header/>
            <button className="btn btn-neutral mt-24 absolute" onClick={()=>ChangePage("PREV")}>
                Previous Page
            </button>
            <button className="btn btn-neutral mt-24 ml-36 absolute" onClick={()=>ChangePage("NEXT")}>
                Next Page
            </button>
            <button className="btn btn-neutral mt-24 ml-72 absolute" onClick={()=>sortcat==="ASC"?ChangeAlign("DSC"):ChangeAlign("ASC")}>
                Change Sorting Method.
            </button>
            <div className="parent-container absolute ml-[600px] mt-24">
                <div className="w-fit bg-white rounded-lg px-1 py-1 mt-2 ml-auto mr-auto mb-0 top-1/3 absolute left-1/2 -translate-x-1/2">
                        {//<input type='text' onChange={handleEvent} placeholder="search by category"/>
                        }
                        <select onChange={eventHandler}>
                            {
                                category?.map((category, index)=>(
                                    <option key={index}
                                    value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))
                            }
                        </select>
                    {/* <button className="px-0.5 rounded-md bg-cyan-400 transition-all" onClick={submitCategory}> Go </button> */}
                </div>
            </div>
            <div className=" bg-slate-300">
            {
                showArticles?
                <BlogList blog={showArticles}/>
                :
                <BlogList blog={articles}/>
            }
            </div>
            <Footer/>
        </>
    )
}

export default HomePage