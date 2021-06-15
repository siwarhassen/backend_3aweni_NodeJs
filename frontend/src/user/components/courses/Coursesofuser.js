import React ,{Component,useState} from 'react';
import { queryApi } from "../../../utils/queryApi";
import { useApi } from "../../../hooks/useApi";
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import dateFormat from 'dateformat';
import Header from'../Header'
export default function Coursesofuser({match}) {
    const id = match.params.id;
    const history = useHistory();
    const [addedcourses,errer] = useApi("course/listofcoursesbyuser/"+id,null,"GET",false);
    const [pageNumber,setPageNumber]=useState(0);

    const addedcoursesPerPage=4;
    const pageVisited=pageNumber*addedcoursesPerPage;
 
    const pageCount=Math.ceil(addedcourses?.length/addedcoursesPerPage);
    const changePage=({selected})=>{
        setPageNumber(selected);
    }
    const user=addedcourses?.[0].UserId;
    console.log(user);
    const displayaddedcourses =addedcourses?.slice(pageVisited,pageVisited+addedcoursesPerPage).map((cours, index)=>{
     
      
        return (
            <div class="uk-first-column"  >
  

            <Link to={`/detailcourse/${cours._id}`} class="blog-post blog-post-card" style={{height:"300px"}}> 
         
                <div class="blog-post-thumbnail">
                    <div class="blog-post-thumbnail-inner">
                        <img src={cours.Photo} alt=""  />
                    </div>
                </div>
            
                <div class="blog-post-content">
                    <h3>{cours.Name}</h3>
                  
                </div>
                <div class="blog-post-footer">
                    <div class="blog-post-content-info">
                        <span class="blog-post-info-tag btn btn-soft-primary"> {cours.Category} </span>
                        <span class="blog-post-info-date">{dateFormat(cours.DateCreation, " dS mmmm")}  </span>
                    </div>
                </div>
            </Link>
    
        </div>
     
        )
    })
  
        return(
            <div >
                  <Header />
     <br/><br/><br/>
     <div style={{width:"1040px",marginLeft:"300px",height:"250px"}}  class="blog-article-single" data-src="assets/user/course/images/blog/img-8.jpg" uk-img="" >
     <button  onClick={() => {
                    history.goBack();
                }}> <span class="item-tag"> <i class="icon-feather-arrow-left"> </i> </span>  </button>  
                <div class="container-small">

                    <p class="blog-article-meta mb-3">
                        <strong> View profile   </strong>
                    
                    </p>

                    

                    <div class="blog-article-auther">
                        <img src={user?.ProfilePicture} alt=""/>
                        <span class="blog-auther-user-name">{user?.username}</span>
                    </div>

                </div>


            </div>

     <div class="page-content-inner">

<h2 style={{marginLeft:"210px"}}>{addedcourses?.length} courses </h2>
<br/>
<div class="uk-child-width-1-2@ uk-child-width-1-3@m uk-grid" uk-grid="" style={{width:"1000px",marginLeft:"180px"}}>
{displayaddedcourses}
<br/>
                    <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    onPageChange={changePage}
                    pageCount={pageCount}
                    containerClassName={"uk-pagination my-5 uk-flex-center"}
                    nextLinkClassName={"uk-icon uk-pagination-next"}
                    previousClassName={"uk-icon uk-pagination-previous"}
                    activeClassName={"uk-active"}
                    disabledClassName={"uk-disabled"}
                
                     />
</div>





</div>



        </div>


     
   )
    





}