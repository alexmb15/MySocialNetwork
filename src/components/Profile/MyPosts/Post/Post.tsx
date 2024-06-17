import classes from './Post.module.css'

type PostPropsType = {
    id: number
    message: string
    name: string
    likes: number
}
const Post = ({id, message, name, likes}: PostPropsType) => {
  return (
    <div className={classes.item}>
      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4On3R8iOU-0ymSzk-z9bpYjcqyCRqSrSS0qiYlweQ1w&s'></img>
      <span>id: {id} message: {message}</span>
      <div>
        <span>{name} like {likes}</span>
      </div>
    </div>
  );
}

export default Post;