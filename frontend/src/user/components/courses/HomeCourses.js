import React ,{Component,useState,useEffect} from 'react';
import { queryApi } from "../../../utils/queryApi";
import { useApi } from "../../../hooks/useApi";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import confirm, { Button, alert } from "react-alert-confirm";
import "react-alert-confirm/dist/index.css";
import {fetchFavoris,populateFavoris, selectFavoris,setErrorsf,deleteFavoris} from "../../../redux/slices/favorisSlice";
import {populateCourses, selectCourses,setErrors,deleteCourse,fetchCoursesofUser,selectCoursesofuser} from "../../../redux/slices/coursesSlice";
import { FaAdjust } from 'react-icons/fa';
import Header from'../Header';
export default function HomeCourse() {
    const dispatch = useDispatch();
  
   // const [courses, err, reload] = useApi("course");
    const [courses, errors] =useSelector(selectCourses);
    const certifofuser= useApi("certif/certifofuser",null,"GET",false)[0];
    console.log(certifofuser);
   //const redx=useSelector((state)=>state);
   //console.log(redx);
  
    const [usercourses,erreur] = useApi("usercourse/displaycourses",null,"GET",false);
    console.log(usercourses);
    const [addedcourses,errer] = useSelector(selectCoursesofuser);
    useEffect(() => {
       
        dispatch(fetchFavoris());
        }, [dispatch]);
   
        const [favoris, er] =useSelector(selectFavoris);
        console.log(favoris);
    var allusers = courses?.map(function(elem, pos,array) {
        return elem.UserId  
});
let displayusers = allusers?.filter( (ele, ind) => ind === allusers?.findIndex( elem => elem?._id === ele?._id ))
/**delete favoris */
const deletefav = (id) =>async () => {
    confirm({
        title: "Delete favorite",
        cancelText: "cancel",
        okText: "Yes",
        content: <h4 style={{color:"orange"}}>Are you sure to delete it?!</h4>,
        onOk: async() =>{
            
   const [,err] = await queryApi("favoris/deletefavoris/" + id, null, "DELETE");
   if (err) {
   dispatch(setErrorsf(err));
   console.log(err);
   } else {
   dispatch(deleteFavoris(id));

       }
      }}
      )};


/**end */
/**delete course */
const deleteCourseEvent = (c) =>async () => {
    confirm({
        title: "Delete Course",
        cancelText: "cancel",
        okText: "Yes",
        content: <h4 style={{color:"orange"}}>Are you sure to delete this course!</h4>,
        onOk: async() =>{
            const [,err] = await queryApi("course/delete/" + c, null, "DELETE");
            if (err) {
            dispatch(setErrors(err));
            console.log(err);
            } else {
            dispatch(deleteCourse(c));
            }
        }
      });
 
    };
/**end */
    const [pageNumber,setPageNumber]=useState(0);
    const addedcoursesPerPage=4;
    const pageVisited=pageNumber*addedcoursesPerPage;
    const pageCount=Math.ceil(addedcourses?.length/addedcoursesPerPage);
    const changePage=({selected})=>{
        setPageNumber(selected);
    }
    const displayaddedcourses =addedcourses?.slice(pageVisited,pageVisited+addedcoursesPerPage).map((cours, index)=>{
        return(
     
            <div class="uk-width-3-4@m uk-first-column">
             
<div class="course-card course-card-list" key={index}>
<div class="course-card-thumbnail">
    <img src={cours.Photo}/>
    <a href="course-intro.html" class="play-button-trigger"></a>
</div>
<div class="course-card-body">
    <a href="course-intro.html">
        <h4>{cours.Name} </h4>
    </a>
    <p>{cours.ShortDescription}</p>
    <div class="course-details-info">
        <ul>
            <li> <Link to={`/Consultusersincourse/${cours._id}`}><i class="icon-feather-sliders"></i>enrolled </Link></li>
            <li>   </li>
            <li> <Link  to={`/updatecourse/${cours._id}`} class="bg-blue-600 font-semibold p-2 rounded-md text-center text-white w-full" style={{marginLeft:"150px"}}>Update</Link>  </li>
       <li><button class="bg-blue-600 font-semibold p-2 rounded-md text-center text-white w-full" style={{marginTop:"-8px"}} onClick={deleteCourseEvent(cours._id)}>Delete</button></li>
        </ul>
    </div>

</div>
</div>
            




</div>
         
         
         
        )
    })


    console.log(addedcourses);
        return (
          

<div>
 <Header />
<div>
      </div>
<div class="main_content">
            <div class="mcontainer">

                <div class="flex justify-between relative md:mb-4 mb-3">
                    <div class="flex-1">
                        <h2 class="text-3xl font-semibold"> Online courses </h2>
                        
                    
                    </div>
                    <Link to="/addcourse" class="flex items-center justify-center h-9 lg:px-5 px-2 rounded-md bg-blue-600 text-white space-x-1.5 absolute right-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path>
                        </svg>
                        <span > Create </span>
                    </Link>
                </div>
             
                <div class="section-small pt-0">

<div class="course-grid-slider uk-slider uk-slider-container" uk-slider="finite: true">

    <div class="grid-slider-header">
       
        <div class="grid-slider-header-link">

            <Link to="/displayallcourses" class="text-blue-500"> See all </Link>
         
        </div>
        
      
    </div>

    <h3>Suggested online courses</h3>


</div>

<div class="relative" uk-slider="finite: true">
                    
                    <div class="uk-slider-container px-1 py-3">
                        <ul class="uk-slider-items uk-child-width-1-4@m uk-child-width-1-3@s uk-child-width-1-2 uk-grid-small uk-grid"  >

                   
                                    

                                     {courses?.map((cours, index) => (
                            <li key={cours._id}>
                                <div>
                                    <a href="course-intro.html" class="w-full md:h-36 h-28 overflow-hidden rounded-lg relative inline-block">
                                        <img src={cours.Photo} alt="My online courses"  class="w-full h-full absolute inset-0 object-cover"/>
                                        
                                       
                                    </a>
                                    <div class="pt-3">
                                        <Link to={`/detailcourse/${cours._id}`} class="font-semibold line-clamp-2"> {cours.Name} </Link>
                                        <div class="pt-2">
                                        <p class="text-sm"> By {cours.UserId?.username}</p>
                                            <div class="flex space-x-2 items-center text-xs">
                                                <div> {cours.Level}</div>
                                                <div class="md:block hidden">·</div>
                                                <div> {cours.Category}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
 ))}

                   
                    
                        </ul>
    
                        <a class="absolute bg-white top-16 flex items-center justify-center p-2 -left-4 rounded-full shadow-md text-xl w-9 z-10 dark:bg-gray-800 dark:text-white" href="#" uk-slider-item="previous"> <i class="icon-feather-chevron-left"></i></a>
                        <a class="absolute bg-white top-16 flex items-center justify-center p-2 -right-4 rounded-full shadow-md text-xl w-9 z-10 dark:bg-gray-800 dark:text-white" href="#" uk-slider-item="next"> <i class="icon-feather-chevron-right"></i></a>

                    </div>
                </div>





                <Link to="/coursechart" class="flex items-center justify-center h-9 lg:px-5 px-2 rounded-md bg-blue-600 text-white space-x-1.5 absolute right-0">
                        <i class="fa fa-line-chart"></i>
                        <span > Most enrolled </span>
                    </Link>


</div>

<br/>
<div class="my-2 flex items-center justify-between pb-3">
                           <div>
                               <h2 class="text-xl font-semibold"> Trainers</h2> 
                           </div>
                           <a href="#" class="text-blue-500"> See all </a>
                       </div>
<div class="relative uk-slider" uk-slider="finite: true">
                            <div class="uk-slider-container px-1 py-3">
                                <ul class="uk-slider-items uk-child-width-1-4@m uk-child-width-1-3@s uk-child-width-1-2 uk-grid-small uk-grid" style={{transform: "translate3d(0px, 0px, 0px)"}}>
                                {displayusers?.map((user, index) => (
                                    <li tabindex="-1" class="uk-active" >
                                        <Link to={`/Coursesofuser/${user?._id}`} >
                                            <img src={user?.profilePicture} class="w-full h-48 rounded-lg shadow-sm object-cover" alt="users in online courses"/>
                                            <div class="pt-2">
                                               <h4 class="text-lg font-semibold"> {user?.username} </h4>
                                           </div>
                                       </Link>
                                    </li>
                                  ))}
                                </ul>
                        
                                <a class="absolute bg-white bottom-1/2 flex items-center justify-center p-2 -left-4 rounded-full shadow-md text-xl w-9 z-10 dark:bg-gray-800 dark:text-white uk-invisible" href="#" uk-slider-item="previous"> <i class="icon-feather-chevron-left"></i></a>
                                <a class="absolute bg-white bottom-1/2 flex items-center justify-center p-2 -right-4 rounded-full shadow-md text-xl w-9 z-10 dark:bg-gray-800 dark:text-white" href="#" uk-slider-item="next"> <i class="icon-feather-chevron-right"></i></a>
                        
                            </div>
                        </div>


 <div class="grid-slider-header-link">

           
        </div>
           
                <div class="md:mb-4 mb-3">
                    <h2 class="text-2xl font-semibold">  </h2>
                    <nav class="cd-secondary-nav border-b md:m-0 -mx-4">
                        <ul uk-switcher="connect:#switch ; animation: uk-animation-slide-right-small, uk-animation-slide-left-medium">
                            <li ><a href="#" class="lg:px-2" aria-expanded="false">   In-progress  </a></li>
                            <li><a href="#" class="lg:px-2" aria-expanded="false"> My courses </a></li>
                            <li><a href="#" class="lg:px-2" aria-expanded="false"> My Accomplissements </a></li>
                            <li><a href="#" class="lg:px-2" aria-expanded="false"> favorites</a></li>
                        </ul>
                    </nav>
                </div>
{/**<!--  videos  --> 
*/}
                

                <div class="divide-y">
                    <ul id="switch" class="uk-switcher">
                        <li >
                            {/**learn courses */}
                        {usercourses?.map((usccoursee, index) => ( 
                     
                     <div key={index} class="flex md:space-x-6 space-x-4 md:py-5 py-3 relative">
                         
                         <a href="course-intro.html" class="md:w-64 md:h-40 w-36 h-24 overflow-hidden rounded-lg relative shadow-sm"> 
                              <img src={usccoursee.CourseId?.Photo} alt="" class="w-full h-full absolute inset-0 object-cover"/>
                              <div class="absolute bg-yellow-100 font-semibold px-2.5 py-1 rounded-full text-yellow-500 text-xs top-2.5 left-2.5">
                              {usccoursee.CourseId?.Category}
                              </div>
                             
                         </a>
                         <div class="flex-1 space-y-2"> 
                              
                             <Link to={`/learn/${usccoursee?._id}`} class="md:text-xl font-semibold line-clamp-2"> {usccoursee.CourseId?.Name}  </Link>
                             <p class="leading-6 pr-4 line-clamp-2 md:block hidden"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna . </p>
                             <a href="#" class="font-semibold block text-sm"> created by {usccoursee.CourseId?.UserId?.username}</a>
                            
                            <div class="flex items-center justify-between">
                                 <div class="flex space-x-3 items-center text-sm md:pt-3">
                                     <div> <i class="icon-feather-sliders mr-2"></i> {usccoursee.CourseId?.Level} </div>
                                     <div class="md:block hidden">·</div>
                                     
                                 </div>
                                 
                                 <a href="#" class="md:flex items-center justify-center h-9 px-8 rounded-md border hidden bg-gray-100">Enroll Now </a>
                             </div>
                             <span class="number"> {usccoursee.PassQuiz.length}/{usccoursee.CourseId?.Module.length} </span>
                             <progress class="course-progressbar course-progressbar-filler"  value={usccoursee.PassQuiz.length} max={usccoursee.CourseId?.Module.length}  />
                                           
                             <div class="absolute top-1 right-0 md:inline hidden">
                                 <a href="#" class="hover:bg-gray-200 p-1.5 inline-block rounded-full" aria-expanded="false"> 
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                                  </svg>
                                 </a>
                                 <div class="bg-white w-56 shadow-md mx-auto p-2 mt-12 rounded-md text-gray-500 hidden text-base border border-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 uk-drop uk-drop-bottom-right" uk-drop="mode: hover;pos: top-right" >
                           
                                     <ul class="space-y-1">
                                       <li> 
                                           <a href="#" class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                                            <i class="uil-share-alt mr-1"></i> Share
                                           </a> 
                                       </li>
                                       <li> 
                                           <a href="#" class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                                            <i class="uil-edit-alt mr-1"></i>  Edit Post 
                                           </a> 
                                       </li>
                                       <li> 
                                           <a href="#" class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                                            <i class="uil-comment-slash mr-1"></i>   Disable comments
                                           </a> 
                                       </li> 
                                       <li> 
                                           <a href="#" class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                                            <i class="uil-favorite mr-1"></i>  Add favorites 
                                           </a> 
                                       </li>
                                       <li>
                                         <hr class="-mx-2 my-2 dark:border-gray-800"/>
                                       </li>
                                       <li> 
                                           <a href="#" class="flex items-center px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-500 rounded-md dark:hover:bg-red-600">
                                            <i class="uil-trash-alt mr-1"></i>  Delete
                                           </a> 
                                       </li>
                                     </ul>
                                 
                                 </div>
                             </div>
 
                         </div>
                     </div> 
                   ))}
                          {/**end learn courses */}
                        </li>
                <li>
                    {/**courses added by user */}
                    {displayaddedcourses}
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

                  {/**end courses added by user */}
                </li>

                {/**accomplissements */}
                <li>
                {certifofuser?.map((certif, index) => (
                <div class="relative uk-slider" uk-slider="finite: true">
                
                <div class="uk-slider-container px-1 py-3" key={index}>
                    <ul class="uk-slider-items uk-child-width-1-4@m uk-child-width-1-3@s uk-grid-small uk-grid" style={{transform: "translate3d(0px, 0px, 0px)"}}>
                       
                       
                        <li tabindex="-1" class="uk-active">
                            <div class="card">
                                <div class="card-media h-32">
                                    <div class="card-media-overly"></div>
                                    <img src="assets/user/course/images/certif.png" alt="online certificate of achievement" class=""/>
                                </div>
                                <div class="card-body">
                                    <div class="text-xs uppercase text-green-500 font-semibold"> </div>
                                    <Link   to={`/certification/${certif?._id}`} class="box-title mb-1"> {certif?.usercourse?.CourseId?.Name}</Link>
                                    <div class="text-sm font-medium"></div>
                
                                    <div class="flex items-center space-x-2 text-sm text-gray-400 capitalize">
                                        <div>Score:{parseFloat(certif?.Score).toFixed(2)}</div>
                                        
                                    </div>
                
                                    <div class="flex mt-2 space-x-2 text-sm">
                                        <Link to={`/certification/${certif?._id}`}  class="bg-blue-600 flex flex-1 h-8 items-center justify-center rounded-md text-white capitalize">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 mr-1.5">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                                </path>
                                            </svg>
                                            more
                                        </Link>
                                        <Link to={`/certification/${certif?._id}`} class="bg-gray-200 flex h-8 items-center px-3 rounded-md">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z">
                                                </path>
                                            </svg>
                                        </Link>
                                    </div>
                
                                </div>
                            </div>
                        </li>
                      
                    </ul>

                    <a class="absolute bg-white top-16 flex items-center justify-center p-2 -left-4 rounded-full shadow-md text-xl w-9 z-10 dark:bg-gray-800 dark:text-white uk-invisible" href="#" uk-slider-item="previous"> <i class="icon-feather-chevron-left"></i></a>
                    <a class="absolute bg-white top-16 flex items-center justify-center p-2 -right-4 rounded-full shadow-md text-xl w-9 z-10 dark:bg-gray-800 dark:text-white" href="#" uk-slider-item="next"> <i class="icon-feather-chevron-right"></i></a>

                </div>
            </div>
                ))}
            </li>
                {/**end accomp */}
                

                {/**favorites */}
                <li>

                <div class="divide-y">
                {favoris?.map((fav, ind) => (
<div class="flex md:space-x-6 space-x-4 md:py-5 py-3 relative">
    <a href="course-intro.html" class="md:w-64 md:h-40 w-36 h-24 overflow-hidden rounded-lg relative shadow-sm"> 
         <img src={fav?.course?.Photo} alt="" class="w-full h-full absolute inset-0 object-cover"/>
         <div class="absolute bg-yellow-100 font-semibold px-2.5 py-1 rounded-full text-yellow-500 text-xs top-2.5 left-2.5">
         {fav?.course?.Category}
         </div>
        
    </a>
    <div class="flex-1 space-y-2"> 
         
        <a href="course-intro.html" class="md:text-xl font-semibold line-clamp-2"> {fav?.course?.Name} </a>
       
       
       
       <div class="flex items-center justify-between">
            <div class="flex space-x-3 items-center text-sm md:pt-3">
                <div> <i class="icon-feather-sliders mr-2"></i> {fav?.course?.Level}</div>
                <div class="md:block hidden">·</div>
                <div> <button onClick={deletefav(fav?._id)}><i class="uil-trash-alt text-danger" ></i></button> </div>
            </div>
            <a href="#" class="md:flex items-center justify-center h-9 px-8 rounded-md border hidden bg-gray-100">Enroll Now </a>
        </div>

        <div class="absolute top-1 right-0 md:inline hidden">
            <a href="#" class="hover:bg-gray-200 p-1.5 inline-block rounded-full" aria-expanded="false"> 
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
             </svg>
            </a>
            <div class="bg-white w-56 shadow-md mx-auto p-2 mt-12 rounded-md text-gray-500 hidden text-base border border-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 uk-drop uk-drop-bottom-right" uk-drop="mode: hover;pos: top-right" style={{left :"-188px", top: "-12px"}}>
      
                <ul class="space-y-1">
                  <li> 
                      <a href="#" class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                       <i class="uil-share-alt mr-1"></i> Share
                      </a> 
                  </li>
                  <li> 
                      <a href="#" class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                       <i class="uil-edit-alt mr-1"></i>  Edit Post 
                      </a> 
                  </li>
                  <li> 
                      <a href="#" class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                       <i class="uil-comment-slash mr-1"></i>   Disable comments
                      </a> 
                  </li> 
                  <li> 
                      <a href="#" class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                       <i class="uil-favorite mr-1"></i>  Add favorites 
                      </a> 
                  </li>
                  <li>
                    <hr class="-mx-2 my-2 dark:border-gray-800"/>
                  </li>
                  <li> 
                      <a href="#" class="flex items-center px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-500 rounded-md dark:hover:bg-red-600">
                       <i class="uil-trash-alt mr-1"></i>  Delete
                      </a> 
                  </li>
                </ul>
            
            </div>
        </div>

    </div>
</div> 
                ))}
</div>
                </li>
                {/**end favorites */}
                   </ul>
                
            
                </div> 


            </div>














            
        </div>
        












        </div>


     
   )
    





}