import React from 'react';
import classes from './Post.module.css'
import {PostType} from "../../../../types/types";


const Post = ({id, message, name, likesCount}: PostType) => {
  return (
    <div className={classes.item}>
      <img
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4On3R8iOU-0ymSzk-z9bpYjcqyCRqSrSS0qiYlweQ1w&s'
          alt=""
      />
      <span>id: {id} message: {message}</span>
      <div>
        <span>{name} like {likesCount}</span>
      </div>
    </div>
  );
}

export default Post;