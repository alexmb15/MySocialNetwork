import classes from './Post.module.css'

const Post = (props) => {
  return (
    <div className={classes.item}>
      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4On3R8iOU-0ymSzk-z9bpYjcqyCRqSrSS0qiYlweQ1w&s'></img>
      <span>id: {props.id} message: {props.message}</span>
      <div>
        <span>{props.name} like {props.likes}</span>
      </div>
    </div>
  );
}

export default Post;