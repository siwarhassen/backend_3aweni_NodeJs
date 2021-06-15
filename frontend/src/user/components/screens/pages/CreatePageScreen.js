import React ,{useState , useEffect} from 'react';
import {Link} from 'react-router-dom';
import Header from '../../Header';
import axios from 'axios';
import { Formik } from "formik";
import * as Yup from "yup";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import { fetchMyPages } from '../../../../redux/slices/mypagesSlice';
import { useDispatch } from 'react-redux';
import { fetchPages } from '../../../../redux/slices/pagesSlice';
const CreatePageScreen = ({history}) =>{

    const dispatch =useDispatch();
    const [categories, setCategories]= useState([]);

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

        axios.get(`/category/getAll`, config)
        .then((response) => {
         setCategories(response.data);
         console.log(response.data)
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
            <h1 class="lg:text-2xl text-xl font-semibold mb-6" > Create a new page </h1>



            <Formik
initialValues={{
    name:'',
    type:'',
    numTel:'',
    country:'',
    address:'',
    profilePicture:'',
    coverPicture:'',
    description:''}} 
validationSchema={Yup.object({
        name: Yup.string()
          .min(3, "Minimum 3 characters")
          .max(50, "Maximum 50 character")
          .required('Required field'),
          country: Yup.string()
          .min(3, "Minimum 3 characters")
          .max(50, "Maximum 50 character")
          .required('Required field'),
          address: Yup.string()
          .min(3, "Minimum 3 characters")
          .max(50, "Maximum 50 character")
          .required('Required field'),
        numTel: Yup.string()
        .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, "Invalid number")
        .required('Required field'),
        type:Yup.string()
        .required('Required field'),
        profilePicture:Yup.string()
        .required('Required field'),
        coverPicture:Yup.string()
        .required('Required field'),
      })}
onSubmit={ async (values)=>{
            
    //const valuesToSend = { ...values};
    //console.log(values.profilePicture)
   // console.log(profilePicture1)

    const formData = new FormData();

        formData.append("name", values.name);
        formData.append("type", values.type);
        formData.append("description", values.description);
        formData.append("profilePicture", values.profilePicture);
        formData.append("coverPicture", values.coverPicture);
        formData.append("numTel", values.numTel);
        formData.append("country", values.country);
        formData.append("address", values.address);
console.log(values)
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("authToken")}`
      }

    axios.post(`/page/add`,formData, {
        headers: headers
      })
      .then((response) => {
       console.log(response.data.data);
     
       store.addNotification({
        title: "Wonderful!",
        message: "Your page details have been added with succes! ",
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
      history.push("/pages");
      })
      .catch((error) => {
        console.log(error)
      })
      
  }}
>
    {formik => (
<>
<div class="lg:p-12 max-w-xl lg:my-0 my-12 mx-auto p-6 space-y-">
<form onSubmit={formik.handleSubmit} enctype="multipart/form-data" style={{marginLeft:"-100px"}}> 

                                            <div >
                                                <label htmlFor="name" class="mb-0"> Name <span style={{color:'red'}}>*</span></label>
                                                <input type="text" placeholder="Name" id="name" {...formik.getFieldProps('name')} aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback" class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full" />
                                                {formik.touched.name && formik.errors.name ? (
                                                        <div id="school" style={{color:'red', fontSize:'13px'}} class="form-control is-invalid" >
                                                        {formik.errors.name}.
                                                        </div>    
                                                ) : null}
                                            </div>

                                            <div >
                                            <label htmlFor="type" class="mb-0"> Category <span style={{color:'red'}}>*</span></label>
                                            <select id="type" {...formik.getFieldProps('type')} class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full">
                                                <option></option>
                                                { categories.map((val,key) => {
                                                return(
                                                        <option key={key}>{val.name}</option>
                                                
                                                )})}
                                            </select>
                                            {formik.touched.type && formik.errors.type ? (
                                                        <div id="school" style={{color:'red', fontSize:'13px'}} class="form-control is-invalid" >
                                                        {formik.errors.type}.
                                                        </div>    
                                                ) : null}
                                            </div>

                                            <div >
                                                <label htmlFor="numTel" class="mb-0"> Phone number <span style={{color:'red'}}>*</span></label>
                                                <input type="number" placeholder="Phone number" id="numTel" {...formik.getFieldProps('numTel')} aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback" class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full" />
                                                {formik.touched.numTel && formik.errors.numTel ? (
                                                        <div id="school" style={{color:'red', fontSize:'13px'}} class="form-control is-invalid" >
                                                        {formik.errors.numTel}.
                                                        </div>    
                                                ) : null}
                                            </div>

                                            <div >
                                            <label htmlFor="country" class="mb-0"> Country <span style={{color:'red'}}>*</span></label>
                                                <input type="text" placeholder="Country" id="country" {...formik.getFieldProps('country')} aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback" class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full" />
                                                {formik.touched.country && formik.errors.country ? (
                                                        <div id="school" style={{color:'red', fontSize:'13px'}} class="form-control is-invalid" >
                                                        {formik.errors.country}.
                                                        </div>    
                                                ) : null}
                                            </div>

                                            <div >
                                            <label htmlFor="address" class="mb-0"> Address <span style={{color:'red'}}>*</span></label>
                                                <input type="text" placeholder="Address" id="address" {...formik.getFieldProps('address')} aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback" class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full" />
                                                {formik.touched.address && formik.errors.address ? (
                                                        <div id="school" style={{color:'red', fontSize:'13px'}} class="form-control is-invalid" >
                                                        {formik.errors.address}.
                                                        </div>    
                                                ) : null}
                                            </div>

                                            <div >
                                            <label htmlFor="profilePicture" class="mb-0"> Profile Picture <span style={{color:'red'}}>*</span></label>
                                                <input type="file"  placeholder="Profile Picture" id="profilePicture" onChange={(event) => {formik.setFieldValue("profilePicture", event.target.files[0]);
                  }}  aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback" class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full" />
                                                {formik.touched.profilePicture && formik.errors.profilePicture ? (
                                                        <div id="school" style={{color:'red', fontSize:'13px'}} class="form-control is-invalid" >
                                                        {formik.errors.profilePicture}.
                                                        </div>    
                                                ) : null}
                                            </div>

                                            <div >
                                            <label htmlFor="coverPicture" class="mb-0"> Cover Picture <span style={{color:'red'}}>*</span></label>
                                                <input type="file"  placeholder="Cover Picture" id="coverPicture" onChange={(event) => {formik.setFieldValue("coverPicture", event.target.files[0])}} aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback" class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full" />
                                                {formik.touched.coverPicture && formik.errors.coverPicture ? (
                                                        <div id="school" style={{color:'red', fontSize:'13px'}} class="form-control is-invalid" >
                                                        {formik.errors.coverPicture}.
                                                        </div>    
                                                ) : null}
                                            </div>

                                            <div>
                                                <label htmlFor="description" class="mb-0">Description</label>
                                                <textarea placeholder="Description" id="description" {...formik.getFieldProps('description')} tabIndex={8} class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full" rows="3"></textarea>
                                                {formik.touched.description && formik.errors.description ? (
                                                    <div id="school" style={{color:'red', fontSize:'13px'}} class="form-control is-invalid" >
                                                       
                                                    <div>{formik.errors.description}</div>
                                                    </div>
                                                ) : null}
                                            </div>
    <div>
        <button type="submit" style={{marginLeft:"500px"}} class="bg-blue-600 font-semibold p-2 mt-5 rounded-md text-center text-white">
            Register</button>
    </div>
</form> 




</div>
        
                            </>
)}
</Formik>








                
                </div>
                </div>
            </body>
        </>
    )
}
export default CreatePageScreen;