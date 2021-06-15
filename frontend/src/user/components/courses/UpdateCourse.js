import React ,{Component} from 'react';
import { queryApi } from "../../../utils/queryApi";
import { useApi } from "../../../hooks/useApi";
import Select from 'react-select';

import makeAnimated from 'react-select/animated';
import { Formik, Field, Form, FieldArray,ErrorMessage, prepareDataForValidation } from "formik";
import ReactNotification from 'react-notifications-component';
import { store } from 'react-notifications-component';
import Header from'../Header';
import 'react-notifications-component/dist/theme.css';
import * as Yup from "yup";
import { useDispatch ,useSelector} from 'react-redux';
import {updatecourse} from "../../../redux/slices/coursesSlice";
import { useHistory } from 'react-router';

export default function UpdateCourse({match}) {
    const id = match.params.id;
    const course = useSelector((state) =>
   state.courses.courses.find((item) => item._id === id)
   );
const dispatch =useDispatch();
const history = useHistory();
const initialValues = {
  
    Name: course?.Name,
    ShortDescription: course?.ShortDescription,
    Level:course?.Level,
    Language:course?.Language,
    
    Photo:course?.Photo,
    Category:course?.Category,
    MetaDescription:course?.MetaDescription,
    Skills:course?.Skills,
    Module:course?.Module

};
    //const [courses, err, reload] = useApi("course");
    

        return (
          

<div>
    <div></div>


    <Formik  initialValues={initialValues}  
             validationSchema={yupSchema}

             onSubmit={ async (values)=>{
             // const v=values.Module.map((d,index)=>{return d.Section});

              const valuesToSend = { ...values,
                Module:JSON.stringify(values.Module),
                Section:values.Module.map((d,index)=>{return JSON.stringify(d.Section)}),
             
                Answer:Number(values.Answer),
                Skills:values.Skills.map(t => t.value)};
              //var myObject =JSON.parse(values);

           
                  const [c, err] = await queryApi("course/update/"+id, valuesToSend, "PUT", true);
               
                  
                if (err) {
                  console.log(err);
             
              } else {  
              
               console.log(c);
                dispatch(updatecourse(c));
                store.addNotification(
                  {title:"success",
                  message:"course updated",
                  type:"success",
                  container:"top-center",
                  insert:"top",
                  dismiss:{duration:1000,
                    showIcon:true
                  },
                  onRemoval: (id, removedBy) => {
                    history.push("/homecourse")
                  }
              },  // history.push("/homecourse")
              );
           
           
              }
            }}


             render={  (props)=>{
                return (

<div>
        <Header />
<div class="card" style={{marginLeft:"330px",width:"1000px",backgroundColor:"white"}}>
<ReactNotification/>
                    <div class="card-header border-bottom-0 py-4" style={{marginTop:"100px"}}>
                        <h3> Update  Course </h3>
                    </div>


                    <ul class="uk-child-width-expand uk-tab" uk-switcher="connect: #course-edit-tab ; animation: uk-animation-slide-left-medium, uk-animation-slide-right-medium" style={{marginTop:"20px"}}>
                        <li class=""><a href="#" aria-expanded="false"> Basic</a></li>
                        <li class=""><a href="#" aria-expanded="false"> Curriculum</a></li>
                        <li class=""><a href="#" aria-expanded="false">Meta data</a></li>
               
                       
                        <li class=""><a href="#" aria-expanded="false">Finish</a></li>
                    </ul>







                    <div class="card-body" >
                    <Form onSubmit={props.handleSubmit}>
                    <ul class="uk-switcher uk-margin" id="course-edit-tab">

                        {/**Basic course */}
                         <li class="" >

                            {/* nameeee */}
                             <div class="row">
                                 <div class="col-xl-9 m-auto">
                                     <div class="form-group row mb-3">
                                         <label class="col-md-3 col-form-label" for="course_title">Course title<span class="required">*</span></label>
                                     <div class="col-md-9">
                                     <Field name="Name"  id="course_title"  placeholder="Enter course title" class={props.errors.Name && props.touched.Name ?   (
                                           "form-control is-invalid"):("form-control")}  /> 
                                     {props.errors.Name && props.touched.Name && (
                                           <p>{props.errors.Name}</p>)}
                                 </div>
                             </div>

                            {/* short description */}
                            <div class="form-group row mb-3">
                                <label class="col-md-3 col-form-label" for="short_description">Short description</label>
                                <div class="col-md-9">
                                    <textarea name="ShortDescription" id="short_description"  value={props.ShortDescription} onChange={props.handleChange} class={props.errors.ShortDescription && props.touched.ShortDescription ?   (
                                           "form-control is-invalid"):("form-control")} >
                                      CSS is what makes the web beautiful. It describes how HTML should be displayed and how to layout elements. Take this class and get familiar with CSS!.</textarea>
                                      {props.errors.ShortDescription && props.touched.ShortDescription && (
                                           <p>{props.errors.ShortDescription}</p>)}
                                </div>
                               
                            </div> 
                          
                             
                              
                                {/* Category */}
                                <div class="form-group row mb-3">
                               <label class="col-md-3 col-form-label" for="course_title"> Category <span class="required">*</span></label>
                               <div class="col-md-9">
                               <Field as="select" name="Category" value={props.Category} onChange={props.handleChange} tabindex="-98" style={{height:"50px"}} class={props.errors.Category && props.touched.Category ?   (
                                           "form-control is-invalid"):("form-control")}> 
                                         
                                         <option value="" label="Select Language" />
                                  
                                            {optionsCategory.map(option => (
                                    <option key={option.id} value={option.value} selected> 
                                            {option.value}
                                    </option>
                                            ))}
                             </Field>  
                             {props.errors.Category && props.touched.Category && (
                                           <p>{props.errors.Category}</p>)}
                              </div>
                             </div>
                                {/* Language */}
                            <div class="form-group row mb-3">
                                <label class="col-md-3 col-form-label" for="course_title"> Language <span class="required">*</span></label>
                                <div class="col-md-9">
                                    <Field as="select" name="Language" value={props.Language} onChange={props.handleChange}  tabindex="-98" style={{height:"50px"}}  class={props.errors.Language && props.touched.Language ?   (
                                           "form-control is-invalid"):("form-control")}> 
                                        <option value="" label="Select Language" />
                                                {optionsLanguage.map(option => (
                                        <option key={option.id} value={option.value} selected>
                                                {option.value}
                                        </option>
                                                ))}
                                </Field>  
                                {props.errors.Language && props.touched.Language && (
                                           <p>{props.errors.Language}</p>)}
                                </div>
                            </div>
                                 {/* Level */}
                            <div class="form-group row mb-3">
                                        <label class="col-md-3 col-form-label" for="course_title"> Level <span class="required">*</span></label>
                                        <div class="col-md-9">
                                            <Field as="select" name="Level" value={props.Level}   onChange={props.handleChange}  tabindex="-98" style={{height:"50px"}} class={props.errors.Level && props.touched.Level ?   (
                                           "form-control is-invalid"):("form-control")}> 
                                                    <option value="" label="Select a Level" />
                                                    <option value="beginner" label="Beginner" selected />
                                                    <option value="intermediate" label="Intermediate"  />
                                                    <option value="advances" label="Advances" />
                                        </Field> 
                                        {props.errors.Level && props.touched.Level && (
                                           <p>{props.errors.Level}</p>)}
                                        </div>
                            </div>

                             {/* Photo */}
                            <div class="form-group row mb-3">
                                        <label class="col-md-3 col-form-label" for="course_title"> Photo <span class="required">*</span></label>
                                        <div class="col-md-9">
                                        <input  class={props.errors.Photo && props.touched.Photo ?   (
                                           "form-control is-invalid"):("form-control bootstrap-tag-input uk-form-custom")} value={props.Photo} id="file" name="Photo" style={{height:"50px"}} type="file" onChange={(event) => {
                                            props.setFieldValue("Photo", event.currentTarget.files[0]);
                                            console.log(event.currentTarget.files[0])
                                            }}  />
                                        </div>
                                      
                                        </div>
                                        {props.errors.Photo && props.touched.Photo && (
                                           <p>{props.errors.Photo}</p>)}
                                    </div>
                      </div>


                          </li>
                        {/**end basic course */}


                        {/**Module */}
                        <li class="">
                            <div class="row">
                                <div class="col-xl-10 m-auto">


                                <FieldArray
                          name="Module"
                          render={({ insert, remove, push }) => (
                          <div>
                               {props.values.Module && props.values.Module.length>0 && props.values.Module.map((modu, index) => (
                               <div className="row" key={index}>
                                  



                                  <ul class="c-curriculum uk-accordion" uk-accordion="" style={{width:"2000px",marginLeft:"70px"}}>

<li class="uk-open" >
    <a class="uk-accordion-title" href="#"> <i class="uil-folder">
        </i>Module {index +1}</a>

    <div class="uk-accordion-content" aria-hidden="false">
        <ul class="sec-list uk-sortable" uk-sortable="handle: .uk-sortable-handle">
        
                     {/* nameeee */}
       
                     <div class="form-group row mb-3">
                                <label class="col-md-3 col-form-label" for="short_description">Name</label>
                                <div class="col-md-9">
                                <Field   name={`Module.${index}.Name`}  id="course_title"  placeholder="Enter course title"  class={props.errors.Module && 
                                  props.errors.Module[index] && 
                                  props.touched.Module && 
                                  props.touched.Module[index] 
                                   && props.errors.Module[index].Name 
                                    && props.touched.Module[index].Name ?   (
                                           "form-control is-invalid"):("form-control")} /> 
                                  { props.errors.Module && 
                                  props.errors.Module[index] && 
                                  props.touched.Module && 
                                  props.touched.Module[index] 
                                   && props.errors.Module[index].Name 
                                    && props.touched.Module[index].Name 
                                    && (
                                          <p>{props.errors.Module[index].Name }</p>)}
                                         
                                </div>
                           
                              
                                 
                              
                            </div> 
               {/* description */}  
               <div class="form-group row mb-3">
                             <label class="col-md-3 col-form-label" for="short_description">Description </label>
                                <div class="col-md-9">
                                    <textarea id="short_description"  name={`Module.${index}.Description`} onChange={props.handleChange} class={props.errors.Module && 
                                  props.errors.Module[index] && 
                                  props.touched.Module && 
                                  props.touched.Module[index] 
                                   && props.errors.Module[index].Description 
                                    && props.touched.Module[index].Description ?   (
                                           "form-control is-invalid"):("form-control")}>CSS is what makes the web beautiful. It describes how HTML should be displayed and how to layout elements. Take this class and get familiar with CSS!.</textarea>
                                    { props.errors.Module && props.errors.Module[index] &&  props.touched.Module &&  props.touched.Module[index]  && props.errors.Module[index].Description   && props.touched.Module[index].Description 
                                    && (
                                          <p>{props.errors.Module[index].Description }</p>)}
                                </div>
                             
                                </div> 

                {/*Section */}
                <h3 style={{marginRight:"600px"}}>Section</h3>
                <Section

                              name={`Module.${index}.Section`}
                              Module={modu}
                              setFieldValue={props.setFieldValue}
                              handleChange={props.handleChange}
                              touched={props.touched}
                              errors={props.errors}
                                a={props.values.Module[index].Section}
                            verif={props.errors.Module && props.errors.Module[index] &&  props.touched.Module &&  props.touched.Module[index]  && props.errors.Module[index].Section   && props.touched.Module[index].Section }
                            />
                           
                                {/*end Section */}

                                    {/* Quiz */}
                                    <h3 style={{marginRight:"600px"}}>Quiz</h3>
                                 {/* Name */}
                                    <div class="form-group row mb-3">
                                <label class="col-md-3 col-form-label" for="short_description">Name</label>
                                <div class="col-md-9">
                                <Field   name={`Module.${index}.Quiz.Name`}  id="course_title"  placeholder="Enter course title"  class={props.errors.Module && props.errors.Module[index] &&  props.touched.Module &&  props.touched.Module[index]  && props.errors.Module[index].Quiz   && props.touched.Module[index].Quiz  && props.touched.Module[index].Quiz.Name  && props.errors.Module[index].Quiz.Name ?   (
                                           "form-control is-invalid"):("form-control")}/> 
                              
                                { props.errors.Module && props.errors.Module[index] &&  props.touched.Module &&  props.touched.Module[index]  && props.errors.Module[index].Quiz   && props.touched.Module[index].Quiz  && props.touched.Module[index].Quiz.Name  && props.errors.Module[index].Quiz.Name 
                                    && (
                                          <p>{props.errors.Module[index].Quiz.Name }</p>)}
                              
                              
                                </div>
                                     </div> 
                       {/**end Name */}
                        {/* Duration */}
                        <div class="form-group row mb-3">
                                <label class="col-md-3 col-form-label" for="short_description">Duration(minutes)</label>
                                <div class="col-md-9">
                                <Field   name={`Module.${index}.Quiz.Duration`}  id="course_title" type="number"  placeholder="minutes" class={props.errors.Module && props.errors.Module[index] &&  props.touched.Module &&  props.touched.Module[index]  && props.errors.Module[index].Quiz   && props.touched.Module[index].Quiz  && props.touched.Module[index].Quiz.Duration  && props.errors.Module[index].Quiz.Duration ?   (
                                           "form-control is-invalid"):("form-control")} 
                                 /> 
                                  { props.errors.Module && props.errors.Module[index] &&  props.touched.Module &&  props.touched.Module[index]  && props.errors.Module[index].Quiz   && props.touched.Module[index].Quiz  && props.touched.Module[index].Quiz.Duration  && props.errors.Module[index].Quiz.Duration 
                                    && (
                                          <p>{props.errors.Module[index].Quiz.Duration }</p>)}
                                </div>
                                     </div> 
                                     {/**end Duration */}
                                 {/* questions */}
                               <Questions
                                  name={`Module.${index}.Quiz.Questions`}
                                  Module={modu}
                           
                               />
                              <br/> 
            
        </ul>
    </div>
   
                        
</li>                   
</ul>
                  
<br/>
                      </div>
                    
                    ))}

                    {props.values.Module.length  <=3? ( <div> <button
                                                             type="button"
                                                             className="secondary"
                                                             onClick={() => push({ Name: '',Description:'',Section:[{Name:"",Type:"", Description:"",ContentInformation:""}],
                                                              Quiz:{
                                                                Name:'',
                                                             Questions:[{QuestionText:'',Explantation:'',Answer:0,AnswerOptions:[]}]
                                                                    }   
                                                                     })}
                                                          >
                                                                Add Module
                                                         </button> <br/>  </div>
                                                         ):(console.log("max Module"))}
                 
                </div>
              )}
            />
<br/>

                                </div>
                            </div>






</li>
                        {/**end Module */}


                        {/**Course More Information */}     
                        <li class="" >

                            <div class="row justify-content-center">
                              {/**
                                <div class="col-xl-9">
                                   
                                    <div class="form-group row mb-3">
                                        <label class="col-md-3 col-form-label" for="website_keywords">Skills</label>
                                        <div class="col-md-9">


                                          
                                            <input type="text" class="form-control bootstrap-tag-input" id="meta_keywords" name="meta_keywords" data-role="tagsinput" />
                                            
                                        </div>
                                    </div>
                                </div> 
                                */}
                                      {/* meta description */}
                                           
                                <div class="col-xl-9">
                                 
   <div class="form-group row mb-3">
                                   
                                   <label class="col-md-3 col-form-label" for="meta_description">Skills
                                       </label>
                                      
                                   <div class="col-md-9">
                                   
    <Select  name="Skills" id="Skills"
      isMulti={true}
      options={optionsSkills} value={props.Skills}   onChange={(event) => {
        props.setFieldValue("Skills", event);
        }} touched={props.touched.Skills}
    />


                                   
                                   </div>
                               </div>
                                    <div class="form-group row mb-3">
                                   
                                        <label class="col-md-3 col-form-label" for="meta_description">Meta
                                            description</label>
                                           
                                        <div class="col-md-9">
                                        <textarea name="MetaDescription" id="short_description" class="form-control" value={props.MetaDescription} onChange={props.handleChange} >CSS is what makes the web beautiful. It describes how HTML should be displayed and how to layout elements. Take this class and get familiar with CSS!.</textarea>
                                        </div>
                                    </div>
                                </div> 
                            </div>


                        </li>
                        {/**Course More Information  */}

                        {/**Submit */}
                         <li class="" >

                            <div class="row">
                                <div class="col-12 my-lg-5">
                                    <div class="text-center">
                                        <h2 class="mt-0"><i class="icon-feather-check-circle text-success"></i></h2>
                                        <h3 class="mt-0">Thank you !</h3>

                                        <p class="w-75 mb-2 mx-auto"> Submit This Course  </p>

                                        <div class="mb-3 mt-3">
                                            <button type="button" class="btn btn-default" type="submit">Submit</button>
                                        </div>
                                    </div>
                                </div> 
                            </div>

                        </li>
                        {/** end Submit */}
                        </ul>
                   </Form>


                    </div>

                </div>
 

                      </div>
                      
                      
                      
                      )
      
            }}
    />
 
 </div>


     
   )
    





}


const yupSchema = Yup.object({
Name: Yup.string().min(3, "Minimum 3 caracteres").max(80, "Maximum 80 caracteres").required("required!"),
ShortDescription: Yup.string().min(50, "Minimum 50 caracteres").required("required!"),
Level:Yup.string().required("Level required!"),
Language:Yup.string().required("Language required!"),
Category:Yup.string().required("Category required!"),
Photo:Yup.mixed().required("Photo required!"),
Module:
    Yup.array().of(
        Yup.object().shape({
        Name:Yup.string().min(4, "Minimum 4 caracteres").required("Name required"),
        Description: Yup.string().min(50, "Minimum 50 caracteres").required("required!"),
        Quiz:Yup.object({
          Name:Yup.string().min(4, "Minimum 4 caracteres").required("Name required"),
          Duration:Yup.number().required("Duration required").positive("positive number").lessThan(16,'duration must be less than 16 minutes')
        }),
        Section: Yup.array().of(
          Yup.object().shape({
            Name:Yup.string().min(3, "Minimum 3 caracteres").required("Name required"),
            Duration:Yup.number().required("Duration required").positive("positive number").lessThan(20,'duration must be less than 20 minutes')
          })
        )

        })
    )

});



const optionsCategory = [
    { id:1, value: 'Computer science' },
{ id:2,value: 'Business' },
{ id:3,value: 'Data Science'},
{ id:4,value: 'Information Technology' },
{ id:5,value: 'Health' },
{ id:6,value: 'Arts and humanities' }
  ];

  const optionsLanguage = [
    { id:1, value: 'English' },
{ id:2,value: 'Frensh' },
{ id:3,value: 'Arabic'},
{ id:4,value: 'Allemand' },

  ];

  const optionstypeOfContent = [
    
    { id:1,value: 'pdf' },
    { id:2, value: 'video' }
  ];



  const Section = ({ Module, name,setFieldValue ,handleChange,errors,touched,verif,a}) => (
    <FieldArray
      name={name}
      render={({ insert, remove, push }) => (
          
        <div>
         
          {  Module.Section.length > 0 &&
            Module.Section.map((subm, index) => (
              <div key={index}>
               
                  <ul class="c-curriculum uk-accordion" uk-accordion="">

                        <li class="uk-open">
                            <a class="uk-accordion-title" href="#" style={{marginRight:"530px"}}> <i class="uil-folder">
                                  </i>Section {index +1}</a>

                           <div class="uk-accordion-content" aria-hidden="false">
                               <ul class="sec-list uk-sortable" uk-sortable="handle: .uk-sortable-handle">
     
      
                                    <li>
                                         {/* nameeee */}
       
                            <div class="form-group row mb-3">
                                <label class="col-md-3 col-form-label" for="short_description">Name</label>
                                <div class="col-md-9">
                                <Field  name={`${name}.${index}.Name`}  id="course_title"  placeholder="Enter course title"  /> 
                              
                               { verif  
                                    && (
                                          <p>required</p>)}
                                
                                </div>
                              
                            </div> 
                            {/**end  */}
                              {/* Duration */}
                        <div class="form-group row mb-3">
                                <label class="col-md-3 col-form-label" for="short_description">Duration(minutes)</label>
                                <div class="col-md-9">
                                <Field  name={`${name}.${index}.Duration`} class="form-control" id="course_title" type="number"  placeholder="minutes" /> 
                                </div>
                                     </div> 
                                     {/**end Duration */}
    {/* description */}  
    <div class="form-group row mb-3">
    <label class="col-md-3 col-form-label" for="short_description">Description </label>
                                <div class="col-md-9">
                                    <textarea id="short_description" class="form-control" name={`${name}.${index}.Description`} onChange={handleChange} >CSS is what makes the web beautiful. It describes how HTML should be displayed and how to layout elements. Take this class and get familiar with CSS!.</textarea>
                                </div>
                                </div> 
     {/* Photo */}
     <div class="form-group row mb-3">
                                        <label class="col-md-3 col-form-label" for="course_title"> Photo <span class="required">*</span></label>
                                        <div class="col-md-9">
                                        <input class="form-control bootstrap-tag-input uk-form-custom" id="file" name={`${name}.${index}.ContentInformation`}  style={{height:"50px"}} type="file" onChange={(event) => {
                                           {setFieldValue(`${name}.${index}.ContentInformation`,event.currentTarget.files[0].name)};
                                           console.log(event.currentTarget.files[0])
                                            }} className="form-control" />
                                        </div>
                                        </div>

                                {/* type */}
                                <div class="form-group row mb-3">
                            <label class="col-md-3 col-form-label" for="short_description">Type</label>
                                <div class="col-md-9">
                                <Field as="select"  class="form-control"
                               name={`${name}.${index}.Type`} 
                                >
                        
                         {optionstypeOfContent.map(option => (
                          <option key={option.id} value={option.value}>
                           {option.value}
                         </option>
                         ))}
                        </Field>

                                </div>
  </div>
                     {/*end content of Section */}
                                    </li>
                                    
                              </ul>
                          </div>
                      </li>

                  </ul>
                <br/>

               

               
              </div>
              
            ) 
            )
          
          }
             {Module.Section.length  <=3? ( <div> <button
                type="button"
                className="secondary"
                onClick={() => push({Name:'',Type:"",Description:"", ContentInformation:null}  
                        )}
             >
                   Add Section
            </button> <br/>  </div>
            ):(console.log("max Section"))}
        </div>
      )}
    />
  );





  const Content = ({ Section, name ,setFieldValue}) => (
    <FieldArray
      name={name}
      render={arrayHelpers => (
          
        <div>
      
          {Section.Content.length ? (
            Section.Content.map((conten, index) => (
              <div key={index}>
                

                <ul class="c-curriculum uk-accordion" uk-accordion="">

<li class="uk-open">
    <a class="uk-accordion-title" href="#" style={{marginRight:"530px"}}> <i class="uil-folder" >
        </i>Content {index +1}</a>

    <div class="uk-accordion-content" aria-hidden="false">
        <ul class="sec-list uk-sortable" uk-sortable="handle: .uk-sortable-handle">
            <li>
            <div class="form-group row mb-3">
                                  {/*type of content  */}
                                <label class="col-md-3 col-form-label" for="short_description">Type</label>
                                <div class="col-md-9">
                                <Field as="select"  class="form-control"
                               name={`${name}.${index}.Type`} 
                                >
                         <option value="" label="Select content" />
                         {optionstypeOfContent.map(option => (
                          <option key={option.id} value={option.value}>
                           {option.value}
                         </option>
                         ))}
                        </Field>


                              
                                </div>
                            </div> 
 
                  
                          
                        <br/>



            </li>
   
        </ul>
    </div>
</li>

</ul>





                <button
                  type="button"
                  onClick={() => arrayHelpers.insert(index, {Type:''})} // insert an empty content at a position
                >
                  Add content
                </button>
              </div>
            ))
          ) : (
            <button type="button" onClick={() => arrayHelpers.push("")}>
             
              Add a content
            </button>
          )}
        </div>
      )}
    />
  );




  const Questions = ({ Module, name }) => (
    <FieldArray
      name={name}
      render={({ insert, remove, push })  => (
          
        <div>
      
          {
            Module.Quiz.Questions.map((quest, index) => (
              <div key={index}>
                  

                    <ul class="c-curriculum uk-accordion" uk-accordion="">

<li class="uk-open">
    <a class="uk-accordion-title" href="#" style={{marginRight:"540px"}}> <i class="uil-folder">
        </i>Question {index +1}</a>

    <div class="uk-accordion-content" aria-hidden="false">
        <ul class="sec-list uk-sortable" uk-sortable="handle: .uk-sortable-handle">
            <li>
            {/*question text  */}
       
            <div class="form-group row mb-3">
                                <label class="col-md-3 col-form-label" for="short_description">Question text</label>
                                <div class="col-md-9">
                                <Field    name={`${name}.${index}.QuestionText`} class="form-control" id="course_title"  placeholder="Enter course title" /> 
                                </div>
            </div> 

             {/*Explantation  */}
       
     <div class="form-group row mb-3">
                                <label class="col-md-3 col-form-label" for="short_description">Explantation</label>
                                <div class="col-md-9">
                                <Field       name={`${name}.${index}.Explantation`}  class="form-control" id="course_title"  placeholder="Enter course title" /> 
                                </div>
            </div> 

     {/* Language */}
     <div class="form-group row mb-3">
                          
                            </div>
                            <div class="form-group row mb-3">
                                <label class="col-md-3 col-form-label" for="short_description">Proposition 1</label>
                                <div class="col-md-9">
                                <Field    name={`${name}.${index}.AnswerOptions.${0}`}  class="form-control" id="course_title"  placeholder="Enter course title" /> 
                                </div>
                            </div> 
                            <div class="form-group row mb-3">
                                <label class="col-md-3 col-form-label" for="short_description">Proposition 2</label>
                                <div class="col-md-9">
                                <Field    name={`${name}.${index}.AnswerOptions.${1}`}  class="form-control" id="course_title"  placeholder="Enter course title" /> 
                                </div>
                            </div> 
                            <div class="form-group row mb-3">
                                <label class="col-md-3 col-form-label" for="short_description">Proposition 3</label>
                                <div class="col-md-9">
                                <Field    name={`${name}.${index}.AnswerOptions.${2}`}  class="form-control" id="course_title"  placeholder="Enter course title" /> 
                                </div>
                            </div> 
                            <div class="form-group row mb-3">
                            <label class="col-md-3 col-form-label" for="course_title"> Answer <span class="required">*</span></label>
                                <div class="col-md-9">
                                    <Field as="select"   name={`${name}.${index}.Answer`}  tabindex="-98" style={{height:"50px"}}> 
                                        <option value="0" label="0" />
                                        <option value="1" label="1" />
                                        <option value="2" label="2" />
                                </Field>  
                                </div>
                                </div>
            </li>
     
       
            
        </ul>
    </div>
</li>

</ul>
                 
             
<button
                  type="button"
                  onClick={() => remove(index)} // remove a content from Section
                >
                  remove question
                </button>
                  

              </div>
              
            )) 
        }
        
      
             
           <button
                  type="button"
                  onClick={() => push({QuestionText:'',Explantation:'',Answer:0,AnswerOptions:[]})} // insert an empty content at a position
                >
                  Add question
                </button>
        </div>
      )}
    />
  );




  const AnswerOption = ({ question, name }) => (
    <FieldArray
      name={name}
      render={({ insert, remove, push }) => (
          
        <div>
      
          {
           question.AnswerOptions.map((answ, index) => (
              <div key={index}>
                 


                    <ul class="c-curriculum uk-accordion" uk-accordion="">

<li class="uk-open">
    <a class="uk-accordion-title" href="#"> <i class="uil-folder">
        </i>AnswerOption {index +1}</a>

    <div class="uk-accordion-content" aria-hidden="false">
        <ul class="sec-list uk-sortable" uk-sortable="handle: .uk-sortable-handle">
            <li>
                    {/* nameeee */}
       
                    <div class="form-group row mb-3">
                                <label class="col-md-3 col-form-label" for="short_description">Proposition {index +1}</label>
                                <div class="col-md-9">
                                <Field   name={`${name}.${index}.AnswerText`} class="form-control" id="course_title"  placeholder="Enter course title" /> 
                                </div>
                            </div> 
            </li>


            
        </ul>
    </div>
</li>

</ul>




{question.AnswerOptions.length  <=10? ( <div> <button
                type="button"
                className="secondary"
                onClick={() => push({AnswerText:''}
                        )}
             >
                   Add Question
            </button> <br/>  </div>
            ):(console.log("max Section"))}

                <button
                  type="button"
                  onClick={() => remove(index)} // remove a content from Section
                >
                  remove answerquestion
                </button>

              </div>
              
            ))
          
          }
        
        </div>
      )}
    />
  );
  const optionsSkills = [
    { value: 'sql', label: 'sql' },
    { value: 'Metadata', label: 'Metadata' },
    { value: 'Data Cleansing', label: 'Data Cleansing' },
    { value: 'Spreadsheet', label: 'Spreadsheet' },
    { value: 'Node.Js', label: 'Node.Js' },
    { value: 'Angularjs', label: 'Angularjs' },
    { value: 'Typescript', label: 'Typescript' },
    { value: 'Mongodb', label: 'Mongodb' },
    { value: 'Express.Js', label: 'Express.Js' },
    { value: 'Jquery', label: 'Jquery' },
    { value: 'Web Development', label: 'Web Development' },
    { value: 'Html', label: 'Html' },
  ];
  


  class MySelect extends React.Component {
    handleChange = value => {
      // this is going to call setFieldValue and manually update values.colors
      this.props.onChange('colors', value);
    };
  

    render() {
     
      return (
        <div style={{ margin: '1rem 0' }}>
          <label htmlFor="color">
            Colors (select 2){' '}
            <small style={{ color: '#999' }}>but actually 3 ;-)</small>
          </label>
          <Select
            id="color"
            options={optionsSkills}
            multiple={true}
            onChange={this.handleChange}
            value={this.props.value}
          />
          {this.props.error &&
            this.props.touched &&
            <div style={{ color: 'red', marginTop: '.5rem' }}>
              {this.props.error}
            </div>}
        </div>
      );
    }
  }