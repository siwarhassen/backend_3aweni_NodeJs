import React ,{Component,useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
export default function Error404() {
   

        return (
          

<div style={{color:"orange"}}>

<div uk-height-viewport="offset-top: true; offset-bottom: true" class="uk-flex uk-flex-middle bg-gradient-grey uk-text-center  px-4" style={{minHeight: "calc(100vh - 0px)",backgroundColor:"orange"}}>
            <div class="container-small m-auto ">

                <div class="uk-light mb-lg-8">
                    <h1 style={{ fontSize:"120px"}}>404<strong></strong></h1>
                    <p class="mb-0"> Please check your URL or return to the 3aweni home page. <br class="uk-visible@s"/>
                      </p>
                      <br/>
                      <Link to="/posts" class=" h-6 lg:px-5 px-2 rounded-md bg-blue-600 text-white " >
                                            3aweni Home
                                         </Link>
                </div>

            

            </div>
        </div>

        </div>

     
   )
    





}


