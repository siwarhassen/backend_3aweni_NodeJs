import React ,{Component,useEffect} from 'react';
import {Link } from 'react-router-dom';
import axios from 'axios';
import { queryApi } from "../../../utils/queryApi";
import { useApi } from "../../../hooks/useApi";
import { useDispatch ,useSelector } from 'react-redux';
import { useState} from 'react';
import Header from '../../../user/components/Header';
import { getPosts } from "../../../redux/actions/postAction";
import AddPost from "../Post/AddPost";
import PostItem from "../Post/PostItem";

export default function GroupTimeline({match}) {


	const id = match.params.id;
	const [group, err, reload] = useApi("groups/group/"+id,null,"GET");
	const [members, erre, reloads] = useApi("groupmember/members/"+id);
   const [fileData,setFileData] = useState();
   const [image, setFile] = useState("");
  let tasswira;
   const [error, setError]= useState("");
   const handleFileChange = ({target}) =>{
	   setFileData(target.files[0]);
	   setFile(target.value);
	   console.log(target.files[0]);
   }
let joinorleave=0;
let admin=0;

for (let i = 0; i < members?.length ; i++) {
	
	if (members[i].Member?._id == localStorage.getItem("connecteduser")){
	 
		localStorage.setItem('memberid', members[i]._id);	
		joinorleave=2;
	    break;		
	}
	else {
		joinorleave=1;	
		localStorage.removeItem('memberid');
	}
  }

  for (let i = 0; i < members?.length ; i++) {
	if (members[i].Member?._id == localStorage.getItem("connecteduser")){		
		if( members[i].Role=="Admin")
	admin=1;
	    break;		
	}
	else {
		admin=0;
	}
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const posts = useSelector((state) =>
  state.postReducer.posts.filter((post) => post.Group === id)
);
  const editshowbutton=() =>{
	document.getElementById("editconfirmed").hidden  = false;
	document.getElementById("editcover").hidden = true;
  }

  
  const cancelhide=() =>{
	document.getElementById("editconfirmed").hidden  = true;
	document.getElementById("editcover").hidden = false;
  }	

  const privateandnotmember =() => {
	
	if(group?.Type=="Private")
	
    return true;


	};

  const joingroup= () => {
	const newMember = {
		Group: id,
		Role: 'Member',
		Member: localStorage.getItem("connecteduser")
	};
	

	axios.post(process.env.REACT_APP_API_URL+'/groupmember/join', newMember)
      .then(res => {
        console.log(res);
        console.log(res.data);
	  })
  }

  const leavegroup= () => {
	axios.delete(process.env.REACT_APP_API_URL+'/groupmember/leave/'+localStorage.getItem('memberid') )
      .then(res => {
        console.log(res);
        console.log(res.data);
	  })
  }

   

const handleSubmit = async(e)=>{
	e.preventDefault();


	const formdata = new FormData();
	formdata.append("file" , fileData);
	formdata.append("upload_preset" ,"3aweni")
	formdata.append("cloud_name","espritnn")
	fetch("https://api.cloudinary.com/v1_1/espritnn/image/upload",{
      method:"post", 
	  body:formdata
	})
	.then(res=>res.json())
	.then(formdata=>{
		console.log(formdata.url)	
		
		tasswira=formdata.url;
	
			
			applyupdate();
	
	
	})
	.catch(err=>{
		console.log(err)
	})
	

}

async function applyupdate() { 
	const config = {
		header: {
			"Content-Type":"application/json"
		}
	}
	const Groupimageupdate = {
		photo: tasswira,
	};
	try{
					
				const {data} =  await axios.put(process.env.REACT_APP_API_URL+'/groups/update/'+group?._id , Groupimageupdate,config);
				window.location.reload(false);			
				} catch (error) {
					setError(error.response.data.error);
					setTimeout(() => {
						setError("");
					}, 5000);
				}
 }

    {
        return (
          
			
<body>
<Header />

	<div>
	  
		<div class="main_content">
			<div class="mcontainer">
				<div class="profile is_group bg-white rounded-2xl -mt-4">
					<div class="profiles_banner">
                        <img src= {group?.photo} alt=""/>
						
                        <div class="profile_action absolute bottom-0 right-0 space-x-1.5 p-3 text-sm z-50  lg:flex">
							{ admin==1 ? (
							<div>
                         <a  href="javascript:void(0);" class="flex items-center justify-center h-8 px-3 rounded-md bg-gray-700 bg-opacity-70 text-white space-x-1.5"  > 
                              <ion-icon name="create-outline" class="text-xl md hydrated" role="img" aria-label="create outline"></ion-icon>
                              <span  onClick={editshowbutton}  id="editcover"  > Edit </span>
                          </a>
						  </div>
						  ):(<div></div>)
						}
						  <div id="editconfirmed"  hidden>
						  <form  style={{display:"flex"}}>
						  <a href="javascript:void(0);"  id="cancel"class="flex items-center justify-center h-9 px-5 rounded-md bg-red-600 text-white  space-x-1.5">
						  <ion-icon name="reload-outline"></ion-icon>
								<span  >    <button type="reset"  onClick={cancelhide}> Cancel </button>  </span>
							</a>
						  <a href="javascript:void(0);" id="save" class="flex items-center justify-center h-9 px-5 rounded-md bg-blue-600 text-white  space-x-1.5">
						  <ion-icon name="checkmark-outline"></ion-icon>
								<span > 
          
		  <input  type="file" id="imguploadoo"  value={image} accept="image/*" onChange={handleFileChange}  hidden/>
		  <button type="submit" onClick={handleSubmit}> Save </button> 	 </span>
							</a>
							</form>
							</div>
							
                      </div>
                    </div>
					
					<div class="profiles_content">
						
						<div class="profile_info">
							<h1> {group?.Name}</h1>
							
							<p>
								
							{(group?.Type=="Public"?(<ion-icon name="globe-outline"></ion-icon>):(<ion-icon name="lock-closed-outline"></ion-icon>) )}
							{group?.Type} Group ·  {members?.length} members
							</p>
						</div>
						<div class="flex items-center space-x-4">
							
							
      {
			 ( joinorleave==2?(<a href="javascript:void(0);" class="flex items-center justify-center h-9 px-5 rounded-md bg-red-600 text-white  space-x-1.5">
		<ion-icon name="arrow-undo-outline"></ion-icon>
			<span>  <button type="submit" onClick={leavegroup} > Leave Group </button>  </span>
		</a>):(<a  href="javascript:void(0);"class="flex items-center justify-center h-9 px-5 rounded-md bg-blue-600 text-white  space-x-1.5">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5">
				<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path>
			</svg>
			<span> <button type="submit" onClick={joingroup} > Join </button> </span>
		</a>) )
			
		}
    
						
						</div>
					</div>
					<nav class="cd-secondary-nav border-t -mb-0.5 lg:pl-2">
						<ul>
							<li class="active"><Link to={`/group/${group?._id}`} > Home </Link></li>
							<li><Link to={`/members/${group?._id}`} > Members </Link></li>
							<li><Link to={`/about/${group?._id}`} > About </Link></li>

						</ul>
					</nav>
				</div>
			   
		
				<div class="lg:flex lg:mt-8 mt-4 lg:space-x-8">
				<div class="space-y-5 flex-shrink-0 lg:w-7/12">
                  <AddPost groupid={group?._id}></AddPost>
                  {posts.map((post) => {
                    return <PostItem post={post} key={post._id}></PostItem>;
                  })}
                </div>
					<div class="lg:w-4/12 flex-shirink-0">
						<div class="mb-4">
							<h1 class="block text-xl font-bold"> About  </h1>
							<div class="space-y-4 mt-3">
								<div class="flex items-center space-x-3">
									<ion-icon name="people" class="bg-gray-100 p-2 rounded-full text-2xl md hydrated" role="img" aria-label="people"></ion-icon>
									<div class="flex-1">
										<div class="font-semibold">
										{members?.length} Members 
										</div>
									</div>
								</div>
								{(group?.Type=="Private"?(<div class="flex items-start space-x-3">
                                    <ion-icon name="lock-closed-outline" class="bg-gray-100 p-2 rounded-full text-2xl md hydrated" role="img" aria-label="people"></ion-icon>
                                    <div class="flex-1">
                                        <div class="font-bold"> Private </div>
                                        <div> Only Members can see who's in the group and what they post. </div>
                                    </div>
                                </div>):(<div class="flex items-start space-x-3">
                                    <ion-icon name="globe-outline" class="bg-gray-100 p-2 rounded-full text-2xl md hydrated" role="img" aria-label="people"></ion-icon>
                                    <div class="flex-1">
                                        <div class="font-bold"> Public </div>
                                        <div> Anyone can see who's in the group and what they post. </div>
                                    </div>
                                </div>) )}
								<div class="flex items-center space-x-3">
									<ion-icon name="unlink" class="bg-gray-100 p-1.5 rounded-full text-xl md hydrated" role="img" aria-label="unlink"></ion-icon>
									<div class="flex-1">
										<div>
											<a href="#" class="text-blue-500"> https://mydomain.com </a>
										</div>
									</div>
								</div>
								<div class="flex items-center space-x-3">
									<ion-icon name="mail-open" class="bg-gray-100 p-1.5 rounded-full text-xl md hydrated" role="img" aria-label="mail open"></ion-icon>
									<div class="flex-1">
										<div>
											<a href="#" class="text-blue-500">myname@mywebssite.com</a>
										</div>
									</div>
								</div>
								<div class="flex items-center space-x-3">
									<ion-icon name="albums" class="bg-gray-100 p-1.5 rounded-full text-xl md hydrated" role="img" aria-label="albums"></ion-icon>
									<div class="flex-1">
										<div>
											<a href="#" class="text-blue-500">Product/service</a>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="widget border-t pt-4">
							<div class="flex items-center justify-between mb-2">
								<div>
									<h4 class="text-xl -mb-0.5 font-semibold"> Related  groups </h4>
								</div>
								<a href="#" class="text-blue-600 ">See all</a>
							</div>
							<div>
								<div class="flex items-center space-x-4 hover:bg-gray-100 rounded-md -mx-2 p-2">
									<div class="w-14 h-14 flex-shrink-0 rounded-md relative">
										<img src="assets/user/images/group/group-3.jpg" class="absolute w-full h-full inset-0 rounded-md" alt=""/>
									</div>
									<div class="flex-1">
										<h3 class="text-lg font-semibold capitalize"> Graphic Design </h3>
										<div class="text-sm text-gray-500 -mt-0.5">
											 345K Member
										</div>
									</div>
									<a href="#" class="flex items-center justify-center h-9 px-4 rounded-md bg-gray-200 font-semibold">  Join </a>
								</div>
								<div class="flex items-center space-x-4 hover:bg-gray-100 rounded-md -mx-2 p-2">
									<div class="w-14 h-14 flex-shrink-0 rounded-md relative">
										<img src="assets/user/images/group/group-4.jpg" class="absolute w-full h-full inset-0 rounded-md" alt=""/>
									</div>
									<div class="flex-1">
										<h3 class="text-lg font-semibold capitalize"> Mountain Riders</h3>
										<div class="text-sm text-gray-500 -mt-0.5">
											 845K Member
										</div>
									</div>
									<a href="#" class="flex items-center justify-center h-9 px-4 rounded-md bg-gray-200 font-semibold">  Join </a>
								</div>
								<div class="flex items-center space-x-4 hover:bg-gray-100 rounded-md -mx-2 p-2">
									<div class="w-14 h-14 flex-shrink-0 rounded-md relative">
										<img src="assets/user/images/group/group-2.jpg" class="absolute w-full h-full inset-0 rounded-md" alt=""/>
									</div>
									<div class="flex-1">
										<h3 class="text-lg font-semibold capitalize"> Coffee Addicts </h3>
										<div class="text-sm text-gray-500 -mt-0.5">
											 345K Member
										</div>
									</div>
									<a href="#" class="flex items-center justify-center h-9 px-4 rounded-md bg-gray-200 font-semibold">  Join </a>
								</div>
								<div class="flex items-center space-x-4 hover:bg-gray-100 rounded-md -mx-2 p-2">
									<div class="w-14 h-14 flex-shrink-0 rounded-md relative">
										<img src="assets/user/images/group/group-1.jpg" class="absolute w-full h-full inset-0 rounded-md" alt=""/>
									</div>
									<div class="flex-1">
										<h3 class="text-lg font-semibold capitalize"> Architecture </h3>
										<div class="text-sm text-gray-500 -mt-0.5">
											 845K Member
										</div>
									</div>
									<a href="#" class="flex items-center justify-center h-9 px-4 rounded-md bg-gray-200 font-semibold">  Join </a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div> 
	<div uk-toggle="target: #offcanvas-chat" class="start-chat">
		<svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
		</svg>
	</div>
	<div id="offcanvas-chat" uk-offcanvas="flip: true; overlay: true" class="uk-offcanvas">
		<div class="uk-offcanvas-bar bg-white p-0 w-full lg:w-80">
			<div class="relative pt-5 px-4">
				<h3 class="text-2xl font-bold mb-2"> Chats </h3>
				<div class="absolute right-3 top-4 flex items-center">
					<button class="uk-offcanvas-close px-2 -mt-1 relative rounded-full inset-0 lg:hidden blcok uk-icon uk-close" type="button" uk-close="">
						<svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" data-svg="close-icon">
							<line fill="none" stroke="#000" stroke-width="1.1" x1="1" y1="1" x2="13" y2="13"></line>
							<line fill="none" stroke="#000" stroke-width="1.1" x1="13" y1="1" x2="1" y2="13"></line>
						</svg>
					</button>
					<a href="#" uk-toggle="target: #search;animation: uk-animation-slide-top-small"><ion-icon name="search" class="text-2xl hover:bg-gray-100 p-1 rounded-full md hydrated" role="img" aria-label="search"></ion-icon></a>
					<a href="#"><ion-icon name="cog" class="text-2xl hover:bg-gray-100 p-1 rounded-full md hydrated" role="img" aria-label="cog"></ion-icon></a>
					<a href="#"><ion-icon name="ellipsis-vertical" class="text-2xl hover:bg-gray-100 p-1 rounded-full md hydrated" role="img" aria-label="ellipsis vertical"></ion-icon></a>
				</div>
			</div>
			<div class="absolute bg-white z-10 w-full -mt-5 lg:mt-0 transform translate-y-1.5 py-2 border-b items-center flex" id="search" hidden="">
				<input type="text" placeholder="Search.." class="flex-1"/>
				<ion-icon name="close-outline" class="text-2xl hover:bg-gray-100 p-1 rounded-full mr-4 cursor-pointer md hydrated" uk-toggle="target: #search;animation: uk-animation-slide-top-small" role="img" aria-label="close outline"></ion-icon>
			</div>
			<nav class="cd-secondary-nav border-b extanded mb-2">
				<ul uk-switcher="connect: #chats-tab; animation: uk-animation-fade">
					<li class="uk-active"><a class="active" href="#0" aria-expanded="true"> Friends </a></li>
					<li>
						<a href="#0" aria-expanded="false">Groups <span> 10 </span></a>
					</li>
				</ul>
			</nav>
			<div class="contact-list px-2 uk-switcher" id="chats-tab" style={{touchAction: "pan-y pinch-zoom"}}>
				<div class="uk-active">
					<a href="timeline.html">
						<div class="contact-avatar">
							<img src="assets/user/images/avatars/avatar-1.jpg" alt=""/>
							<span class="user_status status_online"></span>
						</div>
						<div class="contact-username">
							 Dennis Han
						</div>
					</a>
					<a href="timeline.html">
						<div class="contact-avatar">
							<img src="assets/user/images/avatars/avatar-2.jpg" alt=""/>
							<span class="user_status"></span>
						</div>
						<div class="contact-username">
							 Erica Jones
						</div>
					</a>
					<a href="timeline.html">
						<div class="contact-avatar">
							<img src="assets/user/images/avatars/avatar-3.jpg" alt=""/>
						</div>
						<div class="contact-username">
							Stella Johnson
						</div>
					</a>
					<a href="timeline.html">
						<div class="contact-avatar">
							<img src="assets/user/images/avatars/avatar-4.jpg" alt=""/>
						</div>
						<div class="contact-username">
							 Alex Dolgove
						</div>
					</a>
				</div>
				<div>
					<a href="timeline.html">
						<div class="contact-avatar">
							<img src="assets/user/images/avatars/avatar-1.jpg" alt=""/>
							<span class="user_status status_online"></span>
						</div>
						<div class="contact-username">
							 Dennis Han
						</div>
					</a>
					<a href="timeline.html">
						<div class="contact-avatar">
							<img src="assets/user/images/avatars/avatar-2.jpg" alt=""/>
							<span class="user_status"></span>
						</div>
						<div class="contact-username">
							 Erica Jones
						</div>
					</a>
					<a href="timeline.html">
						<div class="contact-avatar">
							<img src="assets/user/images/avatars/avatar-3.jpg" alt=""/>
						</div>
						<div class="contact-username">
							Stella Johnson
						</div>
					</a>
					<a href="timeline.html">
						<div class="contact-avatar">
							<img src="assets/user/images/avatars/avatar-4.jpg" alt=""/>
						</div>
						<div class="contact-username">
							 Alex Dolgove
						</div>
					</a>
				</div>
			</div>
		</div>
	</div>
	<div id="create-post-modal" class="create-post uk-modal" uk-modal="">
		<div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical rounded-lg p-0 lg:w-5/12 relative shadow-2xl uk-animation-slide-bottom-small">
			<div class="text-center py-4 border-b">
				<h3 class="text-lg font-semibold"> Create Post </h3>
				<button class="uk-modal-close-default bg-gray-100 rounded-full p-2.5 m-1 right-2 uk-icon uk-close" type="button" uk-close="" uk-tooltip="title: Close ; pos: bottom ;offset:7" title="" aria-expanded="false">
					<svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" data-svg="close-icon">
						<line fill="none" stroke="#000" stroke-width="1.1" x1="1" y1="1" x2="13" y2="13"></line>
						<line fill="none" stroke="#000" stroke-width="1.1" x1="13" y1="1" x2="1" y2="13"></line>
					</svg>
				</button>
			</div>
			<div class="flex flex-1 items-start space-x-4 p-5">
				<img src="assets/user/images/avatars/avatar-2.jpg" class="bg-gray-200 border border-white rounded-full w-11 h-11"/>
				<div class="flex-1 pt-2">
					<textarea class="uk-textare text-black shadow-none focus:shadow-none text-xl font-medium resize-none" rows="5" placeholder="What's Your Mind ? Stella!"></textarea>
				</div>
			</div>
			<div class="bsolute bottom-0 p-4 space-x-4 w-full">
				<div class="flex bg-gray-50 border border-purple-100 rounded-2xl p-3 shadow-sm items-center">
					<div class="lg:block hidden">
						 Add to your post 
					</div>
					<div class="flex flex-1 items-center lg:justify-end justify-center space-x-2">
						<svg class="bg-blue-100 h-9 p-1.5 rounded-full text-blue-600 w-9 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
						</svg>
						<svg class="text-red-600 h-9 p-1.5 rounded-full bg-red-100 w-9 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"></path>
						</svg>
						<svg class="text-green-600 h-9 p-1.5 rounded-full bg-green-100 w-9 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
						</svg>
						<svg class="text-pink-600 h-9 p-1.5 rounded-full bg-pink-100 w-9 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
						</svg>
						<svg class="text-pink-600 h-9 p-1.5 rounded-full bg-pink-100 w-9 cursor-pointer" id="veiw-more" hidden="" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
						</svg>
						<svg class="text-pink-600 h-9 p-1.5 rounded-full bg-pink-100 w-9 cursor-pointer" id="veiw-more" hidden="" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
						</svg>
						<svg class="text-purple-600 h-9 p-1.5 rounded-full bg-purple-100 w-9 cursor-pointer" id="veiw-more" hidden="" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
						</svg>
						<svg class="hover:bg-gray-200 h-9 p-1.5 rounded-full w-9 cursor-pointer" id="veiw-more" uk-toggle="target: #veiw-more; animation: uk-animation-fade" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
						</svg>
					</div>
				</div>
			</div>
			<div class="flex items-center w-full justify-between p-3 border-t">
				<div class="btn-group bootstrap-select mt-2 col-4 story">
					<button type="button" class="btn dropdown-toggle btn-default" data-toggle="dropdown" role="button" title="Only me">
						<span class="filter-option pull-left">Only me</span>
						&nbsp;
						<span class="bs-caret"><span class="caret"></span></span>
					</button>
					<div class="dropdown-menu open" role="combobox">
						<ul class="dropdown-menu inner" role="listbox" aria-expanded="false">
							<li data-original-index="0" class="selected">
								<a tabindex="0" class="" data-tokens="null" role="option" aria-disabled="false" aria-selected="true">
									<span class="text">Only me</span>
									<span class="glyphicon glyphicon-ok check-mark"></span>
								</a>
							</li>
							<li data-original-index="1">
								<a tabindex="0" class="" data-tokens="null" role="option" aria-disabled="false" aria-selected="false">
									<span class="text">Every one</span>
									<span class="glyphicon glyphicon-ok check-mark"></span>
								</a>
							</li>
							<li data-original-index="2">
								<a tabindex="0" class="" data-tokens="null" role="option" aria-disabled="false" aria-selected="false">
									<span class="text">People I Follow </span>
									<span class="glyphicon glyphicon-ok check-mark"></span>
								</a>
							</li>
						</ul>
					</div>
					<select class="selectpicker mt-2 col-4 story" tabindex="-98">
						<option>Only me</option>
						<option>Every one</option>
						<option>People I Follow </option>
						People Follow Me
					</select>
				</div>
				<div class="flex space-x-2">
					<a href="#" class="bg-red-100 flex font-medium h-9 items-center justify-center px-5 rounded-md text-red-600 text-sm">
						<svg class="h-5 pr-1 rounded-full text-red-500 w-6 fill-current" id="veiw-more" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="false" >
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
						</svg>
						Live 
					</a>
					<a href="#" class="bg-blue-600 flex h-9 items-center justify-center rounded-md text-white px-5 font-medium">Share </a>
				</div>
				<a href="#" hidden="" class="bg-blue-600 flex h-9 items-center justify-center rounded-lg text-white px-12 font-semibold">Share </a>
			</div>
		</div>
	</div>
	<div id="backtotop" class="">
		<a href="#"></a>
	</div>
</body>

       


            


     
   )
    
}



}

