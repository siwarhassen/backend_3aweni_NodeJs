import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import { queryApi } from "../../../utils/queryApi";
import { useApi } from "../../../hooks/useApi";
import { Bar, Line ,Doughnut} from 'react-chartjs-2';
import Header from'../Header';
export default function CourseChart() {
  const [chartData,setChartData]=useState({});

 const chart= ()=>{
  let numberinroled=[];
  let namecoursesenrolled=[];

   axios.get(`${process.env.REACT_APP_API_URL}/usercourse/mostenrolled`).then(res=>
    {
     
      for (const dataobj of res.data)
      {
        numberinroled.push(parseInt(dataobj.sum));
       
          namecoursesenrolled.push(dataobj._id.Name);
    
     
        console.log(numberinroled);

      }
      setChartData({
        labels:namecoursesenrolled,
        datasets:[{
          label:"number of users registered in course",
          data:numberinroled,
          backgroundColor:"#0cb9c1"
         
        }
        ]
      });
    }
    );};
  useEffect(()=>{
chart();
  },[])
  //const mostenrolled =useApi("usercourse/mostenrolled",null,"GET")[0];
  

const data={
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
    datasets:[{label:"sales",data:[3,2,5,7,4]}]
}
  return (
    <div >
 <Header />
        <br/><br/><br/><br/><br/><br/>
        <div  style={{marginLeft:"400px",width:"720px"}} >
<Bar   data={chartData}  options={{title:{display:true,text:"Most enrolled courses",fontSize:25}}}  /></div>
    </div>
  );
};