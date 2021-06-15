import React from "react";
import html2canvas from "html2canvas";
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';
import jsPDF from "jspdf";
import Header from'../Header';
export default function Jdf() {
  const element = document.getElementById("s");
  
  let docToPrint = React.createRef();

  const printDocument = () => {
  
    //const string = renderToString(<Prints />);
    html2canvas(docToPrint.current).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [500, 300]
      });
     
  
      pdf.addImage(imgData, "JPEG", 0, 0);
      // pdf.output("dataurlnewwindow");
      pdf.save("605f48d55c54405200b48aed.pdf");
     
    });
  };

  return (
    <div >
     <Header />
      <div >
        <button onClick={printDocument}>Pdf</button>
      </div>

      <Prints ref={docToPrint} />
      <div >
        <button onClick={printDocument}>Pdf</button>
      </div>
    </div>

  );
};







const Prints =React.forwardRef ((props, ref) =>{ 
  return(
    <div
    id="s"
       ref={ref}
           style={{
             borderRadius: "5px",
             width: "1000px",
            
             margin: "0 auto",
             padding: "10mm",
             backgroundColor:"black",
          
             
  
            
           }}
           
         >
          <img  src="assets/user/course/images/imgcert.png" style={{width:"200px",position:"absolute",marginTop:"-38px",marginLeft:"-38px"}}/>
          <p class="flex justify-center items-center absolute  Top-0" style={{marginLeft:"600px"}}>605f48d55c54405200b48aed</p>
          <div style={{marginTop:"90px"}}>
          <h1 style={{color:"#09B8C0"}}>Certificate of Achievement</h1>
          <hr style={{width:"390px",marginLeft:"280px",height:"1px",color: "#333",borderTop:"6px solid #8c8b8b"}}/>
          <p style={{marginLeft:"-220px"}}>This is presented to</p>
          <h1 style={{marginLeft:"-30px",color:"orange",fontSize:"50px"}}>Hassen Siwar</h1>
          <p style={{fontSize:"10px",marginLeft:"-230px"}}>has successfully completed</p>
          <p style={{position:"center"}}>Version control of git </p>
          </div>
          <br/>
          <hr style={{width:"150px",marginLeft:"30px",height:"1px",color: "orange",borderTop:"6px solid orange"}} /><br/>
          <img   src="assets/user/course/images/signature.png" style={{width:"200px",position:"absolute",marginTop:"-38px",marginLeft:"12px"}}/>
          <hr style={{width:"150px",marginLeft:"30px",height:"1px",color: "orange",borderTop:"6px solid orange"}} />
          <p style={{marginTop:"-70px",fontSize:"10px",marginRight:"-370px"}}> 3aweni has confirmed the identity of this individual and their<br/> participation of this course</p>
         </div>
  )}
)


