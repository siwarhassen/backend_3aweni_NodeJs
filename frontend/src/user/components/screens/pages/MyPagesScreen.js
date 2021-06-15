import React ,{useState , useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Header from '../../Header';
import {useDispatch, useSelector} from "react-redux";
import { selectMyPages, deleteMyPage} from "../../../../redux/slices/mypagesSlice";
const MyPagesScreen = ({history}) =>{

    const [mypages,  err, reload] =useSelector(selectMyPages);
    const [search, setSearch]= useState('');
    //const [pages, setPages]= useState([]);
    useEffect(() => {
        if(!localStorage.getItem("authToken")){
            history.push("/login")
        }
           
         /*       const config = {
                    headers: {
                        "Content-Type":"appliation/json",
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`
                    }
                }

                axios.get(`/page/getMyPages`, config)
                .then((response) => {
                 setPages(response.data);
                 console.log(response.data)
                })
                .catch((error) => {
                  console.log(error)
                })*/
                
            }
           
    ,[history]);

    const dispatch =useDispatch();

    const deleteHandler = (id) =>async () => {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
          }
    
        axios.delete(`/page/delete/${id}`, {
            headers: headers
          })
          .then((response) => {
           dispatch(deleteMyPage(id));
          })
          .catch((error) => {
            console.log(error)
          })
       }
    
    return (
        <>
        <Header/>
        <body>
        <div class="main_content">
            <div class="mcontainer">

               
                    <div class="flex justify-between relative md:mb-4 mb-3">
                            <div class="flex-1">
                            <div className="row">
                                <h2 class="text-3xl font-semibold"> Pages </h2>
                                <input style={{width:'350px', height:'80px', marginLeft:'530px'}} type="text" placeholder="search..." onChange={e => {setSearch(e.target.value)}}/>
                                </div>
                                <nav class="cd-secondary-nav border-b md:m-0 -mx-4">
                                    <ul>
                                        <li><Link to="/pages" class="lg:px-2">Pages </Link></li>
                                        <li class="active"><Link to="/mypages" class="lg:px-2">My pages </Link></li>
                                        <li><Link to="/statistic" class="lg:px-2">Statistic </Link></li>
                                    </ul>
                                </nav>
                            </div>
                            
                        </div>



                        <div class="divide-y">
                        { mypages?.filter((val)=>{
                            if(search == ""){
                                return val
                            }else if (val.name.toLowerCase().includes(search.toLowerCase())){
                                return val
                            }
                        }).map((val,key) => {
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
                                  <div className='row'>   
                                <Link to={`/pagedetails/${val._id}`} class="text-xl font-semibold line-clamp-2"> {val.name} </Link> 
                                
                                    </div>
                                    <p class="line-clamp-2 pt-1"> </p>
                                        <div class="flex items-center mt-2">
                                            <img src="assets/user/images/avatars/avatar-2.jpg" class="w-6 rounded-full border-2 border-gray-200 -mr-2" alt=""/>
                                            <img src="assets/user/images/avatars/avatar-4.jpg" class="w-6 rounded-full border-2 border-gray-200" alt=""/>
                                            <div class="text-sm text-gray-500 ml-2"> 2 friends are members</div>
                                        </div>
                                        <div class="flex space-x-2 items-center text-sm">
                                       
                                        <Link to={`/editpage/${val._id}`} class="text-xl font-semibold line-clamp-2" style={{marginLeft:'550px',fontSize:'13px'}}><img src="assets/user/images/edit1.png" style={{width:'22px', height:'25px'}} alt=""/>Edit</Link>
                                        <button onClick={deleteHandler(val._id)} class="text-xl font-semibold line-clamp-2" style={{marginLeft:'10px',fontSize:'13px',color:'#fe5a1d'}} ><img src="assets/user/images/supp5.png" style={{width:'23px', height:'23px'}} alt=""/>Delete</button>
                                        </div>
                                </div>
                            </div>
                        </div>

                        ) 
                        })}

                    </div>


           {/**             <div class="relative" uk-slider="finite: true">
                            <div class="uk-slider-container px-1 py-3">
                                <ul class="uk-slider-items uk-child-width-1-4@m uk-child-width-1-3@s uk-child-width-1-2 uk-grid-small uk-grid">
                                { pages.map((val,key) => {
                            return(
                                <div key={key}>
                                    <li >
                                    <Link to={`/pagedetails/${val._id}`}><a>
                                            <img src={`assets/uploads/${val.profilePicture}`} class="w-full h-48 rounded-lg shadow-sm object-cover"/>
                                            <div class="pt-2">
                                               <h4 class="text-lg font-semibold"> {val.name} </h4>
                                            </div>
                                       </a></Link>
                                       <a href="#" class="flex items-center justify-center h-9 lg:px-5 px-2 rounded-md bg-blue-600 text-white space-x-1.5 absolute right-0">
                                
                                                    <Link to="/createpage" class="md:block" style={{color:"white"}}>Edit </Link>
                                                </a> 
                                    </li>
                                </div>
                            )})}
                        
                                </ul>
                        
                                <a class="absolute bg-white bottom-1/2 flex items-center justify-center p-2 -left-4 rounded-full shadow-md text-xl w-9 z-10 dark:bg-gray-800 dark:text-white"
                                    href="#" uk-slider-item="previous"> <i class="icon-feather-chevron-left"></i></a>
                                <a class="absolute bg-white bottom-1/2 flex items-center justify-center p-2 -right-4 rounded-full shadow-md text-xl w-9 z-10 dark:bg-gray-800 dark:text-white"
                                    href="#" uk-slider-item="next"> <i class="icon-feather-chevron-right"></i></a>
                        
                            </div>
                        </div>

 */}
                         
                   

        
            </div>
        </div>
        </body>
        </>
    )
}
export default MyPagesScreen;