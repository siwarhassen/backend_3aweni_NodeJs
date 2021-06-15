import React ,{Component,useEffect, useState} from 'react';
import {FaStar} from "react-icons/fa";
import { queryApi } from "../../../utils/queryApi";
import { useApi } from "../../../hooks/useApi";
import dateFormat from 'dateformat';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import Header from'../Header';
import ReactNotification from 'react-notifications-component';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch ,useSelector} from 'react-redux';
import {fetchReviews,fetchsumrating} from "../../../redux/slices/reviewscourseSlice";
import {fetchconnectuser,selectoneuser,selectSessionUser} from "../../../redux/slices/userSlice";
import {fetchFavoris,populateFavoris, selectFavoris,setErrorsf,deleteFavoris,addfavoris} from "../../../redux/slices/favorisSlice";
import {setErrors,selectCourse} from "../../../redux/slices/coursesSlice";
import youtube from '../courses/Youtube';
import {selectReviewsCourse,addReview,setErrorsR,deleteReview,selectsumreviews} from "../../../redux/slices/reviewscourseSlice";
import { reach } from 'yup';
import axios from 'axios';
export default function CourseDetail({match}) {
    
 
    const stars=Array(5).fill(0);
    const [rating,setRating]=useState(0);
    const [hover,setHover]=useState(0);
    const id = match.params.id;
    const [numberusers]= useApi("usercourse/numberusers/"+id,null,"GET");
    const [videos,setVideos]=useState([]);
    const [videosrc,setVideosrc]=useState('https://www.youtube.com');
{/**user */}
 
   /* const config = {
        headers: {
            "Content-Type":"appliation/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
    }
    

        axios.get("/api/auth/details_user",config).then((response)=>{
            setUser(response.data.data);
            console.log(user)});
setTimeout( function() {   
localStorage.setItem("connecteduser", user._id);
} ,3000);*/
{/**end */}

   const [veriff,setVeriff]=useState(null);

   useEffect(() =>async() =>{
    const findfavoris= await queryApi("favoris/verififavoris/6058e88da386333954f325c8/"+id,null,"GET")[0];
    if(findfavoris!=undefined)
    {
        setVeriff(true);
    }
    }, [veriff]);
 /* const veriffavoris = useSelector((state) =>
   state.favoris.favoris.find((item) => item._id === findfavoris?.course)
   );*/
    //  console.log(findfavoris); 
      

    const [courses, err, reload] = useApi("course/");
   
  
 
    //const cc =useApi("course/detail/"+id,null,"GET")[0];
    //const [reviews, er] = useApi("reviewc/"+id,null,"GET",false);
       const course = useSelector((state) =>
   state.courses.courses.find((item) => item._id === id)
   );
   //const user=course?.UserId;
  // console.log(user);
  //  console.log(sumreview?.average.toFixed(2));
    const dispatch = useDispatch();
  
    useEffect(() => {
        dispatch(fetchconnectuser(id));
        dispatch(fetchReviews(id));
        dispatch(fetchsumrating(id));
        }, [dispatch]);
        const user=useSelector(selectSessionUser)[0];
       console.log(user);
        //const sumreview=useApi("reviewc/average/"+match.params.id,null,"GET")[0];
      const  sumreview= useSelector(selectsumreviews)[0];
      console.log(sumreview);
      useEffect(() => {
        axios({
            "method": "GET",
            "url": 'https://www.googleapis.com/youtube/v3/search',
            "params":{
                'part':'snippet',
                'maxResults':'3',
                'key':'AIzaSyDa_ikOSdQtFlqN5so8tPVeWg7_SiJmifM',
                'q':course?.Name
            }
        })
            .then((res) => {
                setVideos(res.data.items);
                      
            })
            .catch((error) => {
                console.log(error)
            })
         
    },[dispatch])
   
    const [similair, error,rel] = useApi("course/similair/"+course?.Category+"/"+course?.Level,null,"GET",false);
    const [reviews, er] =useSelector(selectReviewsCourse);
   console.log(reviews);
    const [NbReviews,e] = useApi("reviewc/count/"+id,null,"GET",false);
    const [findInscri,a] = useApi("usercourse/find/"+id,null,"GET",false);

const dateCourse=dateFormat(course?.DateCreation, "mmmm dS, yyyy");

   const MakeReview=async (e)=>{

    var reviewData = {
        Content: e.target[5].value,
        Rating:rating,
        CourseId: course
      };
      var s=false;
    const [r, err] = await  queryApi("reviewc/add",reviewData, "POST",false);
  
                  
    if (err) {
      console.log(err);
 
  } else {console.log(r);
    const [revie]= await  queryApi("reviewc/finereview/"+r._id,null,"GET");

    dispatch(addReview(revie));
    dispatch(fetchsumrating(id));
  }
   }
/**delete review */
const deleteReviewC = (id) =>async () => {
    const [,err] = await queryApi("reviewc/delete/" + id, null, "DELETE");
    if (err) {
    dispatch(setErrorsR(err));
    console.log(err);
    } else {
    dispatch(deleteReview(id));
    dispatch(fetchsumrating(match.params.id));
    }
    };
/**end */
/**add favoris */
const addf=async ()=>{

    var favoris = {
    
       
        course: course
      };
    
    const [r, err] = await  queryApi("favoris/addfavoris",favoris, "POST",false);
  
                  
    if (err) {
      console.log(err);
    
  } 
  
  else
  {  setVeriff(true);
    store.addNotification(
        {title:"success",
        message:"check your favourites",
        type:"success",
        container:"top-center",
        insert:"top",
        dismiss:{duration:1000,
          showIcon:true
        }
       
    }, 
    );
    console.log(r);
    dispatch(addfavoris(r));
  }
 
   
    
   }
/** */

/**delete favoris */
const deletefav = (id) =>async () => {
  
            
   const [,err] = await queryApi("favoris/deletefavoris/" + id, null, "DELETE");
   if (err) {
   dispatch(setErrorsf(err));
   console.log(err);
   } else {
   dispatch(deleteFavoris(id));
   setVeriff(false);
     }};
/**delete  */

  const Inscription=async(e)=>{
      var usercourse={
        CourseId:course?._id
      }
      const [inscriptio, err] = await  queryApi("usercourse/inscription",usercourse, "POST",false);
  
                  
      if (err) {
        console.log(err);
   
    } else console.log(inscriptio);
  }



        return (
          

<div>
 <Header />
<div class="main_content">
            <div class="mcontainer">

                <div class="lg:flex lg:space-x-10">
                      
                    <div class="lg:w-3/4"> 
                       
                        <div>
                       
                            <div class="space-y-3"  >
                                <h5 class="uppercase text-sm">{course?.Category}</h5>
                                <h1 class="font-semibold text-3xl" style={{color: "orange"}}>{course?.Name}</h1>
                                <p class="">{course?.ShortDescription} </p>
                
                                <ul class="flex  gap-4">
                                    <li class="flex items-center">
                                    
                                        <span class="bg-yellow-500 text-white mr-1.5 px-2 rounded font-semibold">  {sumreview?.average!=undefined?(sumreview?.average?.toFixed(2)):(0)} </span>
                                        {stars.map((_,index)=>{
                                    const ratingValue=index+1;
                                               return(
                                                 <label> 
                                                     
                                                <FaStar 
                                                key={index}
                                            
                                                color={ratingValue<=(sumreview?.average?.toFixed(2))?"orange":"grey"}
                                                value={sumreview?.average?.toFixed(2)}
                                              
                                        
                                                />
                                             </label> 
                                               )
                                               }
                                           )}
                                    </li>
                                      
                            <ReactNotification/>
   
                                    <li style={{marginTop:"3px"}}> <i class="icon-feather-users" ></i> {numberusers} Enrolled </li>
                           
                                    <li>
                                    {findInscri==null ?(
                                         <button style={{marginLeft:"270px"}} class=" h-6 lg:px-5 px-2 rounded-md bg-blue-600 text-white " onClick={Inscription}>
                                             Enroll Now
                                         </button>):(<p> <Link to={`/learn/${findInscri._id}`} style={{marginLeft:"270px"}}   disabled class=" h-6 lg:px-5 px-2 rounded-md bg-blue-600 text-white " >
                                             
                                        Go to class
                                         </Link></p>) }</li>
                                </ul>
                                <ul class="flex items-center text-gray-500 text-sm">
                                    <li> Created by <a href="#" class="font-bold"> {course?.UserId?.username} </a> </li>
                                    <span class="middot mx-3 text-2xl">·</span>
                                    <li> creation {dateCourse} 
                                    </li>
                                </ul>
                                {veriff ?(   <button onClick={deletefav}> <i class="fa fa-bookmark" aria-hidden="true" style={{fontSize:"25px"}} ></i></button>):(    <button onClick={addf}><i class="fa fa-bookmark-o" aria-hidden="true" style={{fontSize:"25px"}} ></i></button>)}
                         
                          
                            
                            </div>
                      
</div>
                            <nav class="cd-secondary-nav border-b md:mx-0 -mx-4 mt-4 bg-white text-4xl" uk-sticky="offset:50">
                                <ul class="space-x-3" uk-scrollspy-nav="closest: li; scroll: true">
                                    <li><a href="#Overview" uk-scroll>Overview</a></li>
                                    <li><a href="#curriculum" uk-scroll>Curriculum</a></li>
                                    <li><a href="#faq" uk-scroll>FAQ</a></li>
                                  
                                    <li><a href="#reviews">Reviews</a></li>
                                </ul>
                            </nav>


                            <div class="lg:mt-9 mt-5">
        {/**  <!-- course description -->*/}
                               
                                <div class="space-y-6">
                                    <div>
                                    <h5 class="text-xl font-semibold mb-3" style={{color: "#0cb9c1"}}> Skills </h5>

<div class="flex flex-wrap gap-2">
{course?.Skills?.map((skil, index) => ( 
      <a href="#" class="bg-gray-100 py-1.5 px-4 rounded-full"> {skil}</a>
))}

                                        </div>
                                        <br/>
                                    <div>
                                        <h3 class="font-semibold mb-2 text-xl" style={{color: "#0cb9c1"}}> Description </h3>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
                                            tincidunt ut
                                            laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim laoreet dolore magna
                                            aliquam erat
                                            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit
                                            lobortis
                                            nisl ut aliquip ex ea commodo consequat
                                        </p>
                                    </div>
                                  
                                    <div>
                                        <h3 class="font-semibold text-xl mb-2" style={{color: "#0cb9c1"}}> Requirements</h3>
                                        <ul class="list-disc ml-5">
                                            <li>Any computer will work: Windows, macOS or Linux</li>
                                            <li>Basic programming HTML and CSS.</li>
                                            <li>Basic/Minimal understanding of JavaScript</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 class="font-semibold mb-2 text-xl" style={{color: "#0cb9c1"}}> Here is exactly what we cover in this course: </h3>
                                        <p> {course?.MetaDescription} </p>
                                        <p> consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                                            magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci</p>
                                        <p> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
                                            tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                                            nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                                            Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod
                                            mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                                            sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut
                                            wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                                            aliquip ex ea commodo consequat.</p>
                                    </div>
                                </div>
                {/** <!-- course Curriculum --> */}
                               
                                <h3 class="mb-8 mt-20 font-semibold text-xl" id="curriculum" style={{color: "#0cb9c1"}}> Course Curriculum </h3>
                                <ul  class="uk-accordion space-y-3" uk-accordion="multiple: true">
                                {course?.Module?.map((mod, index) => ( 
                                    <li class="bg-gray-50 border hover:shadow-md px-6 py-4 rounded-md uk-open" >
                                    <a class="uk-accordion-title font-semibold text-base" href="#"> {mod?.Name} </a>
                                        <div class="uk-accordion-content mt-3 -mx-6" aria-hidden="false">
                
                                            <ul class="course-curriculum-list font-semibold space-y-1">

                                            {mod?.Section.map((sec, ind) => ( 
                                                <li class="hover:bg-gray-100 px-6 py-2.5 flex">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 mr-2">
                                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path>
                                                    </svg>{sec.Name} <span class="text-sm ml-auto"> {sec?.Duration} min </span>
                                                </li>
                                                ))}
                                               
                                       
                                            </ul>
                
                                        </div>
                                    </li>
                 ))}







                                </ul>
                {/**  <!-- video demo model --> */}
                              
                                <div id="trailer-modal" uk-modal="" class="uk-modal">
                                    <div class="uk-modal-dialog">
                                        <button class="uk-modal-close-default mt-2 mr-1 uk-icon uk-close" type="button" uk-close=""><svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" data-svg="close-icon"><line fill="none" stroke="#000" stroke-width="1.1" x1="1" y1="1" x2="13" y2="13"></line><line fill="none" stroke="#000" stroke-width="1.1" x1="13" y1="1" x2="1" y2="13"></line></svg></button>
                                        <div class="uk-modal-header">
                                            <h4> Trailer video </h4>
                                        </div>
                
                                        <div class="embed-video rounded">
                                            <iframe src="https://www.youtube.com/embed/nOCXXHGMezU?enablejsapi=1" frameborder="0"
                                                uk-video="automute: true" allowfullscreen uk-responsive></iframe>
                                        </div>

                                        <div class="uk-modal-body">
                                            <h3>Build Responsive Websites </h3>
                                            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                                                dolore
                                                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                                proident,
                                                sunt
                                                in culpa qui officia deserunt mollit anim id est laborum.</p>
                                        </div>
                                    </div>
                                </div>
                {/**    <!-- course Faq --> */}
                            
                
                                <h3 class="mb-8 mt-20 font-semibold text-xl" id="faq" style={{color: "#0cb9c1"}}> Course Faq </h3>
                                <ul class="uk-accordion space-y-3"  uk-accordion="multiple: true">
                                {course?.Module?.map((mod, index) => ( 
                                    <li class="bg-gray-50 border hover:shadow-md px-6 py-4 rounded-md uk-open">
                                        <a class="uk-accordion-title font-semibold text-base" href="#">{mod.Name} </a>
                                        <div class="uk-accordion-content mt-3" aria-hidden="false">
                                            <p> {mod.Description} </p>
                                        </div>
                                    </li>
                                    ))}
                           
                                </ul>
              
                                    {/**    <!-- course Reviews -->*/}
                             
                
                                <div class="flex space-x-5 my-8" id="reviews">
                                    <div class="lg:w-1/4 w-full">
                                        <div class="bg-blue-100 p-4 rounded-md border border-blue-200 text-center shadow-xs">
                                            <h1 class="leading-none text-6xl">  {sumreview?.average!=undefined?(sumreview?.average?.toFixed(2)):(0)}</h1>
                                            <div class="flex  items-center flex-row absolute  justify-center">
                                            {stars.map((_,index)=>{
                                    const ratingValue=index+1;
                                               return(
                                                 <label> 
                                                     
                                                <FaStar 
                                                key={index}
                                            
                                                color={ratingValue<=(sumreview?.average?.toFixed(2))?"orange":"grey"}
                                                value={sumreview?.average?.toFixed(2)}
                                              
                                        
                                                />
                                             </label> 
                                               )
                                               }
                                           )}
                                           </div>
                                         <br/>
                                        
                                            <h5 class="text-base mb-0 mt-1 text-gray-800"> Course Rating</h5>
                                        </div>
                                    </div>
                                   
                                    <div class="w-2/4 hidden lg:flex flex-col justify-center">
                
                                        <div class="space-y-4">
                                            <div class="w-full h-3 rounded-lg bg-gray-300 shadow-xs relative">
                                                <div class="w-11/12 h-3 rounded-lg bg-gray-800"> </div>
                                            </div>
                                            <div class="w-full h-3 rounded-lg bg-gray-300 shadow-xs relative">
                                                <div class="w-4/5 h-3 rounded-lg bg-gray-800"> </div>
                                            </div>
                                            <div class="w-full h-3 rounded-lg bg-gray-300 shadow-xs relative">
                                                <div class="w-3/5 h-3 rounded-lg bg-gray-800"> </div>
                                            </div>
                                            <div class="w-full h-3 rounded-lg bg-gray-300 shadow-xs relative">
                                                <div class="w-3/6 h-3 rounded-lg bg-gray-800"> </div>
                                            </div>
                                            <div class="w-full h-3 rounded-lg bg-gray-300 shadow-xs relative">
                                                <div class="w-1/3 h-3 rounded-lg bg-gray-800"> </div>
                                            </div>
                                        </div>
                
                                    </div>
                                    <div class="w-1/4 hidden lg:flex flex-col justify-center">
                                        <div class="space-y-1">
                                            <div class="flex justify-center items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-orange-400">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-orange-400">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-orange-400">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-orange-400">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-orange-400">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                </svg>
                                                <span class="ml-2"> 95 %</span>
                                            </div>
                                            <div class="flex justify-center items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-orange-400">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-orange-400">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-orange-400">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-orange-400">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-gray-400">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                </svg>
                                                <span class="ml-2"> 85 %</span>
                                            </div>
                                            <div class="flex justify-center items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-orange-400">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-orange-400">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-orange-400">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-orange-400">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-gray-400">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                </svg>
                                                <span class="ml-2"> 60 %</span>
                                            </div>
                                            <div class="flex justify-center items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-orange-400">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-orange-400">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-orange-400">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-orange-400">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-gray-400">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                </svg>
                                                <span class="ml-2"> 50 %</span>
                                            </div>
                                            <div class="flex justify-center items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-orange-400">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-orange-400">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-orange-400">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-orange-400">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-gray-400">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                </svg>
                                                <span class="ml-2"> 35 %</span>
                                            </div>
                                        </div>
                                  
                                    </div>
                                </div>
                
                                <h3 class="mb-8 mt-20 font-semibold text-2xl" style={{color: "#0cb9c1"}}> Reviews ({reviews?.length}) </h3>
                               { reviews?.map((rev, index) => (
                                <div class="flex gap-x-4 mb-5 relative" key={rev?._id}>
                                    <img src={rev?.UserId?.profilePicture}  alt="" class="rounded-full shadow w-12 h-12"/>
                                    <div>
                                        <h4 class="text-base m-0"> {rev?.UserId?.username}</h4>
                                        <span class="text-gray-700 text-sm"> {dateFormat(rev?.DateCreation, "mmmm dS, yyyy")} </span>
                                        <p class="mt-3">
                                            {rev?.Content}
                                        </p>
                                        {user._id===rev?.UserId?._id || user._id===course?.UserId?._id ?(  <button class="flex justify-center items-center absolute right-0 bottom-0" onClick={deleteReviewC(rev?._id)}><i class="fa fa-trash  " aria-hidden="true"></i></button>)
                                        :(<p></p>)}
                                      
                                     
                                        <div class="flex justify-center items-center absolute right-0 top-0">
                                    {stars.map((_,index)=>{
                                    const ratingValue=index+1;
                                               return(
                                                 <label> 
                                                     
                                                <FaStar 
                                                key={index}
                                            
                                                color={ratingValue<=(rev?.Rating)?"orange":"grey"}
                                                value={rev?.Rating}
                                              
                                        
                                                />
                                             </label> 
                                               )
                                               }
                                           )}
                                           </div>
                                      {/**  <div class="flex justify-center items-center absolute right-0 top-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-orange-400">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-orange-400">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-orange-400">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-orange-400">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-gray-400">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                            </svg>
                                        </div> */}
                                      
                                      
                                        
                
                                    </div>
                                </div>
                               ))}
                                {/**    <!-- Add comment -->*/}
                         
                                <h3 class="mb-8 mt-20 font-semibold text-xl" style={{color: "orange"}}> Add your review </h3>
                                <div class="flex space-x-4 mb-5 relative">
                                    <img src="http://localhost:3000/uploads/avatar-1.jpg" alt="" class="rounded-full shadow w-12 h-12"/>
                                    <div class="flex-1">
                                    <form  onSubmit={(e)=>{
                                    e.preventDefault()
                                    MakeReview(e)
                                }}>
                                  <div class="d-flex flex-row">
                                  {stars.map((_,i)=>{
                                      const ratingValue=i+1;
                                               return(
                                                 <label> 
                                                     <input type="radio" name="rating" style={{display:"none"}}
                                                     value={ratingValue}
                                                     onClick={()=>setRating(ratingValue)}
                                                     />
                                                <FaStar 
                                                key={i}
                                                style={{cursor:"pointer"}}
                                                color={ratingValue<=(hover||rating)?"orange":"grey"}
                                                
                                              
                                                onMouseEnter={()=>setHover(ratingValue)}
                                                onMouseLeave={()=>setHover(null)}
                                                />
                                             </label> 
                                               )
                                               }
                                           )}
                                           </div>
                                      
                                           <br/>
                                        <div class="grid md:grid-cols-2 gap-4">
                                           
                                            <div class="col-span-2">
                                                <textarea name="Content" id="" cols="30" rows="6"  class="bg-gradient-to-b from-gray-100 to-gray-100"></textarea>
                                            </div>
                                            <div class="col-span-2 flex justify-between py-4">
                                                <p class="m-0 text-gray-600"></p>
                                               
                                                <input type="submit" value="Post Comment"/>
                                            </div>
                                           
                                        </div>
                                        </form>
                                        
                                    </div>
                              
                                </div>
                
                
                            </div>

                          
                        </div>

                    </div>
                    <div class="lg:w-1/4 w-full"> 
   
                        <div uk-sticky="offset:100; top:1 ; bottom: true">
  
                            <h2 class="text-2xl font-semibold mb-3"> Similair Courses </h2>
  
                            <ul> 

                            {similair?.map((simco, index) => ( 
                                <li>
                                    <Link to={`/detailcourse/${simco._id}`} class="hover:bg-gray-100 rounded-md p-2 -mx-2 block" style={{color: "inherit"}}>
                                        <h3 class="font-medium line-clamp-2" style={{fontSize: "inherit"}} > {simco.Name} </h3>
                                        <div class="flex items-center my-auto text-xs space-x-1.5">
                                          <div> {simco.Level} </div> <div class="pb-1"> . </div> 
                                        
                                       </div> 
                                    </Link>
                                </li>

                            ))}


                         
                   
                            </ul>
                            <br/>
                             
                           
                          <div class="flex flex-wrap gap-2">




                          <h4 class="text-xl font-semibold mb-3  ml-5"> Youtube videos </h4>
                          {videos.map((video) => {
                             return(
                                <div  className=' video-item item' >
                                  <iframe src={`https://www.youtube.com/embed/${video.id.videoId}`} allowFullScreen title="Video player" />
                               
                                <div className='content'>
                                   
                                </div>
                                <br/>
                            </div>
                             )
       
        })}     
                                  
                                    </div>
                    </div>
                          </div>
                       
                                 

                </div>

        
            </div>
        </div>
        



        </div>


     
   )
    





}


const VideoList = ({videos , handleVideoSelect}) => {
    const renderedVideos =  videos.map((video) => {
        return
        {
            <div onClick={ () => handleVideoSelect(video)} className=' video-item item'>
            <img className='ui image' src={video.snippet.thumbnails.medium.url} alt={video.snippet.description}/>
            <div className='content'>
                <div className='header '>{video.snippet.title}</div>
            </div>
        </div>
        }
        
        
   
    })
}
