import React ,{useState , useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Header from '../../Header';
const PagesScreen = ({history}) =>{
    
    const [pages, setPages]= useState([]);
    const [number, setNumber]= useState(0);
    const [categories, setCategories]= useState([]);
    

    useEffect(() => {
        if(!localStorage.getItem("authToken")){
            history.push("/login")
        }
           
        const config = {
            headers: {
                "Content-Type":"appliation/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`
            }
        }

        axios.get(`/page/getAll`, config)
        .then((response) => {
            setPages(response.data);
         console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
        })

        axios.get(`/category/getAll`, config)
        .then((response) => {
         setCategories(response.data);
         console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
        })

         
                
            }
           
    ,[history]);

   
    

    return (
        <>
        <Header/>
    <body>
    <div id="wrapper">
        <div class="main_content">
            <div class="mcontainer">

            <div class="flex justify-between relative md:mb-4 mb-3">
                    <div class="flex-1">
                        <h2 class="text-3xl font-semibold"> Pages </h2>
                        <nav class="cd-secondary-nav border-b md:m-0 -mx-4">
                            <ul>
                                        <li class="active"><Link to="/pages" class="lg:px-2">Pages </Link></li>
                                        <li><Link to="/mypages" class="lg:px-2">My pages </Link></li>
                                        <li><Link to="/statistic" class="lg:px-2">Statistic </Link></li>
                            </ul>
                        </nav>
                    </div>
                    <a href="#" class="flex items-center justify-center h-9 lg:px-5 px-2 rounded-md bg-blue-600 text-white space-x-1.5 absolute right-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5">
                            <path fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                clip-rule="evenodd"></path>
                        </svg>
                        
                        <Link to="/createpage" class="md:block" style={{color:"white"}}>Create </Link>
                    </a> 
                </div>

                <div class="sm:my-6 my-3 flex items-center justify-between border-b pb-3">
                    <div>
                        <h2 class="text-xl font-semibold"> Categories </h2>
                        <p class="font-medium text-gray-500 leading-6"> Find a page by browsing top categories. </p>
                    </div>
                    <a href="#" class="text-blue-500 sm:block "> See all </a>
                </div> 

                <div class="relative -mt-3" uk-slider="finite: true">
                
                <div class="uk-slider-container px-1 py-3">
                    <ul class="uk-slider-items uk-child-width-1-5@m uk-child-width-1-3@s uk-child-width-1-2 uk-grid-small uk-grid">
                    { categories.map((val,key) => {
                        return(
                            <div key={key}>
                        <li>
                            <div class="rounded-md overflow-hidden relative w-full h-36">
                                <div class="absolute w-full h-3/4 -bottom-12 bg-gradient-to-b from-transparent to-gray-800 z-10">
                                </div>
                                <img src={val.photo} class="absolute w-full h-full object-cover" alt=""/>
                                <div class="absolute bottom-0 w-full p-3 text-white z-20 font-semibold text-lg"> {val.name} </div>
                            </div>
                        </li>
                        </div>
                        )})}
                    </ul>
                </div>
                
                <a class="absolute bg-white top-16 flex items-center justify-center p-2 -left-4 rounded-full shadow-md text-xl w-9 z-10 dark:bg-gray-800 dark:text-white" href="#" uk-slider-item="previous"> <i class="icon-feather-chevron-left"></i></a>
                <a class="absolute bg-white top-16 flex items-center justify-center p-2 -right-4 rounded-full shadow-md text-xl w-9 z-10 dark:bg-gray-800 dark:text-white" href="#" uk-slider-item="next"> <i class="icon-feather-chevron-right"></i></a>

            </div>

            <div class="my-6 flex items-center justify-between border-b pb-3">
                    <div>
                        <h2 class="text-xl font-semibold"> Suggestions  </h2>
                        <p class="font-medium text-gray-500 leading-6"> Find a pages You Might Be Interested In. </p>
                    </div>
                    <Link to="/allpages" class="text-blue-500 sm:block ">See all </Link>
                </div> 

           {/**  */}   
           
            

                <div class="grid md:grid-cols-2 divide divide-gray-200 gap-x-6 gap-y-4">

                { pages.map((val,key) => {
                        return(
                            <div key={key}>
                                   
                                    <div class="flex items-center space-x-4">
                                    <div class="w-20 h-20 flex-shrink-0 rounded-md relative mb-3"> 
                                        <img src={`assets/uploads/${val.profilePicture}`} class="absolute w-full h-full inset-0 rounded-md object-cover shadow-sm" alt=""/>
                                    </div> 
                                    <div class="flex-1 border-b pb-3">
                                    <Link to={`/pagedetails/${val._id}`}  class="text-lg font-semibold capitalize">{val.name}</Link>
                                    {/**     <div class="flex space-x-2 items-center text-sm">
                                        
                                            <div> 16k Members</div>
                                            <div>·</div>
                                            <div> 12 posts a week</div>
                                        </div>
                                        <div class="flex items-center mt-2">
                                            <img src="assets/user/images/avatars/avatar-2.jpg" class="w-6 rounded-full border-2 border-gray-200 -mr-2" alt=""/>
                                            <img src="assets/user/images/avatars/avatar-4.jpg" class="w-6 rounded-full border-2 border-gray-200" alt=""/>
                                            <div class="text-sm text-gray-500 ml-2"> 2 friends are members</div>
                                        </div>
*/}
                                    </div>
                                
                    </div>
                            </div>
                        ) 
                 })}
                    
                    
                </div>


                        <br/> 
                    </div>
                    
                     
                    </div>

        
        </div>
        </body>
        </>
    )
}
export default PagesScreen;