import React ,{Component} from 'react';
import { useApi } from "../../../hooks/useApi";
import useChat from "../../../useChat";
import axios from "axios";
import { useEffect, useState } from "react";
import Messageinmessenger from './messageinmessenger';
import Chatbox from './Chatbox';
const OpenChat = () => {
    const [showResults, setShowResults] = React.useState(false)
    const onClick = () => setShowResults(true)

    {
        return (
            <div>
            <div uk-toggle="target: #offcanvas-chat" class="start-chat">
            <svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
            </svg>
        </div>
        <div id="offcanvas-chat" uk-offcanvas="flip: true; overlay: true">
        <div class="uk-offcanvas-bar bg-white p-0 w-full lg:w-80">
    
    
            <div class="relative pt-5 px-4">
    
                <h3 class="text-2xl font-bold mb-2"> Chats </h3>
    
                <div class="absolute right-3 top-4 flex items-center">
    
                    <button class="uk-offcanvas-close  px-2 -mt-1 relative rounded-full inset-0 lg:hidden blcok"
                        type="button" uk-close></button>
    
                    <a href="#" uk-toggle="target: #search;animation: uk-animation-slide-top-small">
                        <ion-icon name="search" class="text-2xl hover:bg-gray-100 p-1 rounded-full"></ion-icon>
                    </a>
                    <a href="#">
                        <ion-icon name="cog" class="text-2xl hover:bg-gray-100 p-1 rounded-full"></ion-icon>
                    </a>
                    <a href="#">
                        <ion-icon name="ellipsis-vertical" class="text-2xl hover:bg-gray-100 p-1 rounded-full"></ion-icon>
                    </a>
    
                </div>
    
    
            </div>
 
            <div class="absolute bg-white z-10 w-full -mt-5 lg:mt-0 transform translate-y-1.5 py-2 border-b items-center flex"
                id="search" hidden>
                <input type="text" placeholder="Search.." class="flex-1"/>
                <ion-icon name="close-outline" class="text-2xl hover:bg-gray-100 p-1 rounded-full mr-4 cursor-pointer"
                    uk-toggle="target: #search;animation: uk-animation-slide-top-small"></ion-icon>
            </div>
    
            <nav class="cd-secondary-nav border-b extanded mb-2">
                <ul uk-switcher="connect: #chats-tab; animation: uk-animation-fade">
                    <li class="uk-active"><a class="active" href="#0"> Friends </a></li>
                    <li><a href="#0">Groups <span> 10 </span> </a></li>
                </ul>
            </nav>
    
            <div class="contact-list px-2 uk-switcher" id="chats-tab">
    
                <div>

                    <a  href="javascript:void(0);"  >
                        <div class="contact-avatar">
                            <img src="assets/user/images/avatars/avatar-1.jpg" alt=""/>
                            <span class="user_status status_online"></span>
                        </div>
                        <div class="contact-username"> Dennis Han</div>
                    </a>
                    <a  href="javascript:void(0);">
                        <div class="contact-avatar">
                            <img src="assets/user/images/avatars/avatar-2.jpg" alt=""/>
                            <span class="user_status"></span>
                        </div>
                        <div class="contact-username"> Erica Jones</div>
                    </a>
                    <a href="timeline.html">
                        <div class="contact-avatar">
                            <img src="assets/user/images/avatars/avatar-3.jpg" alt=""/>
    
                        </div>
                        <div class="contact-username">Stella Johnson</div>
                    </a>
                    <a href="timeline.html">
                        <div class="contact-avatar">
                            <img src="assets/user/images/avatars/avatar-4.jpg" alt=""/>
    
                        </div>
                        <div class="contact-username"> Alex Dolgove</div>
                    </a>
    
                </div>
                <div>
    
                    <a href="timeline.html">
                        <div class="contact-avatar">
                            <img src="assets/user/images/avatars/avatar-1.jpg" alt=""/>
                            <span class="user_status status_online"></span>
                        </div>
                        <div class="contact-username"> Dennis Han</div>
                    </a>
                    <a href="timeline.html">
                        <div class="contact-avatar">
                            <img src="assets/user/images/avatars/avatar-2.jpg" alt=""/>
                            <span class="user_status"></span>
                        </div>
                        <div class="contact-username"> Erica Jones</div>
                    </a>
                    <a href="timeline.html">
                        <div class="contact-avatar">
                            <img src="assets/user/images/avatars/avatar-3.jpg" alt=""/>
    
                        </div>
                        <div class="contact-username">Stella Johnson</div>
                    </a>
                    <a href="timeline.html">
                        <div class="contact-avatar">
                            <img src="assets/user/images/avatars/avatar-4.jpg" alt=""/>
    
                        </div>
                        <div class="contact-username"> Alex Dolgove</div>
                    </a>
    
       
        </div>
    </div>    
    </div>
    </div>
    </div>
        
        
        
            
            )
    
}



}

export default OpenChat;