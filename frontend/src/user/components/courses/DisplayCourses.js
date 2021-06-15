import React ,{Component,useState} from 'react';
import { queryApi } from "../../../utils/queryApi";
import { useApi } from "../../../hooks/useApi";
import {useDispatch, useSelector,} from "react-redux";
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { Link } from "react-router-dom";
import { selectCourses,searchcourse,fetchCourses,searchcoursesbyName,filtercoursesbyLevel} from "../../../redux/slices/coursesSlice";
import Header from'../Header';
export default function DisplayCourses() {
    const [courses] =useSelector(selectCourses);
    console.log(courses);
    const dispatch = useDispatch();
  
     /**search by name */
   const  handleOnInputChange = async(event)=> {
  
        const query = event.target.value;
        console.log(query);
    if(query!=="")
    {   dispatch(searchcoursesbyName(query));
      
    }
    else
    {  console.log(query);
        dispatch(fetchCourses())
    }
       
    };
    /**end search by name */


    /**filter by level */
    const  filterbyLevel=async(event)=> {
        const level=event.target.value;
        if(level==="*")
        {   console.log("all");
        dispatch(fetchCourses())
        
        }
        else
        {  console.log(level);
            dispatch(filtercoursesbyLevel(level));
           
        }
    }
    /**end filter by level */
/**pagination */
    const [pageNumber,setPageNumber]=useState(0);
    const addedcoursesPerPage=4;
    const pageVisited=pageNumber*addedcoursesPerPage;
    const pageCount=Math.ceil(courses?.length/addedcoursesPerPage);
    const changePage=({selected})=>{
        setPageNumber(selected);
    }
/**end */
const paginatecourses=  courses?.slice(pageVisited,pageVisited+addedcoursesPerPage).map((cours, index) => {
    return(
        <div class="lg:flex lg:space-x-6 py-6">
       
        <Link to={`/detailcourse/${cours._id}`}>
            <div class="lg:w-60 w-full h-40 overflow-hidden rounded-lg relative shadow-sm"> 
                 <img src={cours.Photo} alt="" class="w-full h-full absolute inset-0 object-cover" />
                 <div class="absolute bg-blue-100 font-semibold px-2.5 py-1 rounded-full text-blue-500 text-xs top-2.5 left-2.5">
                {cours.Category}
                 </div>
            </div>
        </Link>
        <div class="flex-1 lg:pt-0 pt-4"> 
             
            <Link to={`/detailcourse/${cours._id}`} class="text-xl font-semibold line-clamp-2" style={{color: "#0cb9c1"}}>  {cours.Name}</Link>
            <p class="line-clamp-2 pt-1"> {cours.ShortDescription}</p>
            
            <div class="flex items-center pt-3">
               
                <div class="flex items-center mx-4"> 
                  
                <div class="course-details-info">
            <ul>
                <li> <i class="icon-feather-sliders"></i> {cours.Level} </li>
                <li> By <a href="user-profile-1.html" style={{color: "orange"}}>{cours.UserId?.username} </a> </li>
                <li>
                 
                </li>
            </ul>
        </div>
                </div>
                <div class="flex items-center">  </div>
            </div>

        </div>
    </div>

    )

})


  
        return (
          

<div>
     <Header />
<div class="main_content">
            <div class="mcontainer">


                <div class="lg:flex  lg:space-x-12">

                    <div class="lg:w-3/4">
                        

                        <div class="flex justify-between relative md:mb-4 mb-3">
                            <div class="flex-1">
                                <h2 class="text-3xl font-semibold" style={{marginRight:"300px"}}> Courses List </h2>
                               
                            </div>
                            <input  type="text" id="search-input" placeholder="search by name" onChange={handleOnInputChange} style={{width:"180px"}}/>
                        </div>


                        <div class="divide-y">
                        {paginatecourses}
                    <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    onPageChange={changePage}
                    pageCount={pageCount}
                    containerClassName={"uk-pagination my-5 uk-flex-center"}
                    nextLinkClassName={"uk-icon uk-pagination-next"}
                    previousClassName={"uk-icon uk-pagination-previous"}
                    activeClassName={"uk-active"}
                    disabledClassName={"uk-disabled"}
                     />

                        </div>
                      
                   
                    </div>
                    
                    <div class="lg:w-1/4 w-full flex-shrink-0">

                        <div uk-sticky="offset:100" class="uk-sticky">
  
                        <div class="uk-width-expand uk-grid-margin uk-first-column">
                        <button class="btn-sidebar-filter" >Filter </button>
                        <div class="sidebar-filter uk-sticky" 
                         >

                            <div class="sidebar-filter-contents">


                                <h4> Filter By </h4>

                                <ul class="sidebar-filter-list uk-accordion" uk-accordion="multiple: true">

                                    <li class="uk-open">
                                        <a class="uk-accordion-title" href="#"> Skill Levels </a>
                                        <div class="uk-accordion-content" aria-hidden="false">
                                            <div class="uk-form-controls" onChange={filterbyLevel}  >
                                            <label>
                                                    <input class="uk-radio" type="radio"  name="filter" value="*" />
                                                    <span class="test"> All <span>  </span> </span>
                                                </label>
                                                <label>
                                                    <input class="uk-radio" type="radio"  name="filter" value="beginner" />
                                                    <span class="test"> Beginner <span>  </span> </span>
                                                </label>
                                                <label>
                                                    <input class="uk-radio" type="radio"  name="filter" value="intermediate" />
                                                    <span class="test"> Entermidate<span> </span></span>
                                                </label>
                                                <label>
                                                    <input class="uk-radio" type="radio"  name="filter" value="advances"  />
                                                    <span class="test"> Expert <span>  </span></span>
                                                </label>
                                            </div>
                                        </div>
                                    </li>

                                    <li class="uk-open">
                                        <a class="uk-accordion-title" href="#"> Category </a>
                                        <div class="uk-accordion-content" aria-hidden="false">
                                            <div class="uk-form-controls">
                                                <label>
                                                    <input class="uk-radio" type="radio" name="radio2"/>
                                                    <span class="test"> Computer science </span>
                                                </label>
                                                <label>
                                                    <input class="uk-radio" type="radio" name="radio2"/>
                                                    <span class="test"> Business </span>
                                                </label>
                                                <label>
                                                    <input class="uk-radio" type="radio" name="radio2"/>
                                                    <span class="test"> Data Science </span>
                                                </label>
                                                <label>
                                                    <input class="uk-radio" type="radio" name="radio2"/>
                                                    <span class="test"> Information Technology </span>
                                                </label>
                                                <label>
                                                    <input class="uk-radio" type="radio" name="radio2"/>
                                                    <span class="test"> Health</span>
                                                </label>
                                                <label>
                                                    <input class="uk-radio" type="radio" name="radio2"/>
                                                    <span class="test"> Arts and humanities</span>
                                                </label>
                                            </div>
                                        </div>
                                    </li>

                                    <li class="uk-open">
                                        <a class="uk-accordion-title" href="#"> Duration time </a>
                                        <div class="uk-accordion-content" aria-hidden="false">
                                            <div class="uk-form-controls">
                                                <label>
                                                    <input class="uk-radio" type="radio" name="radio3"/>
                                                    <span class="test"> +5 Hourse (23) </span>
                                                </label>
                                                <label>
                                                    <input class="uk-radio" type="radio" name="radio3"/>
                                                    <span class="test"> +10 Hourse (12)</span>
                                                </label>
                                                <label>
                                                    <input class="uk-radio" type="radio" name="radio3"/>
                                                    <span class="test"> +20 Hourse (5)</span>
                                                </label>
                                                <label>
                                                    <input class="uk-radio" type="radio" name="radio3"/>
                                                    <span class="test"> +30 Hourse (2)</span>
                                                </label>
                                            </div>
                                        </div>
                                    </li>


                                </ul>



                            </div>
<br/>
                        </div><div class="uk-sticky-placeholder" style={{height: "0px", margin: "0px"}}></div>

                    </div>
                           
                          <h4 class="text-xl font-semibold mb-3"> Tags </h4>

                        <div class="flex flex-wrap gap-2">
                            <a href="#" class="bg-gray-100 py-1.5 px-4 rounded-full"> Computers</a>
                            <a href="#" class="bg-gray-100 py-1.5 px-4 rounded-full"> Business</a>
                            <a href="#" class="bg-gray-100 py-1.5 px-4 rounded-full"> News</a>
                            <a href="#" class="bg-gray-100 py-1.5 px-4 rounded-full"> Architecher</a>
                            <a href="#" class="bg-gray-100 py-1.5 px-4 rounded-full"> Technolgy</a>
                            <a href="#" class="bg-gray-100 py-1.5 px-4 rounded-full"> Music</a> 
                        </div>
                  
                        </div>
                    </div>
                </div>

        
            </div>
        </div>
        
</div>

     
   )
    





}