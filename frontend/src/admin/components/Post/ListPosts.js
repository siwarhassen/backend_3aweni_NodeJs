/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../../redux/actions/postAction";
import Header from "../HeaderAdmin";
import PostItem from "./PostItem";

function ListPosts() {
  const posts = useSelector((state) => state.postReducer.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <> <Header/>
    <div style={{ marginLeft: "200px", backgroundColor: "#152036" }}>
      <br></br>
      <br></br>
      <div class="breadcome-area">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div class="breadcome-list">
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <div class="breadcomb-wp">
                      <div class="breadcomb-icon">
                        <i class="icon nalika-home"></i>
                      </div>
                      <div class="breadcomb-ctn">
                        <h2>Posts List</h2>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <div class="breadcomb-report">
                      <button
                        data-toggle="tooltip"
                        data-placement="left"
                        title="Download Report"
                        class="btn"
                      >
                        <i class="icon nalika-download"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="product-status mg-b-30">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div class="product-status-wrap">
                <h4>Posts List</h4>

                <table>
                  <tr>
                    <th>Username</th>

                    <th>Description</th>
                    <th>Image</th>
                    <th>Action</th>
                  </tr>

                  {posts.map((post, index) => {
                    return <PostItem post={post} key={post._id}></PostItem>;
                  })}
                </table>
                <div class="custom-pagination">
                  <ul class="pagination">
                    <li class="page-item">
                      <a class="page-link" href="#">
                        Previous
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        Next
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}

export default ListPosts;
