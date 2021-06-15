import React ,{useState , useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Header from '../../Header';
import './edit.css';
import {useDispatch, useSelector} from "react-redux";
import { selectEducations, addEducation, deleteEducation, updateEducation} from "../../../../redux/slices/educationSlice";
import { selectCvs, addCv, deleteCv} from "../../../../redux/slices/cvSlice";
import { Formik } from "formik";
import * as Yup from "yup";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import {Dialog,Button,DialogActions,DialogContent,DialogContentText,DialogTitle } from '@material-ui/core';
// Import the main component
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library
import dateFormat from 'dateformat';
import Camera from 'react-dom-camera';
import { getPosts } from '../../../../redux/actions/postAction';
import AddPost from '../../Post/AddPost';
import PostItem from '../../Post/PostItem';
const PostsProfileScreen = ({history}) =>{

    

const [cvs,  err1, reload1] =useSelector(selectCvs);

    const [user, setUser]= useState(Object);
    
    const [username, setName]= useState("");
    const [dateBirth, setBirth]= useState("");
    const [country, setCountry]= useState("");
    const [address, setAddress]= useState("");
    const [numTel, setTel]= useState("");
    const [error, setError]= useState("");
    const [profilePicture, setProfile]= useState("");
    const [coverPicture, setCover]= useState("");
    const [cv, setCv]= useState("");
    const [url,setUrl] = useState("");
    const [urlC,setUrlc] = useState("");

    const [followers,setFollowers] = useState([]);
    const [numbersF,setNumbersF] = useState(0);
    const [numbersFby,setNumbersFby] = useState(0);

    const [followers_page,setFollowers_page] = useState([]);
    const [numbersPage,setNumbersPage] = useState(0);

    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [open4, setOpen4] = React.useState(false);
    const [open5, setOpen5] = React.useState(false);

    const [image,setImage] = useState("");
/**posts */
const userconnected = localStorage.getItem("connecteduser");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  const posts = useSelector((state) =>
    state.postReducer.posts.filter((post) => post.username._id === userconnected)
  );
/**end posts */
    // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  
  // for onchange event
  const [pdfFile, setPdfFile]=useState(null);
  const [pdfFileError, setPdfFileError]=useState('');

  // for submit event
  const [viewPdf, setViewPdf]=useState(null);

  const dateB=dateFormat(user.dateBirth, "mmmm dS, yyyy");

  const CoolButton = ({ onClick }) => (
  <button onClick={onClick} type="button">
    <strong>TakePhoto</strong>  
  </button>
);


    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleClickOpen1 = () => {
        setOpen1(true);
      };
    
      const handleClose1 = () => {
        setOpen1(false);
      };

      const handleClickOpen2 = () => {
        setOpen2(true);
      };
    
      const handleClose2 = () => {
        setOpen2(false);
      };

      const handleClickOpen3 = () => {
        setOpen3(true);
      };
    
      const handleClose3 = () => {
        setOpen3(false);
      };
      const handleClickOpen4 = () => {
        setOpen4(true);
      };
    
      const handleClose4 = () => {
        setOpen4(false);
      };
      const handleClickOpen5 = () => {
        setOpen5(true);
      };
    
      const handleClose5 = () => {
        setOpen5(false);
      };


     


    useEffect(() => {
        if(!localStorage.getItem("authToken")){
            history.push("/login")
        }

        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
          }

        axios.get(`/api/auth/details_user`, {
            headers: headers
        })
        .then((response) => {
            setUser(response.data.data);
         console.log(user)
        })
        .catch((error) => {
          console.log(error)
        })

        

        if(url){
            axios.put(`/api/auth/updateprofilepicture`,{
                profilePicture:url
            }, {
                headers: headers
            })
            .then((response) => {
            console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
        }

        if(urlC){
            axios.put(`/api/auth/updatecoverpicture`,{
                coverPicture:urlC
            }, {
                headers: headers
            })
            .then((response) => {
            console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
        }

        if(image){
            axios.put(`/api/auth/updateprofilepicture`,{
                profilePicture:image
            }, {
                headers: headers
            })
            .then((response) => {
            console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
        }
      

            /**get all followers */

            axios.get(`/followuser/getFollowers`, {
                headers: headers
            })
            .then((response) => {
                setFollowers(response.data);
            console.log(response.data)
            })
            .catch((error) => {
            console.log(error)
            })


            axios.get(`/followuser/numbers`, {
                headers: headers
            })
            .then((response) => {
                setNumbersF(response.data);
            console.log(response.data)
            })
            .catch((error) => {
            console.log(error)
            })

            axios.get(`/followuser/numbersf`, {
                headers: headers
            })
            .then((response) => {
                setNumbersFby(response.data);
            console.log(response.data)
            })
            .catch((error) => {
            console.log(error)
            })

            /** end followers */

            /**get all followers page */

            axios.get(`/followpage/getFollowers`, {
                headers: headers
            })
            .then((response) => {
                setFollowers_page(response.data);
            console.log(response.data)
            })
            .catch((error) => {
            console.log(error)
            })


            axios.get(`/followpage/numbers`, {
                headers: headers
            })
            .then((response) => {
                setNumbersPage(response.data);
            console.log(response.data)
            })
            .catch((error) => {
            console.log(error)
            })

            }
           
    ,[history,url,urlC,user]);//,user

   

    const updateHandler = async (e) =>{
       // e.preventDefault();
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
          }
          console.log(e.target.value)

        axios.put(`/api/auth/update`,{username,dateBirth,numTel,country,address}, {
            headers: headers
          })
          .then((response) => {
           console.log(response)
           store.addNotification({
            title: "Wonderful!",
            message: "Your personnel information has been updated with succes! check your profile",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 3000,
              onScreen: true
            }
          });
          })
          .catch((error) => {
            console.log(error)
          })
        
    }

    const onChangeProfile = e =>{
        setProfile(e.target.files[0]);
        //console.log(profilePicture)
    }

    
    const updateProfilePictureHandler = async (e) =>{
           const data = new FormData()
            data.append("file",profilePicture)
            data.append("upload_preset","projetRN")
            data.append("cloud_name","sabrine")
       fetch("https://api.cloudinary.com/v1_1/sabrine/image/upload",{
           method:"post",
           body:data
       })
       .then(res=>res.json())
       .then(data=>{
          setUrl(data.url)
          console.log(data);
       })
       .catch(err=>{
           console.log(err)
       })

       const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("authToken")}`
      }
      console.log(url)

        axios.put(`/api/auth/updateprofilepicture`,{
            profilePicture:url
        }, {
            headers: headers
        })
        .then((response) => {
        console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
         
     }

     const onChangeCover = e =>{
        setCover(e.target.files[0]);
    }

     const updateCoverPictureHandler = async (e) =>{
        const data = new FormData()
         data.append("file",coverPicture)
         data.append("upload_preset","projetRN")
         data.append("cloud_name","sabrine")
    fetch("https://api.cloudinary.com/v1_1/sabrine/image/upload",{
        method:"post",
        body:data
    })
    .then(res=>res.json())
    .then(data=>{
       setUrlc(data.url)
       console.log(data);
    })
    .catch(err=>{
        console.log(err)
    })

    const headers = {
     'Content-Type': 'application/json',
     Authorization: `Bearer ${localStorage.getItem("authToken")}`
   }
   console.log(url)

     axios.put(`/api/auth/updateprofilepicture`,{
         profilePicture:url
     }, {
         headers: headers
     })
     .then((response) => {
     console.log(response)
     })
     .catch((error) => {
         console.log(error)
     })
     
      
  }



    const deleteHandler = (id) =>async () => {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
          }
    
        axios.delete(`/cv/delete/${id}`, {
            headers: headers
          })
          .then((response) => {
           dispatch(deleteCv(id));
          })
          .catch((error) => {
            console.log(error)
          })
       }

// onchange event
const fileType=['application/pdf'];



    return (
        <>
        <Header/>
        <body>
        <ReactNotification/>
        {/** Edit profile picture */}



        <div>
      
      <Dialog
          open={open1}
          onClose={handleClose1}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
          <DialogActions>
          <Button onClick={handleClose1} color="primary" autoFocus>
          X
          </Button>
          </DialogActions>
          <DialogTitle id="alert-dialog-title"></DialogTitle>
          <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <div class="profile user-profile bg-white rounded-2xl -mt-4">
            <div class="profiles_banner">
                        <img src={user.coverPicture} alt="Cover Picture" />
                        
                    </div>

                <div class="profiles_content">

                    <div class="profile_avatar">
                        <div class="profile_avatar_holder"> 
                            <img src={user.profilePicture} alt=""/>
                        </div>
                        <div class="user_status status_online"></div>
                        <div class="icon_change_photo" hidden> <ion-icon name="camera" class="text-xl"></ion-icon> </div>
                    </div>

                    <div class="profile_info">
                        <h1> {user.username} </h1>
                    </div>

                </div>
                <form onSubmit={(e)=>{
                                            e.preventDefault()
                                            updateProfilePictureHandler(e)
                                        }}>
                <div>
                    <input style={{width:'600px'}} type="file" placeholder="Profile Picture" id="profilePicture" required onChange={onChangeProfile} tabIndex={1} class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full"/>
                </div>
                <div>
                    <button type="submit" class="bg-blue-600 font-semibold p-2 mt-5 rounded-md text-center text-white">Update</button>
                </div> 
                </form>        
            </div>
               
          </DialogContentText>
          </DialogContent>
          
      </Dialog>
      </div>


  
{/** end */}



{/** camera */}



<div>
      
      <Dialog
          open={open5}
          onClose={handleClose5}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
          <DialogActions>
          <Button onClick={handleClose5} color="primary" autoFocus>
          X
          </Button>
          </DialogActions>
          <DialogTitle id="alert-dialog-title"></DialogTitle>
          <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <br></br><br></br><br></br><br></br><br></br><br></br>
          <div class="profile user-profile bg-white rounded-2xl -mt-4">
          <div class="profiles_content">

            <div class="profile_avatar">
                <div class="profile_avatar_holder"> 
                    <img src={user.profilePicture} alt=""/>
                </div>
                <div class="user_status status_online"></div>
                <div class="icon_change_photo" hidden> <ion-icon name="camera" class="text-xl"></ion-icon> </div>
            </div>

            <div class="profile_info">
                <h1> {user.username} </h1>
            </div>

            </div>
            </div>
            <Camera
            captureButtonRenderer={onClick => <CoolButton onClick={onClick} />}
            onTakePhoto={image =>
            console.log(setImage(image), 'do whatever you want with the image')
            }
          />
         
               
          </DialogContentText>
          </DialogContent>
          
      </Dialog>
      </div>


  
{/** end camera */}



{/** edit cover picture */}


<div>
      
      <Dialog
          open={open2}
          onClose={handleClose2}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
          <DialogActions>
          <Button onClick={handleClose2} color="primary" autoFocus>
          X
          </Button>
          </DialogActions>
          <DialogTitle id="alert-dialog-title"></DialogTitle>
          <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <div class="profile user-profile bg-white rounded-2xl -mt-4">
            <div class="profiles_banner">
                        <img src={user.coverPicture} alt="Cover Picture"/>
                        
                    </div>

                <div class="profiles_content">

                    <div class="profile_avatar">
                        <div class="profile_avatar_holder"> 
                            <img src={user.profilePicture} alt=""/>
                        </div>
                        <div class="user_status status_online"></div>
                        <div class="icon_change_photo" hidden> <ion-icon name="camera" class="text-xl"></ion-icon> </div>
                    </div>

                    <div class="profile_info">
                        <h1> {user.username} </h1>
                    </div>

                </div>
                <form onSubmit={(e)=>{
                                            e.preventDefault()
                                            updateCoverPictureHandler(e)
                                        }}>
                <div>
                    <input style={{width:'600px'}} type="file" placeholder="Cover Picture" id="coverPicture" required onChange={onChangeCover} tabIndex={1} class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full"/>
                </div>
                <div>
                    <button type="submit" class="bg-blue-600 font-semibold p-2 mt-5 rounded-md text-center text-white">Update</button>
                </div> 
                </form>        
            </div>
               
          </DialogContentText>
          </DialogContent>
          
      </Dialog>
      </div>

{/** end */}





<div id="wrapper">
        <div class="main_content">
            <div class="mcontainer">

                <div class="profile user-profile bg-white rounded-2xl -mt-4">
  
                    <div class="profiles_banner">
                        <img src={user.coverPicture} alt=""/>
                        <div class="profile_action absolute bottom-0 right-0 space-x-1.5 p-3 text-sm z-50 lg:flex">
                          <Button onClick={handleClickOpen1} class="flex items-center justify-center h-8 px-3 rounded-md bg-gray-700 bg-opacity-70 text-white space-x-1.5"> 
                              <ion-icon name="crop-outline" class="text-xl"></ion-icon>
                              <span> Edit Profile Picture  </span>
                          </Button>

                          <Button onClick={handleClickOpen2} class="flex items-center justify-center h-8 px-3 rounded-md bg-gray-700 bg-opacity-70 text-white space-x-1.5"> 
                              <ion-icon name="create-outline" class="text-xl"></ion-icon>
                              <span> Edit Cover Picture </span>
                          </Button>
                       {/**    <Button onClick={handleClickOpen5}>picture</Button>*/}
                      </div>
                    </div>
                    <div class="profiles_content">

                        <div class="profile_avatar">
                            <div class="profile_avatar_holder"> 
                            
                                <img src={user.profilePicture} alt="profle picture" onClick={handleClickOpen5}/>
                            
                            </div>
                            <div class="user_status status_online"></div>
                            <div class="icon_change_photo" hidden> <ion-icon name="camera" class="text-xl"></ion-icon> </div>
                        </div>

                        <div class="profile_info">
                            <h1> {user.username} </h1>
                            <p> Family , Food , Fashion , Fourever <a href="#">Edit </a></p>
                        </div>

                    </div>

                    <div class="flex justify-between lg:border-t flex-col-reverse lg:flex-row">
                        <nav class="cd-secondary-nav pl-2 is_ligh -mb-0.5 border-transparent">
                            <ul>
                                <li class="active"><Link to="/postsprofile">Posts</Link></li>
                                <li ><Link to="/profile_education" >Educations</Link></li>
                                <li ><Link to="/profile_experience" >Experiences</Link></li>
                                <li ><Link to="/profile_projet" >Projects</Link></li>
                                <li ><Link to="/profile_skills" >Skills</Link></li> 
                            </ul>
                        </nav>

                        <div class="flex items-center space-x-1.5 flex-shrink-0 pr-3  justify-center order-1">
                            {/**<a href="#" class="text-blue-500"> See all </a> */} 
                            <a href="#" class="flex items-center justify-center h-10 px-5 rounded-md bg-blue-600 text-white  space-x-1.5"> 
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path>
                                </svg>
                                <span> Add Your Story </span>
                            </a>
                            
                        </div>
                    </div>

                </div>

                <div class="lg:flex lg:mt-8 mt-4 lg:space-x-8">
                  

                <div class="space-y-5 flex-shrink-0 lg:w-7/12">
                
                <AddPost></AddPost>
                  {posts.map((post) => {
                    return <PostItem post={post} key={post._id}></PostItem>;
                  })}


  
                    
                      

                </div>

                  <div class="lg:w-4/12 space-y-6">

                        {/*<!-- start about -->*/}
                  
                      <div class="widget">
                          <h4 class="text-2xl mb-3 font-semibold"> About </h4>
                          <ul class="text-gray-600 space-y-4">
                              
                              <li class="flex items-center space-x-2"> 
                                  <ion-icon name="globe" class=" rounded-full bg-gray-200 text-xl p-1.5 mr-3"></ion-icon>
                                  Birthday <strong> {dateB}  </strong>
                              </li>
                              <li class="flex items-center space-x-2"> 
                                  <ion-icon name="heart-sharp" class=" rounded-full bg-gray-200 text-xl p-1.5 mr-3"></ion-icon>
                                  From <strong> {user.country}  </strong>
                              </li>
                              <li class="flex items-center space-x-2"> 
                                  <ion-icon name="heart-sharp" class=" rounded-full bg-gray-200 text-xl p-1.5 mr-3"></ion-icon>
                                  Adress <strong> {user.address}  </strong>
                              </li>
                              <li class="flex items-center space-x-2"> 
                                  <ion-icon name="home-sharp" class=" rounded-full bg-gray-200 text-xl p-1.5 mr-3"></ion-icon>
                                  Email <strong> {user.email}  </strong>
                              </li>
                              <li class="flex items-center space-x-2"> 
                                  <ion-icon name="home-sharp" class=" rounded-full bg-gray-200 text-xl p-1.5 mr-3"></ion-icon>
                                  Phone Number <strong> {user.numTel}  </strong>
                              </li>
                              <li class="flex items-center space-x-2"> 
                                  <ion-icon name="logo-rss"  class=" rounded-full bg-gray-200 text-xl p-1.5 mr-3"></ion-icon>
                                  Flowwed By <strong> {numbersFby} Peaple </strong>
                              </li>                                
                          </ul>
                          <Button style={{color:'#1E90FF'}} onClick={handleClickOpen} class="bg-gray-100 py-2.5 text-center font-semibold w-full mt-4 block rounded">Edit</Button>

                          <div>
      
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogActions>
                                <Button onClick={handleClose} color="primary" autoFocus>
                                X
                                </Button>
                                </DialogActions>
                                <DialogTitle id="alert-dialog-title">{"Edit your personal informations"}</DialogTitle>
                                <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    <form onSubmit={(e)=>{
                                            e.preventDefault()
                                            updateHandler(e)
                                        }} >
                                    {error && <span>{error}</span>}
                                            <div>
                                                <label htmlFor="name" class="mb-0"> Name </label>
                                                <input style={{width:'600px'}} type="text" placeholder={user.username} id="name" required class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full" value={username} onChange={(e) => setName(e.target.value)}/>
                                            </div>
                                            <div>
                                                <label htmlFor="birthday" class="mb-0"> Birthday </label>
                                                <input type="date" placeholder={user.dateBirth} id="birthday" required class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full" value={dateBirth} onChange={(e) => setBirth(e.target.value)}/>
                                            </div>
                                            <div>
                                                <label htmlFor="numTel" class="mb-0"> Phone number </label>
                                                <input type="number" placeholder={user.numTel} id="numTel" required class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full" value={numTel} onChange={(e) => setTel(e.target.value)}/>
                                            </div>
                                            <div>
                                                <label htmlFor="country" class="mb-0"> Country </label>
                                                <input type="text" placeholder={user.country} id="country" required class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full" value={country} onChange={(e) => setCountry(e.target.value)}/>
                                            </div>
                                            <div>
                                                <label htmlFor="address" class="mb-0"> Address </label>
                                                <input type="text" placeholder={user.address} id="address" required class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full" value={address} onChange={(e) => setAddress(e.target.value)}/>
                                            </div>
                                            <div>
                                                <button type="submit" class="bg-blue-600 font-semibold p-2 mt-5 rounded-md text-center text-white">
                                                    Update</button>
                                            </div>
                                    </form>
                                </DialogContentText>
                                </DialogContent>
                                
                            </Dialog>
                            </div>
                      
                      
                      </div>
                  
                        {/*<!-- end about -->*/}





                        <div class="widget">
                          <h4 class="text-2xl mb-3 font-semibold"> Cv </h4>
                          <ul class="text-gray-600 space-y-4">

                          { cvs?.map((val,key) => {
                                return(
                                        <div key={key}>

                                <li class="flex items-center space-x-2"> 
                                  <ion-icon name="globe" class=" rounded-full bg-gray-200 text-xl p-1.5 mr-3"></ion-icon>
                                  <a href={`assets/uploads/${val.cv}`}>{val.cv}</a>  
                                  <button onClick={deleteHandler(val._id)} class="text-xl font-semibold line-clamp-2" style={{marginLeft:'150px', fontSize:'13px',color:'#fe5a1d'}} ><img src="assets/user/images/supp5.png" style={{width:'20px', height:'20px'}} alt=""/></button>
                                </li>

                                        </div>
                                )})}
                              
                             
                                                          
                          </ul>
                          <Button style={{color:'#1E90FF'}} onClick={handleClickOpen4} class="bg-gray-100 py-2.5 text-center font-semibold w-full mt-4 block rounded">Add</Button>

                          <div>
      
                            <Dialog
                                open={open4}
                                onClose={handleClose4}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                
                            >
                                <DialogActions>
                                <Button onClick={handleClose4} color="primary" autoFocus>
                                X
                                </Button>
                                </DialogActions>
                                
                                <DialogContent>
                                <DialogContentText id="alert-dialog-description">

                                <h4>View PDF</h4>
      <div className='pdf-container' style={{width:'500px'}}>
        {/* show pdf conditionally (if we have one)  */}
        {viewPdf&&<><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
          <Viewer fileUrl={viewPdf}
            plugins={[defaultLayoutPluginInstance]} />
      </Worker></>}

      {/* if we dont have pdf or viewPdf state is null */}
      {!viewPdf&&<>No pdf file selected</>}
      </div>


                                <Formik
initialValues={{
    cv:'',
    }} 
validationSchema={Yup.object({
        cv: Yup.string()
          .required('Required field'),
        
      })}
onSubmit={ async (values)=>{

    const formData = new FormData();

        formData.append("cv", values.cv);
console.log(values.cv)
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("authToken")}`
      }
      console.log(formData)

    axios.post(`/cv/add`,formData, {
        headers: headers
      })
      .then((response) => {
       console.log(response.data.data);
       dispatch(addCv(response.data.data));
      })
      .catch((error) => {
        console.log(error)
      })
      if(pdfFile!==null){
        setViewPdf(pdfFile);
      }
      else{
        setViewPdf(null);
      }
      
  }}
>
    {formik => (
<>
<div class="lg:p-12 max-w-xl lg:my-0 my-12 mx-auto p-6 space-y-">
<form onSubmit={formik.handleSubmit} enctype="multipart/form-data" > 

                                            <div >
                                            <label htmlFor="cv" class="mb-0"> Cv <span style={{color:'red'}}>*</span></label>
                                                <input style={{width:'500px'}} type="file"  placeholder="Cv" id="cv" onChange={(event) => {formik.setFieldValue("cv", event.target.files[0]);
                                                 let selectedFile=event.target.files[0];
                                                 if(selectedFile){
                                                   if(selectedFile&&fileType.includes(selectedFile.type)){
                                                     let reader = new FileReader();
                                                         reader.readAsDataURL(selectedFile);
                                                         reader.onloadend = (e) =>{
                                                           setPdfFile(e.target.result);
                                                           setPdfFileError('');
                                                         }
                                                   }
                                                   else{
                                                     setPdfFile(null);
                                                     setPdfFileError('Please select valid pdf file');
                                                   }
                                                 }
                                                 else{
                                                   console.log('select your file');
                                                 }
                  }}  aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback" class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full" />
                                                {formik.touched.cv && formik.errors.cv ? (
                                                        <div id="cv" style={{color:'red', fontSize:'13px'}} class="form-control is-invalid" >
                                                        {formik.errors.cv}.
                                                        </div>    
                                                ) : null}
                                            </div>

                                            <div style={{marginLeft:'50px'}}>
                                                <button type="submit" class="bg-blue-600 font-semibold p-2 mt-5 rounded-md text-center text-white">
                                                    Add</button>
                                            </div>
</form> 
      




</div>
        
                            </>
)}
</Formik>




                         {/**          <form onSubmit={(e)=>{
                                            e.preventDefault()
                                            updateHandler(e)
                                        }} >
                                    {error && <span>{error}</span>}
                                            <div>
                                                <label htmlFor="cv" class="mb-0"> Cv </label>
                                                <div>
                                                    <input style={{width:'600px'}} type="file" placeholder="Cv" id="cv" required onChange={onChangeCv} tabIndex={1} class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full"/>
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <button type="submit" class="bg-blue-600 font-semibold p-2 mt-5 rounded-md text-center text-white">
                                                    Add</button>
                                            </div>
                                    </form>*/}  
                                </DialogContentText>
                                </DialogContent>
                                
                            </Dialog>
                            </div>
                      
                      
                      </div>






                        {/*<!-- start friends -->*/}
                      <div class="widget border-t pt-4">
                          <div class="flex items-center justify-between mb-4">
                              <div>
                                  <h4 class="text-2xl -mb-0.5 font-semibold"> Friends </h4>
                                  <p> {numbersF} Friends</p>
                              </div>
                              <Link to="/list_users" ><a class="text-blue-600 ">See all</a></Link>
                          </div>
                          <div class="grid grid-cols-3 gap-3 text-gray-600 font-semibold">
                          { followers.map((val,key) => {
                                    return(
                                <div key={key}>
                              <Link to={`/userdetails/${val._id}`}><a>  
                                  <div class="avatar relative rounded-md overflow-hidden w-full h-24 mb-2"> 
                                      <img src={val.profilePicture} alt="" class="w-full h-full object-cover absolute"/>
                                  </div>
                                  <div> {val.username} </div>
                              </a></Link>
                            </div>
                            )})}
                          </div>
                          <Link to="/list_users" ><a class="text-blue-600 "></a><a href="#" class="bg-gray-100 py-2.5 text-center font-semibold w-full mt-4 block rounded"> See all </a></Link>
                      </div>

                        {/*<!-- end friends -->*/}
                        {/*<!-- start group -->*/}

                      <div class="widget border-t pt-4">
                          <div class="flex items-center justify-between mb-2">
                              <div>
                                  <h4 class="text-2xl -mb-0.5 font-semibold"> Pages </h4>
                                  <p> {numbersPage} Pages folllowed</p>
                              </div>
                              <a class="text-blue-600 ">See all</a>
                          </div>
                          <div>
                              <div class="flex items-center space-x-4 hover:bg-gray-100 rounded-md -mx-2 p-2">
                              { followers_page.map((val,key) => {
                                    return(
                                <div key={key}>
                                  <Link to={`/pagedetails/${val._id}`}><div class="w-14 h-14 flex-shrink-0 rounded-md relative"> 
                                      <img src={`assets/uploads/${val.profilePicture}`} class="absolute w-full h-full inset-0 rounded-md" alt=""/>
                                  </div></Link>
                                  <div class="flex-1">
                                      <h3 class="text-lg font-semibold capitalize"> {val.name} </h3>
                                      <div class="text-sm text-gray-500 -mt-0.5"></div>
                                  </div>
                                  
                              </div>
                              )})}
                              </div>
                                    
                          </div>
                      </div>
                      
                        {/*<!-- end group -->*/}

                  </div>
                </div> 

            </div>
        </div>
        
        </div>   
            
    </body>
        </>
    )
}
export default PostsProfileScreen;