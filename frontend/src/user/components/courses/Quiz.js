import React, { useState, useEffect, useCallback ,useRef} from "react";


import { Formik, Field, Form, FieldArray,ErrorMessage } from "formik";
import { queryApi } from "../../../utils/queryApi";
import { useApi } from "../../../hooks/useApi";
import * as Yup from "yup";
import Select from 'react-select';
import { array } from "yup/lib/locale";
import { useHistory } from "react-router-dom";
import Header from'../Header';
 
export default function Quiz({match}) {
 let interval=useRef;
  const id = match.params.id;
  const index = match.params.index;
    const history = useHistory();
    const usercours =useApi("usercourse/learncourse/"+id,null,"GET")[0];
    const cours =usercours?.CourseId;
  const getquiz=cours?.Module[index].Quiz;
  
    


 const [show, setShow] = useState(false);
 const [showExplantation, setShowExplantation] = useState(false);
 const [selectedAnswers, setSelectedAnswers] = useState({});
 const [score, setScore] = useState(0);
const [mi,setMi]=useState(9);
 const [over, setOver] = React.useState(false);
console.log(cours?._id);
 console.log(parseInt(cours?.Module[index].Quiz.Duration));
 /*const [findusercourse]=useApi("usercourse/verif/"+id+"/"+index,null,"GET");
 console.log(findusercourse)*/
 useEffect(() =>{
  setMi( parseInt(cours?.Module[index].Quiz.Duration));
  },[]);
  const [time, setTime] = useState({
    minutes:parseInt(4),
   
   seconds: parseInt(0)
 });
useEffect(async() => {
    const [findusercourse]=await queryApi("usercourse/verif/"+id+"/"+index,null,"GET");
    console.log(findusercourse?.PassQuiz);
    if(findusercourse!=null)
    {
        setScore(findusercourse?.PassQuiz[0]?.Percentage);
        console.log(findusercourse?.PassQuiz);

       // setSelectedAnswers(findusercourse?.PassQuiz[0]?.UserAnswer);
        setShow(() => ( true));
        //console.log(selectedAnswers);
    }
  
  
 
   
  }, [ score,show,selectedAnswers]);
 

  const startTimer=()=>{
    if(show)
    {  setTime({
       
      minutes: 0,
      seconds: 0
    });
   return
      
    }
    if ( over) {
      
      //setShow(() => ( true));
     submitQuiz();
      return
    }

    // Time up
    if ( time.minutes === 0 && time.seconds === 0) {
      setOver(true);
    }
    else if (time.seconds === 0) {
      // decrement minute
      setTime({
       
        minutes: time.minutes - 1,
        seconds: 59
      });
    } 
    else {
      // decrement seconds
      setTime({
  
        minutes: time.minutes,
        seconds: time.seconds - 1
      });
    }
  }

  useEffect(()=>{
    let timerID = setInterval(() => startTimer(), 1000);
    return () => clearInterval(timerID);

  });
  const handleAnswerSelected = useCallback(
    (ev) => {
      console.log(ev);
      const { name, value } = ev.target;
      setSelectedAnswers((oldData) => ({ ...oldData, [name]: Number(value)}));
    },
    [setSelectedAnswers]
  );


  const submitQuiz = useCallback(
     
    async (ev) => {
        
       let totalpercentage=0;
     
        let i=0;
        const verif=false;
        let state="failed";
        const allCorrect = getquiz?.Questions.every((question,index) => question.Answer=== selectedAnswers[index]);
        getquiz?.Questions.map((question,index) => 
         {
              if( question.Answer=== selectedAnswers[index] )
                  {
                      i++;
                    
                    }
     
         }
        );
        let x=(i/getquiz?.Questions.length)*100;
        setScore(() => (x));
        console.log(score);
        setShowExplantation(() => ( true));
        
        setShow(() => ( true));
 console.log(x,i,getquiz?.Questions.length);
        if(x>=80)
        {
          state="success";
        }
    
    
      var usercourse={
        PassQuiz: {
            Note:i,        
            Index:index,
            State:state,
            Percentage:x,
            UserAnswer:selectedAnswers

        }
      }
    const [passq, err] = await  queryApi("usercourse/passquiz/"+id,usercourse, "PUT",false);
    /**verif if user will recieve a certif */
    const [passusercourse]=await queryApi("usercourse/userwillrecievecertif/"+id ,null,"GET");
    if(passusercourse?.PassQuiz?.length===cours?.Module?.length)
    {       console.log("ouuuuuuh");
      
      const [modifusercoursedisplay]=await queryApi("usercourse/updateshow/"+id ,null,"PUT");
  
      for(   const u of  usercours?.PassQuiz)
      {  totalpercentage+=u.Percentage;

      }
      let resultcertif=(totalpercentage/usercours?.PassQuiz?.length);
      console.log(resultcertif);
      if(resultcertif>=80)
      { var certif={
        usercourse:usercours,
        Score:resultcertif
                   }
       const ceertif= await queryApi("certif/recieve", certif, "POST", false);
        console.log("waaaaw");
      }
     
    }
    
 
    
      console.log(x);
      //alert(i==quiz.length ? 'You win!' : 'Something is incorrect')
    },
    [ selectedAnswers,show,score]
  );


 
  return (
    <div >
    <Header />
      <div >
 
      <br/><br/><br/><br/>
      <p class="flex justify-center items-center absolute right-0 Top-0"> <i class="fa fa-clock-o" aria-hidden="true"></i>{time.minutes}:{time.seconds}</p>
      <button type="button" class="btn btn-secondary btn-icon-only" style={{marginRight:"590px"}}  onClick={() => {
                    history.goBack();
                }}>
                                                                                <span class="btn-inner--icon" style={{marginLeft:"3px"}}>
                                                                                  <i class="uil-arrow-left"></i>
                                                                                </span>
                                                                                <span style={{marginLeft:"60px",display:"block",marginTop:"-60px"}}> The Request / Response Cycle</span>
                                                                            <span style={{marginLeft:"60px",display:"block",marginTop:"-30px",fontSize:"10px"}}>Quiz to practice &nbsp;•&nbsp; 30min</span>
                                                                              </button>
                                                                            
                                                                              <hr style={{width:"100%",textAlign:"left",marginLeft:"0"}}/>
     
  {show ? (
       <div>
      {score >=80?(  <div style={{backgroundColor:"#f3faf7",height:"90px",marginTop:"-20px"}}>
         <br/>
       
        
         <div style={{display:"flex",flexDirection:"column"}}>
        
         <h3 style={{marginLeft:"350px"}}> <i class="fa fa-check" aria-hidden="true" style={{color:"green"}}></i> congratulations ! You win !
         <span style={{fontSize:"12px",marginLeft:"200px"}} >Your score:  {parseFloat(score).toFixed(2)} %</span>
         </h3>
        
        
         <span style={{fontSize:"11px"}}> <strong>TO SUCCEED</strong> 80 % or more</span>
  
        
         </div>
         
         <hr style={{height: "100% " }} /><br/>
         <br/>
         <br/>
     </div>
  ):(<div style={{backgroundColor:"#fff4f5",height:"90px",marginTop:"-20px"}}>
  <br/>

 
  <div style={{display:"flex",flexDirection:"column"}}>
 
  <h3 style={{marginLeft:"350px"}}> <i class="fa fa-times" aria-hidden="true" style={{color:"red"}}></i>  You have failed !
  <span style={{fontSize:"12px",marginLeft:"200px"}} >Your score:  {parseFloat(score).toFixed(2)} %</span>
  </h3>
 
 
  <span style={{fontSize:"11px"}}> <strong>TO SUCCEED</strong> 80 % or more</span>

 
  </div>
  
  <hr style={{height: "100% " }} /><br/>
  <br/>
  <br/>
</div>) }</div>
   
  ):(<p></p>)}<br/>
      <div style={{marginLeft: "120px"}}>
       <h1 > {getquiz?.Name}</h1>
    
    
       <p style={{fontSize:"11px"}}>TOTAL DES POINTS {getquiz?.Questions?.length}</p>
       <hr style={{width:"50%",marginLeft:"240px"}}/>
       </div>
        <ul >
          {getquiz?.Questions.map((question,index) => (
            <div key={index} >
                
              <h5  style={{marginLeft:"350px"}} >{index +1} .{question.QuestionText} <span>    </span> <span  class="bg-gray-100 py-1.5 px-4 rounded-full" style={{fontSize:"10px",marginLeft:"180px"}}>  1 point </span></h5>
      
              {question.AnswerOptions.map((answer, idx) => (
                <div key={idx} style={{marginLeft:"500px"}} class="form-row">
     
 
                    <input 
                      checked={answer.checked} 
                      onChange={handleAnswerSelected}
                      type="radio" disabled= {show === true?"disabled":false}
                      value={idx}
                      name={index}
                   id={idx}/>
             
                 <label for={idx}  style={{marginRight:"650px",fontSize:"12px"}} class="col-sm-2 col-form-label">{answer}</label>  
                
               
                </div>

              ))}
                {showExplantation ? 
                (<div>
                    {question.Answer=== selectedAnswers[index]?( <div> <br/><div  style={{marginLeft:"500px",fontSize:"12px",backgroundColor:"#f3faf7",width:"350px",height:"40px"}}><br/> <i class="fa fa-check" aria-hidden="true" style={{color:"green"}}></i> {question.Explantation} </div> <br/></div>)
                    :(<div> <br/> <div  style={{marginLeft:"500px",fontSize:"12px",backgroundColor:"#fff4f5",width:"350px",height:"40px"}}> <br/><i class="fa fa-times"  aria-hidden="true" style={{color:"red"}}></i>{question.Explantation} 
                    

                    </div> <br/></div>) } 
               </div>
                ):(<p></p>)}
            </div>
          ))}
        </ul>
      


        <hr style={{width:"47%",marginLeft:"350px"}}/>
        <button  onClick={submitQuiz} style={{width:"200px",marginLeft:"80px"}} type="button" class={ show === false ? "bg-blue-600 font-semibold p-2 rounded-md text-center text-white w-full" :"btn btn-secondary" }  disabled={show}>Submit</button>
        
      
                               
        
        <br/> <br/>
       
      </div>
    </div>
  );
   
}

      
      
    
