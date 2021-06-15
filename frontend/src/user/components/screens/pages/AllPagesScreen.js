import React ,{useState , useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Header from '../../Header';
import {useDispatch, useSelector} from "react-redux";
import { selectPages,filter,fetchPages} from "../../../../redux/slices/pagesSlice";
import ReactPaginate from 'react-paginate';
import './pagination.css'
const AllPagesScreen = ({history}) =>{
    const [categories, setCategories]= useState([]);
    const [pages,  err, reload] =useSelector(selectPages);
    const [followers,setFollowers] = useState([]);
    const [List,setList] = useState([]);
    const [etat,setEtat] =  useState('visible');
    console.log(pages)

    const [pageNumber,setPageNumber]=useState(0);
    const addedpagesPerPage=5;
    const pageVisited=pageNumber*addedpagesPerPage;
    const pageCount=Math.ceil(pages?.length/addedpagesPerPage);
    const changePage=({selected})=>{
        setPageNumber(selected);
    }

    useEffect(()=>{
        if(!localStorage.getItem("authToken")){
            history.push("/login")
        }
           
        const config = {
            headers: {
                "Content-Type":"appliation/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`
            }
        }

        axios.get(`/category/getAll`, config)
        .then((response) => {
         setCategories(response.data);
         console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
        })

        /**get followers pages */

        axios.get(`/followpage/getAll`, config)
        .then((response) => {
            setFollowers(response.data);
        console.log(response.data)
        })
        .catch((error) => {
        console.log(error)
        })


        let h=[];

        if(followers.length!=0){
       for (let j of followers){

            for( var i = 0; i < pages.length; i++){ 
                //console.log(users[i]._id)
                if ( pages[i]._id === j.PageId) { 
            
                    //users.slice().splice(i, 1); 
                    pages.splice(i, 1); 
                    console.log(pages[i]._id)
                    //setEtat('hidden')
                    
                }
            
            }
            setList(pages);
          
        }
        
    }else{
        setList(pages);
    }

    },[history])

    const dispatch = useDispatch();

    const  filterbyCategory = async (event) => {
        const category=event.target.value;
        if(category==="*")
        {   console.log("all");
        dispatch(fetchPages())
        
        }
        else
        {
            dispatch(filter(category)) 
            console.log(category) 
        } 
        
    }

    const paginatepages=  pages?.slice(pageVisited,pageVisited+addedpagesPerPage).map((val, key) => {
        return(
            <div key={key}>
        
        <div class="lg:flex lg:space-x-6 py-6">
            <a href="#">
                <div class="lg:w-60 w-full h-40 overflow-hidden rounded-lg relative shadow-sm"> 
                     <img src={`assets/uploads/${val.profilePicture}`} alt="" class="w-full h-full absolute inset-0 object-cover"/>
                     <div class="absolute bg-blue-100 font-semibold px-2.5 py-1 rounded-full text-blue-500 text-xs top-2.5 left-2.5">
                     {val.type}
                     </div>
                </div>
            </a>
            <div class="flex-1 lg:pt-0 pt-4"> 
                 
            <Link to={`/pagedetails/${val._id}`} class="text-xl font-semibold line-clamp-2"> {val.name} </Link> 
                <p class="line-clamp-2 pt-1">  </p>
                
              {/**  <div class="flex space-x-2 items-center text-sm">
                    
                        
                </div>
                    <div class="flex items-center mt-2">
                        <img src="assets/user/images/avatars/avatar-2.jpg" class="w-6 rounded-full border-2 border-gray-200 -mr-2" alt=""/>
                        <img src="assets/user/images/avatars/avatar-4.jpg" class="w-6 rounded-full border-2 border-gray-200" alt=""/>
                        <div class="text-sm text-gray-500 ml-2"> 2 friends are members</div>
                        
                </div>
                 <button style={{visibility: etat}} onClick={inviHandler(val._id)} class="flex items-center justify-center h-9 px-3 rounded-md bg-blue-100 text-blue-500"> 
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 mr-2">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path>
                                    </svg>Follow
                                </button> */}

            </div>
        </div>
    </div>

    ) 

    })
    return (
        <>
        <Header/>
    <body>
    <div id="wrapper">
    <div class="main_content">
            <div class="mcontainer">
            <div class="lg:flex  lg:space-x-12">
                    <div class="lg:w-3/4">
                        

                        <div class="flex justify-between relative md:mb-4 mb-3">

                            <div class="flex-1">
                                
                                <h2 class="text-3xl font-semibold"> Pages </h2>
                                
                            </div>
                          
                        </div>

                        <ul class="sidebar-filter-list uk-accordion" uk-accordion="multiple: true">

<li class="uk-open">
    <a class="uk-accordion-title" href="#"> Filter By Category </a>
    <div class="uk-accordion-content" aria-hidden="false">
        <div class="uk-form-controls" onChange={filterbyCategory}  >
        <label style={{marginLeft:'10px'}}>
                <input type="radio"  name="filter" value="*" />
                <span class="test"> All <span>  </span> </span>
        </label>
        { categories.map((val,key) => {
                                    return(
        <label style={{marginLeft:'100px'}}>
                <input  type="radio"  name="filter" value={val.name} />
                <span class="test"> {val.name} <span>  </span> </span>
            </label>
             )})}
        </div>
    </div>
</li>
</ul>


                        <div class="divide-y">
                        {paginatepages}
                        <div style={{marginLeft:'330px'}}>
                        <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    onPageChange={changePage}
                    pageCount={pageCount}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                     />
                     </div>

                        </div>
                       
                    </div>
            
            </div>
            </div>
    
    
    </div>
    </div>
    </body>
    </>
    )}

export default AllPagesScreen;