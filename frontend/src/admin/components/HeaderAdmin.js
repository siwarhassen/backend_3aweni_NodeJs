/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
  render() {
    return (
      <body style={{ backgroundColor: "#152036" }}>
        <div class="left-sidebar-pro">
          <nav id="sidebar" class="" style={{width:"50px"}}>
           
            <div class="nalika-profile">
              <div class="profile-dtl">
                <a href="#"></a>
                <h2>
                  Lakian <span class="min-dtn">Das</span>
                </h2>
              </div>
             
            </div>
            <div class="left-custom-menu-adp-wrap comment-scrollbar">
              <nav class="sidebar-nav left-sidebar-menu-pro">
                <ul class="metismenu" id="menu1">
                
                  <li>
                    <a
                      class="has-arrow"
                      data-toggle="collapse"
                      href="#jobs"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                    
                      <span class="mini-click-non">Jobs </span>
                    </a>
                    <ul class="submenu-angle" aria-expanded="false" id="jobs">
                      <li>
                        <Link to={"/jobsAdmin"} title="Inbox" href="mailbox.html">
                          <span class="mini-sub-pro">Jobs List</span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a
                      class="has-arrow"
                      data-toggle="collapse"
                      href="#posts"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                         
                      <span class="mini-click-non">Posts </span>
                    </a>
                    <ul class="submenu-angle" aria-expanded="false" id="posts">
                      <li>
                        <Link to={"/postsAdmin"} title="Inbox" href="mailbox.html">
                          <span class="mini-sub-pro">Posts List</span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a
                      class="has-arrow"
                      data-toggle="collapse"
                      href="#problems"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                     
                      <span class="mini-click-non">Problems </span>
                    </a>
                    <ul class="submenu-angle" aria-expanded="false" id="problems">
                      <li>
                        <Link to={"/problemsAdmin"} title="Inbox" href="mailbox.html">
                          <span class="mini-sub-pro">Problems List</span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a
                      class="has-arrow"
                      data-toggle="collapse"
                      href="#postcategories"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                  
                      <span class="mini-click-non">Post Categories </span>
                    </a>
                    <ul class="submenu-angle" aria-expanded="false" id="postcategories">
                      <li>
                        <Link to={"/categoriespAdmin"} title="Inbox" href="mailbox.html">
                          <span class="mini-sub-pro">Category List</span>
                        </Link>
                      </li>
                      <li>
                        <Link to={"/chart"} title="Inbox" href="mailbox.html">
                          <span class="mini-sub-pro">Category Statistics</span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                 

                  
             
                  
                </ul>
              </nav>
            </div>
          </nav>
        </div>
      
     
     
      </body>
    );
  }
}
