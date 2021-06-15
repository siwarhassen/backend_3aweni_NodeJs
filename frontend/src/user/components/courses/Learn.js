import React ,{Component} from 'react';
import { queryApi } from "../../../utils/queryApi";
import { useApi } from "../../../hooks/useApi";
import { Link } from "react-router-dom";
import Header from'../Header';
export default function Learn({match}) {
    const id = match.params.id;
    const [courses, err, reload] = useApi("course");
    const course =useApi("course/detail/"+id,null,"GET")[0];
    const usercours =useApi("usercourse/learncourse/"+id,null,"GET")[0];
    const siwar="e";
    const addtogoogleDrive=(f)=>async()=>{
        var file={
          File:f
        }
        const [inscriptio, err] = await  queryApi("course/googledrive",file, "POST",false);
    
                    
        if (err) {
          console.log(err);
     
      } else console.log(inscriptio);
    }
        return (
          



<div> <Header /> 

<div  style={{width:"1050px",marginLeft:"339px",marginTop:"-10px"}}>

 <br/><br/><br/><br/>

            <div class="course-layouts" >

        
             
                <div class="course-content "  >

<div class="course-header" style={{backgroundColor:"#0cb9c1"}} >
    
  
    <h4 class="text-white"> {usercours?.CourseId.Name} </h4>
  

    <div>
      
  

       
        <a href="#" class="btn-back" uk-toggle="target: .course-layouts; cls: course-sidebar-collapse">
        <i class="icon-feather-chevron-left"></i>
    </a>
     
    </div>

</div>

<div class="course-content-inner">

{usercours?.CourseId.Module?.map((mod, index) => ( 
    <ul id={mod?.Name} class="uk-switcher" style={{touchAction:"pan-y pinch-zoom"}}>
     {mod?.Section.map((sec, ind) => ( 
<li class=""  >
      <div>
    
     {sec?.Type=="pdf"?(
      <div class="video-responsive" >
          <h1  class="uk-heading-line uk-text-center" style={{marginTop:"-220px"}}>{sec?.Name}</h1>
         <p  uk-responsive="" class="uk-responsive-width">{sec?.Description}</p>
          {/* <iframe src="https://www.youtube.com/embed/9gTw2EDkaDQ?enablejsapi=1" frameborder="0" uk-video="automute: true" allowfullscreen="" uk-responsive="" class="uk-responsive-width"></iframe>**/}
          <a href={ process.env.REACT_APP_API_URL_OUH + "/" + sec?.ContentInformation}  download target="_blank">
          <button >
      <i class="icon-feather-folder .icon-tiny"/>
      Download File
   </button>
   <br/>
 
             
 </a>
 <button onClick={addtogoogleDrive(sec?.ContentInformation)}>add this file to google drive</button> 
     
      </div>
   
    ):(


        <div>
        <h1  class="uk-heading-line uk-text-center" >{sec?.Name}</h1>
    <iframe src={process.env.REACT_APP_API_URL_OUH + "/" + sec?.ContentInformation} frameborder="0" uk-video="automute: true" allowfullscreen="" uk-responsive="" class="uk-responsive-width" style={{width:"1000px",height:"500px"}}></iframe>
    </div>
    )}
     
     </div>
  </li>
     ))}

{/**Quiz */}
  <li class="" >
      
      {/**  <!-- to autoplay video uk-video="automute: true" -->*/}
     
      <div class="video-responsive"  >
          <div style={{marginBottom:"220px",marginRight:"320px"}}>
         <p uk-responsive="" class="uk-responsive-width"  style={{fontSize:"9px"}}>QUIZ FOR PRACTICE</p>
         <h3 >{mod?.Quiz.Name}</h3>
         <br/><br/><br/><br/><br/>
         {/**Submit assignment */}
         <div class="rc-CoverPageRow" >
             <div class="rc-CoverPageRow__left-side-view">
            
                 <label style={{display:"inline-block", verticalAlign: "middle",marginLeft:"50px"}}>Submit your assignment</label>
                <Link to={`/quiz/${usercours?._id}/${index}`}  class="flex items-center justify-center h-9 px-5 rounded-md bg-blue-600 text-white  space-x-1.5" style={{width:"50px",height:"20px" ,display:"inline-block",marginLeft:"100px"}} >
                           
                <span>Show</span>
                           
                         

                </Link>
                <hr style={{width:"100%",textAlign:"left",marginLeft:"0"}}/>
            </div>
         </div>
      




       {/**Recieve a Mark */}
       <div class="rc-CoverPageRow" >
          <div class="rc-CoverPageRow__left-side-view">
            
             {usercours?.PassQuiz.map((passqui, indq) => 
             (  
                 <div >
                        {passqui.Index==index?
                        (   <div> <label style={{display:"inline-block", verticalAlign: "middle",marginLeft:"50px"}}>Your mark is</label> <p  style={{display:"inline-block", verticalAlign: "middle",marginLeft:"150px"}}>{passqui.Note}/{mod?.Quiz.Questions.length} </p>   <hr style={{width:"100%",textAlign:"left",marginLeft:"0"}}/> </div>
                        )
                        :
                        ( <div> </div>
                        )}
                 </div>
             ))
            }
         
           
         </div>
      </div>

      {/* <iframe src="https://www.youtube.com/embed/9gTw2EDkaDQ?enablejsapi=1" frameborder="0" uk-video="automute: true" allowfullscreen="" uk-responsive="" class="uk-responsive-width"></iframe>**/}
      </div>
    

      </div>
  

  </li>





  <li class="" >
      
      {/**  <!-- to autoplay video uk-video="automute: true" -->*/}
     
      <div class="video-responsive" >
         <p uk-responsive="" class="uk-responsive-width"   ></p>
          {/* <iframe src="https://www.youtube.com/embed/9gTw2EDkaDQ?enablejsapi=1" frameborder="0" uk-video="automute: true" allowfullscreen="" uk-responsive="" class="uk-responsive-width"></iframe>**/}
      </div>

  </li>

</ul>
                     
                         ))}     






</div>

</div>
{/**  <!-- course sidebar --> */}


            
<div class="course-sidebar" 
>
                    <div class="course-sidebar-title">
                        <h3> Table of Contents </h3>
                    </div>
                    <div class="course-sidebar-container" data-simplebar="init"><div class="simplebar-wrapper" ><div class="simplebar-height-auto-observer-wrapper"><div class="simplebar-height-auto-observer"></div></div><div class="simplebar-mask"><div class="simplebar-offset" style={{left: "-17px",bottom: "-17px"}}><div class="simplebar-content" style={{padding: "0px", height: "100%", overflow: "scroll"}}>
                 

                    <ul class="course-video-list-section uk-accordion" uk-accordion="">

                 
{/**display Module */}


{usercours?.CourseId.Module?.map((mod, index) => ( 
                        <li class="">
                                <a class="uk-accordion-title" href="#"> {mod?.Name} </a>
                                <div class="uk-accordion-content" aria-hidden="true" hidden="">
                                     {/**  <!-- course-video-list -->*/}
                                    
                                    <ul class="course-video-list highlight-watched"  uk-switcher=   {"connect:#" + `${mod?.Name}`+" ; animation: uk-animation-slide-right-small, uk-animation-slide-left-medium"}>
                                    {mod?.Section.map((sec, ind) => ( 
                                        <li class="watched"  id="h"> <a href="#" aria-expanded="false"> { `${sec?.Type} `   + ":" + `${sec?.Name} `} <span>{sec?.Duration} min </span> </a>
                                        </li>
                                    ))}
                                    
                                        <li class="watched"  id="h"> <a href="#" aria-expanded="false"> { "Quiz"   +  + `${index +1} `} <span> {mod?.Quiz.Duration} min </span> </a>
                                        </li>
                                   
                             <li id="h"> <a href="#" aria-expanded="false"> Close<span>  </span> </a>
                                        </li>
                                    </ul>


                                </div>
                         </li>
))}          
                   
                         
                  



                        </ul>






                    </div></div></div>
                  </div></div>

                </div>
             
             
            </div>



        </div>


</div>


     
   )
    





}