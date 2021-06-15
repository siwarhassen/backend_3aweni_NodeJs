import React ,{useState , useEffect} from 'react';
import {Link} from 'react-router-dom';
import Header from '../../Header';
import axios from 'axios';
import { Formik } from "formik";
import * as Yup from "yup";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import { useDispatch ,useSelector} from 'react-redux';
import { fetchEducations } from '../../../../redux/slices/educationSlice';
const EditEducationScreen = ({history,match}) =>{
    //const [education, setEducation]= useState(Object);
    const id = match.params.id;
    const education = useSelector((state) =>
        state.educations.educations.find((item) => item._id === id)
        );
        const dispatch =useDispatch();
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

                axios.get(`/education/details/${id}`, config)
                  .then((response) => {
                   //setEducation(response.data);
                   console.log(education)
                  })
                  .catch((error) => {
                    console.log(error)
                  })

                  console.log(education.school)
               
            }
           
    ,[history]);
    

    
    return (
        <>
        <Header/>
        <body>
        <ReactNotification/>
        <div class="main_content">
            <div class="mcontainer">
            <h1 class="lg:text-2xl text-xl font-semibold mb-6" > Update Your Education </h1>



            <Formik
initialValues={{
    school: education?.school,
    fieldStudy:education?.fieldStudy,
    startYear:education?.startYear,
    endYear:education?.startYear,
    visible:education?.visible,
    description:education?.description}} 
validationSchema={Yup.object({
        school: Yup.string()
          .min(3, "Minimum 3 characters")
          .max(50, "Maximum 50 character")
          .required('Required field'),
        fieldStudy: Yup.string()
          .min(3, "Minimum 3 characters")
          .max(50, "Maximum 50 character")
          .required('Required field'),
        startYear: Yup.string()
        .matches(/^[0-9]+$/, "Invalid Year")
        .min(4, 'Invalid Year: must be exactly 4 digits')
        .max(4, 'Invalid Year: must be exactly 4 digits').required('Required field'),
        endYear: Yup.string()
        .matches(/^[0-9]+$/, "Invalid Year")
        .min(4, 'Invalid Year: must be exactly 4 digits')
        .max(4, 'Invalid Year: must be exactly 4 digits').required('Required field'),
        visible:Yup.string()
        .required('Required field'),
      })}
onSubmit={ async (values)=>{
            
    const valuesToSend = { ...values};
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("authToken")}`
      }

      const id = match.params.id;
      console.log(valuesToSend)

    axios.put(`/education/update/${id}`,valuesToSend, {
        headers: headers
      })
      .then((response) => {
       console.log(response.data.data);
       dispatch(fetchEducations());
       store.addNotification({
        title: "Wonderful!",
        message: "Your education details have been updated with succes! check your profile",
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
      setTimeout(function(){ history.push("/profile_education"); }, 1000);
    
     // history.goBack();
      })
      .catch((error) => {
        console.log(error)
      })
  }}
>
    {formik => (

<div>
    <form onSubmit={formik.handleSubmit} >
                                    
                                        <div class="grid lg:grid-cols-2 gap-3">
                                            <div class="input-group has-validation">
                                                <label htmlFor="school" class="mb-0"> School <span style={{color:'red'}}>*</span></label>
                                                <input type="text" id="school" {...formik.getFieldProps('school')} aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback" class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full" />
                                                {formik.touched.school && formik.errors.school ? (
                                                        <div id="school" style={{color:'red', fontSize:'13px'}} class="form-control is-invalid" >
                                                        {formik.errors.school}.
                                                        </div>    
                                                ) : null}
                                            </div>

                                            <div>
                                                <label htmlFor="fieldStudy" class="mb-0"> FieldStudy <span style={{color:'red'}}>*</span></label>
                                                <input type="text"  id="fieldStudy" {...formik.getFieldProps('fieldStudy')} class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full" />
                                                {formik.touched.fieldStudy && formik.errors.fieldStudy ? (
                                                    <div id="school" style={{color:'red', fontSize:'13px'}} class="form-control is-invalid" >
                                                       
                                                    <div>{formik.errors.fieldStudy}</div>
                                                    </div>
                                                ) : null}
                                            </div>
                                            </div>
                                            <div class="grid lg:grid-cols-2 gap-3">
                                                <div>
                                                    <label htmlFor="startYear" class="mb-0"> Start Year <span style={{color:'red'}}>*</span></label>
                                                    <input type="number" id="startYear" {...formik.getFieldProps('startYear')} class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full" />
                                                    {formik.touched.startYear && formik.errors.startYear ? (
                                                        <div id="school" style={{color:'red', fontSize:'13px'}} class="form-control is-invalid" >
                                                       
                                                    <div>{formik.errors.startYear}</div>
                                                    </div>
                                                ) : null}
                                                </div>
                                                <div>
                                                    <label class="mb-0"> end Year <span style={{color:'red'}}>*</span></label>
                                                    <input type="number" id="endYear" {...formik.getFieldProps('endYear')} class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full" />
                                                    {formik.touched.endYear && formik.errors.endYear ? (
                                                        <div id="school" style={{color:'red', fontSize:'13px'}} class="form-control is-invalid" >
                                                       
                                                    <div>{formik.errors.endYear}</div>
                                                    </div>
                                                ) : null}
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="visible" class="mb-0"> Visibility <span style={{color:'red'}}>*</span> </label>
                                                <select id="visible" {...formik.getFieldProps('visible')} class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full">
                                                <option></option>
                                               
                                                    <option>True</option>
                                                    <option>False</option>
                                            
                                            
                                                </select>
                                                {formik.touched.visible && formik.errors.visible ? (
                                                <div id="school" style={{color:'red', fontSize:'13px'}} class="form-control is-invalid" >
                                                        
                                                    <div>{formik.errors.visible}</div>
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div>
                                                <label htmlFor="description" class="mb-0">Description</label>
                                                <textarea id="description" {...formik.getFieldProps('description')} tabIndex={8} class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full" rows="3"></textarea>
                                                {formik.touched.description && formik.errors.description ? (
                                                    <div id="school" style={{color:'red', fontSize:'13px'}} class="form-control is-invalid" >
                                                       
                                                    <div>{formik.errors.description}</div>
                                                    </div>
                                                ) : null}
                                            </div>
  

                                            <div>
                                                <button type="submit" class="bg-blue-600 font-semibold p-2 mt-5 rounded-md text-center text-white">
                                                    Update</button>
                                            </div>
                                            
                                    </form> 
</div>
)}
</Formik>








                
                </div>
                </div>
            </body>
        </>
    )
}
export default EditEducationScreen;