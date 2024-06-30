import React from 'react';
import classes from './MyPosts.module.css'
import Post from './Post/Post';
import {PostType} from "../../../types/types";
import {AddNewPostFormRedux} from "./AddNewPostForm/AddNewPostForm";

type MyPostsType = {
    posts: Array<PostType>
    addPost: (newPostText: string) => void
}
export type NewPostTextType = {
    newPostText: string
}

const MyPosts = ({posts, addPost}: MyPostsType) => {

    let onSubmit = (formData: NewPostTextType) => {
        console.log(formData.newPostText);
        addPost(formData.newPostText);
    }

    let postsElements = posts.map(
        p => <Post key={p.id} id={p.id} message={p.message} name={p.name} likesCount={p.likesCount}/>
    );

    return (
        <div className={classes.postsBlock}>
            <h3>My Posts</h3>
            <AddNewPostFormRedux onSubmit={onSubmit}/>
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    );
}

export default MyPosts;