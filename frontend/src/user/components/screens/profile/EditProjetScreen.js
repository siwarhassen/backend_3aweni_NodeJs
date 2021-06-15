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
import { fetchProjects } from '../../../../redux/slices/projectSlice';
const EditProjectScreen = ({history,match}) =>{
    const dispatch =useDispatch();
    const id = match.params.id;
    const project = useSelector((state) =>
        state.projects.projects.find((item) => item._id === id)
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

                axios.get(`/project/details/${id}`, config)
                  .then((response) => {
                    console.log(project)
                   
                  })
                  .catch((error) => {
                    console.log(error)
                  }) 
               
            }
           
    ,[history]);
    

    
    return (
        <>
        <Header/>
        <body>
        <ReactNotification/>
        <div class="main_content">
            <div class="mcontainer">
            <h1 class="lg:text-2xl text-xl font-semibold mb-6" > Update Your Project </h1>



            <Formik
initialValues={{
    name:project?.name,
    urlProject:project?.urlProject,
    startDate:project?.startDate,
    endDate:project?.endDate,
    visible:project?.visible,
    description:project?.description}} 
validationSchema={Yup.object({
        name: Yup.string()
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
    axios.put(`/project/update/${id}`,valuesToSend, {
        headers: headers
      })
      .then((response) => {
        dispatch(fetchProjects());
       console.log(response.data.data);

       store.addNotification({
        title: "Wonderful!",
        message: "Your project details have been updated with succes! check your profile",
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
      setTimeout(function(){ history.push("/profile_projet"); }, 1000);
  
      })
      .catch((error) => {
        console.log(error)
      })
  }}
>
    {formik => (

<div>
      

    <form onSubmit={formik.handleSubmit} >
                                    
                                        
                                            <div class="input-group has-validation">
                                                <label htmlFor="name" class="mb-0"> Name <span style={{color:'red'}}>*</span></label>
                                                <input type="text" id="name" {...formik.getFieldProps('name')} aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback" class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full" />
                                                {formik.touched.name && formik.errors.name ? (
                                                        <div id="name" style={{color:'red', fontSize:'13px'}} class="form-control is-invalid" >
                                                        {formik.errors.name}.
                                                        </div>    
                                                ) : null}
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

                                            <div class="input-group has-validation">
                                                <label htmlFor="urlProject" class="mb-0"> url Project </label>
                                                <input type="text" id="urlProject" {...formik.getFieldProps('urlProject')} aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback" class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full" />
                                                {formik.touched.urlProject && formik.errors.urlProject ? (
                                                        <div id="urlProject" style={{color:'red', fontSize:'13px'}} class="form-control is-invalid" >
                                                        {formik.errors.urlProject}.
                                                        </div>    
                                                ) : null}
                                            </div>

                                            <div>
                                                <label htmlFor="description" class="mb-0">Description</label>
                                                <textarea id="description" {...formik.getFieldProps('description')} tabIndex={8} class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full" rows="3"></textarea>
                                                {formik.touched.description && formik.errors.description ? (
                                                    <div id="description" style={{color:'red', fontSize:'13px'}} class="form-control is-invalid" >
                                                       
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
export default EditProjectScreen;