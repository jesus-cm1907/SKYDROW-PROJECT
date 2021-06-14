import React from 'react'
import {Avatar } from "@material-ui/core";
import { InputIcon } from './InputIcon';
import ThumbUpAltIconOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import firebase from 'firebase';

export const Post = ({name,description, mensaje,photoURL,images, time}) => {
    return (
        <div className="post">
          <div className="post__header"> 
          <Avatar src={photoURL}/>
          <div className="post__info"> 
            <h2>{name}</h2>
            <p>{description} - {new Date(time.seconds * 1000).toLocaleTimeString()} {new Date(time.seconds * 1000).toLocaleDateString()} </p>
         </div>
      </div>
       <div className="post__body"> 
         <p>{mensaje}</p>
         {images ?  <img src={images} /> : '' }
         
         
         
          </div>
          <div className="post__buttom"> 
          <InputIcon Icon={ThumbUpAltIconOutlinedIcon} title='Like' color='gray'/>
          <InputIcon Icon={ChatOutlinedIcon} title='Comentario' color='gray'/>
          <InputIcon Icon={ShareOutlinedIcon} title='Compartir' color='gray'/>
          <InputIcon Icon={SendOutlinedIcon} title='Enviar' color='gray'/>
           
        
        </div>
        </div>
    );
};
