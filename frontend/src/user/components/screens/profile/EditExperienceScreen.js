import React ,{useState , useEffect} from 'react';
import {Link} from 'react-router-dom';
import Header from '../../Header';
import axios from 'axios';
import { Formik,Field } from "formik";
import * as Yup from "yup";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import { useDispatch ,useSelector} from 'react-redux';
import { fetchExperiences } from '../../../../redux/slices/experienceSlice';
const EditEducationScreen = ({history,match}) =>{
    //const [experience, setExperience]= useState(Object);
    const id = match.params.id;
    const dispatch =useDispatch();
    const experience = useSelector((state) =>
        state.experiences.experiences.find((item) => item._id === id)
        );

    useEffect(() =>async() => {
        if(!localStorage.getItem("authToken")){
            history.push("/login")
        }    
        
        const config = {
            headers: {
                "Content-Type":"appliation/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`
            }
        }

                axios.get(`/experience/details/${id}`, config)
                  .then((response) => {
                    //setExperience(response.data);
                    console.log(experience)
                   
                  })
                  .catch((error) => {
                    console.log(error)
                  })

                  console.log(experience);    
               
            }
           
    ,[history]);
    

    
    return (
        <>
        <Header/>
        <body>
        <ReactNotification/>
        <div class="main_content">
            <div class="mcontainer">
            <h1 class="lg:text-2xl text-xl font-semibold mb-6" > Update Your Experience </h1>



            <Formik
initialValues={{
    title:experience?.title,
    employementType:experience?.employementType,
    company:experience?.company,
    location:experience?.location,
    startDate:experience?.startDate,
    endDate:experience?.endDate,
    visible:experience?.visible,
    description:experience?.description}} 
    
validationSchema={Yup.object({
        title: Yup.string()
          .min(3, "Minimum 3 characters")
          .max(50, "Maximum 50 character")
          .required('Required field'),
        employementType: Yup.string()
          .min(3, "Minimum 3 characters")
          .max(50, "Maximum 50 character")
          .required('Required field'),
        company: Yup.string()
          .min(3, "Minimum 3 characters")
          .max(50, "Maximum 50 character")
          .required('Required field'),
        location: Yup.string()
          .min(3, "Minimum 3 characters")
          .max(50, "Maximum 50 character")
          .required('Required field'),
        startDate: Yup.string()
        .required('Required field'),
        endDate: Yup.string()
        .required('Required field'),
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

    axios.put(`/experience/update/${id}`,valuesToSend, {
        headers: headers
      })
      .then((response) => {
       console.log(response.data.data);
       dispatch(fetchExperiences());
       //dispatch(addExperience(response.data.data));
       store.addNotification({
        title: "Wonderful!",
        message: "Your experience details have been updated with succes! check your profile",
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
      setTimeout(function(){ history.push("/profile_experience"); }, 1000);
     
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
                                                <label htmlFor="title" class="mb-0"> Title <span style={{color:'red'}}>*</span></label>
                                                <input type="text" id="title" {...formik.getFieldProps('title')} aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback" class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full" />
                                                {formik.touched.title && formik.errors.title ? (
                                                        <div id="title" style={{color:'red', fontSize:'13px'}} class="form-control is-invalid" >
                                                        {formik.errors.title}.
                                                        </div>    
                                                ) : null}
                                            </div>

                                            <div>
                                                <label htmlFor="employementType" class="mb-0"> Employement Type <span style={{color:'red'}}>*</span></label>
                                                <input type="text"  id="employementType" {...formik.getFieldProps('employementType')} class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full" />
                                                {formik.touched.employementType && formik.errors.employementType ? (
                                                    <div id="employementType" style={{color:'red', fontSize:'13px'}} class="form-control is-invalid" >
                                                       
                                                    <div>{formik.errors.employementType}</div>
                                                    </div>
                                                ) : null}
                                            </div>
                                            </div>

                                            <div class="grid lg:grid-cols-2 gap-3">
                                            <div class="input-group has-validation">
                                                <label htmlFor="company" class="mb-0"> Company <span style={{color:'red'}}>*</span></label>
                                                <input type="text" id="company" {...formik.getFieldProps('company')} aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback" class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full" />
                                                {formik.touched.company && formik.errors.company ? (
                                                        <div id="title" style={{color:'red', fontSize:'13px'}} class="form-control is-invalid" >
                                                        {formik.errors.company}.
                                                        </div>    
                                                ) : null}
                                            </div>

                                            <div>
                                                <label htmlFor="location" class="mb-0"> Location <span style={{color:'red'}}>*</span></label>
                                                <input type="text"  id="location" {...formik.getFieldProps('location')} class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full" />
                                                {formik.touched.location && formik.errors.location ? (
                                                    <div id="location" style={{color:'red', fontSize:'13px'}} class="form-control is-invalid" >
                                                       
                                                    <div>{formik.errors.location}</div>
                                                    </div>
                                                ) : null}
                                            </div>
                                            </div>

                                            <div class="grid lg:grid-cols-2 gap-3">
                                                <div>
                                                    <label htmlFor="startDate" class="mb-0"> Start Date <span style={{color:'red'}}>*</span></label>
                                                    <input type="date" id="startDate" {...formik.getFieldProps('startDate')} class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full" />
                                                    {formik.touched.startDate && formik.errors.startDate ? (
                                                        <div id="startDate" style={{color:'red', fontSize:'13px'}} class="form-control is-invalid" >
                                                       
                                                    <div>{formik.errors.startDate}</div>
                                                    </div>
                                                ) : null}
                                                </div>
                                                <div>
                                                    <label htmlFor="endDate" class="mb-0"> End Date <span style={{color:'red'}}>*</span></label>
                                                    <input type="date" id="endDate" {...formik.getFieldProps('endDate')} class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full" />
                                                    {formik.touched.endDate && formik.errors.endDate ? (
                                                        <div id="scendDatehool" style={{color:'red', fontSize:'13px'}} class="form-control is-invalid" >
                                                       
                                                    <div>{formik.errors.endDate}</div>
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