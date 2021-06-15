import React ,{Component,useEffect,PureComponent,useRef } from 'react';
import { queryApi } from "../../../utils/queryApi";
import { useApi } from "../../../hooks/useApi";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import ReactToPrint from 'react-to-print';
import html2canvas from "html2canvas";
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';
import jsPDF from "jspdf";
import Jdf from '../courses/pdf';
import QRCode from "react-qr-code";
import Header from'../Header';
import {
   
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
  
  } from "react-share";
import { FacebookIcon, TwitterIcon,LinkedinIcon } from "react-share";
export default function Certification({match}) {
  const id = match.params.id;
  const certification=     useApi("certif/detailcertif/"+id,null,"GET",false)[0];
  console.log(certification?.usercourse.CourseId);
    const ref=React.createRef();
    const componentRef = useRef();
    const history = useHistory();
    let docToPrint = React.createRef();

    const printDocument = () => {
    
      //const string = renderToString(<Prints />);
      html2canvas(docToPrint.current).then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
         
          unit: "px",
          format: [280, 245]
        });
      
        pdf.addImage(imgData, "JPEG", -6, -75);
       
        pdf.save(`${certification._id}.pdf`);
       
      });
    };
        return (
          

        <div>
        <Header />
            <br/><br/><br/>
<div class="page-content-inner">
<div >

 <button type="button" class="btn btn-secondary btn-icon-only" style={{marginRight:"590px"}}    onClick={() => {
                    history.goBack();
                }}>
                                                                           <span class="btn-inner--icon" style={{marginLeft:"3px"}}>
                                                                             <i class="uil-arrow-left"></i>
                                                                           </span>
                                                                           <span style={{marginLeft:"60px",display:"block",marginTop:"-60px"}}>{certification?.usercourse.CourseId.Name}</span>
                                                    
                                                                         </button>
                                                                         <h3>Online certificate of achievement</h3>
                                                                        
                                                                         <hr style={{width:"88%",marginLeft:"200px"}}/>
</div>




<div uk-grid="" class="uk-grid" style={{marginLeft:"170px",flexDirection:'row-reverse'}}>
    <div class="uk-width-2-5@m uk-first-column" style={{marginRight:"50px"}}>





    <div
    
    ref={docToPrint}
        style={{
     
       
     width:"450px",
          padding: "10mm",
          backgroundColor:"#fffff9",
  
          height:"570px"
         

         
        }}
        
      >
       <img  src="assets/user/course/images/imgcert.png" style={{width:"120px",position:"absolute",marginTop:"-38px",marginLeft:"-38px"}} alt="online certificate of achievement"/>
       <p class="flex justify-center items-center absolute  Top-0" style={{marginLeft:"170px"}}>{certification?._id}</p>
       <div style={{marginTop:"90px"}}>
       <h3 style={{color:"#09B8C0"}}>Certificate of Achievement</h3>
       <hr style={{width:"200px",marginLeft:"150px",height:"1px",color: "#333",borderTop:"6px solid #8c8b8b"}}/>
       <p style={{marginLeft:"-220px"}}>This is presented to</p>
       <h1 style={{marginLeft:"-30px",color:"orange",fontSize:"30px"}}>{certification?.usercourse.UserId.username} </h1>
       <p style={{fontSize:"10px",marginLeft:"-230px"}}>has successfully completed</p>
       <p style={{position:"center"}}>{certification?.usercourse.CourseId.Name}  </p>
       </div>
       
       <QRCode value={`http://localhost:3001/certification/`+certification?._id}  size ="80" />
       <hr style={{width:"150px",marginLeft:"220px",height:"1px",color: "orange",borderTop:"6px solid orange",marginTop:"-80px"}} /><br/>
       <img   src="assets/user/course/images/signature.png" style={{width:"150px",position:"absolute",marginTop:"-50px",marginLeft:"220px"}}/>
       <hr style={{width:"150px",marginLeft:"220px",height:"1px",color: "orange",borderTop:"6px solid orange",marginTop:"-6px"}} />
       
       
      </div>
















        <div > 

      
         
          <br/>
             
        </div>

  
    </div>
    <div class="uk-width-expand@m">

        <div class="uk-card-default rounded">
            <div class="uk-flex uk-flex-between uk-flex-middle py-3 px-4">

                <h5 class="mb-0"> Details </h5>
            </div>
            <hr class="m-0"/>
           
                <div class="uk-first-column">
                    <br/>
                    <h5 class="uk-text-bold"> Terminé par {certification?.usercourse.UserId.username}</h5>
                      <h6 class="uk-text-bold">20 juin 2020</h6>
                      <h6 class="uk-text-bold">Note Obtenue:{ parseFloat(certification?.Score).toFixed(2)}%</h6>
                      <p style={{fontSize:"12px"}}>Le compte de {certification?.usercourse.UserId.username} est vérifié. 3aweni certifie qu'il ou elle a terminé et réussi le cours {certification?.usercourse.CourseId.Name}</p>
                </div>
        
               

          
        </div>

        <div class="uk-card-default rounded mt-4">
            <div class="uk-flex uk-flex-between uk-flex-middle py-3 px-4">
                <h5 class="mb-0"> About course </h5>
            
            </div>
            <hr class="m-0"/>
            <div class="card">
                                            <div class="card-body">
                                                <div class="uk-flex-middle uk-grid" uk-grid="">
                                                    <div class="uk-width-auto uk-first-column">
                                                        <h5 class="mb-2"> Total Students </h5>
                                                        <h1> 2900</h1>
                                                        <span class="badge badge-soft-primary mt-n1"> +56.6%</span>
                                                    </div>
                                                    <div class="user-profile-photo  m-auto" style={{width:"220px"}}>
                <img  src={certification?.usercourse.CourseId.Photo} alt="online courses"/>
            </div>
                                                </div>
                                            </div>

                                            <div class="card-footer d-flex justify-content-between py-2">
                                                <p class="mb-0"> By:{certification?.usercourse.CourseId.UserId.username} </p>
                                                <Link to={`/detailcourse/${certification?.usercourse.CourseId._id}`} class=" "> Detail</Link>
                                            </div>
                                        </div>
      
        </div>
        <div style={{display:"flex",justifyContent:"space-evenly"}}>
              
              <FacebookShareButton
      url={"http://localhost:3001/certification/60926261a621ce3b547224f2"}
    >
      <FacebookIcon size={32} round />
    </FacebookShareButton>
                
          <LinkedinShareButton url="https://codesandbox.io/s/rrlli" > <LinkedinIcon size={32} round /> </LinkedinShareButton>
          <TwitterShareButton
      title={"test"}
      url={"http://localhost:3001/certification/60926261a621ce3b547224f2"}
      hashtags={["hashtag1", "hashtag2"]}
    >
      <TwitterIcon size={32} round />
 
    </TwitterShareButton>
    <button type="button" class="btn btn-default"  style={{backgroundColor:"#2563eb"}} onClick={printDocument}> <i class="fa fa-download" aria-hidden="true"></i> Télécharger</button>
             {/**<button  type="button" class="btn btn-default" style={{backgroundColor:"#2563eb"}} uk-toggle="target: #testModal">  <i class="fa fa-share-square-o" aria-hidden="true"></i> partager </button> */} 
            
             {/**share in social media */}
              <div id="testModal" data-uk-modal>
        <div className="uk-modal-dialog">
          <button
            className="uk-modal-close-default"
            type="button"
            data-uk-close
          />
          <div className="uk-modal-header">
         
            <h2 className="uk-modal-title">Share in social media</h2>
            
          </div>
          <div className="uk-modal-body">
     
          </div>
          <div className="uk-modal-footer uk-text-right">
            <button
              className="uk-button uk-button-default uk-modal-close"
              type="button"
            >
              Cancel
            </button>
           
          </div>
        </div>
      </div>
            {/**end social media */}
            <ReactToPrint
        trigger={() =>     <button type="button" class="btn btn-default"  style={{backgroundColor:"#2563eb"}}> <i class="fa fa-download" aria-hidden="true"></i> print</button>}
        content={() =>docToPrint.current}
      />
   
              </div>
    
    </div>
</div>



</div>
</div>

     
   )
    





}










  const Prints =React.forwardRef ((props, ref,certification) =>{ 
    return(
      <div
    
         ref={ref}
             style={{
          
            
          width:"450px",
               padding: "10mm",
               backgroundColor:"#fffff9",
       
               height:"550px"
              
    
              
             }}
             
           >
            <img  src="assets/user/course/images/imgcert.png" style={{width:"120px",position:"absolute",marginTop:"-38px",marginLeft:"-38px"}}/>
            <p class="flex justify-center items-center absolute  Top-0" style={{marginLeft:"170px"}}>605f48d55c54405200b48aed</p>
            <div style={{marginTop:"90px"}}>
            <h3 style={{color:"#09B8C0"}}>Certificate of Achievement</h3>
            <hr style={{width:"200px",marginLeft:"150px",height:"1px",color: "#333",borderTop:"6px solid #8c8b8b"}}/>
            <p style={{marginLeft:"-220px"}}>This is presented to</p>
            <h1 style={{marginLeft:"-30px",color:"orange",fontSize:"30px"}}>{certification?.usercourse.UserId.username} </h1>
            <p style={{fontSize:"10px",marginLeft:"-230px"}}>has successfully completed</p>
            <p style={{position:"center"}}>{certification?.usercourse.CourseId.Name}  </p>
            </div>
            <br/>
            <hr style={{width:"150px",marginLeft:"-15px",height:"1px",color: "orange",borderTop:"6px solid orange",marginTop:"-16px"}} /><br/>
            <img   src="assets/user/course/images/signature.png" style={{width:"150px",position:"absolute",marginTop:"-50px",marginLeft:"-6px"}}/>
            <hr style={{width:"150px",marginLeft:"-15px",height:"1px",color: "orange",borderTop:"6px solid orange",marginTop:"-6px"}} />
            <p style={{marginTop:"-70px",fontSize:"10px",marginRight:"-200px"}}> 3aweni has confirmed <br/> the identity of this individual </p>
           </div>
    
    
    
    )}
  )
  