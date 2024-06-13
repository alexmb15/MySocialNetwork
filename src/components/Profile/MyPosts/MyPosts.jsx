import classes from './MyPosts.module.css'
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsComponent/FormsComponent";
import {maxLength} from "../../../utils/validators/validators";

const maxLength20 = maxLength(20);

const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                       validate={[maxLength20]}
                       placeholder="New message"
                       name="newPostText"/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddNewPostFormRedux = reduxForm({form: "addNewPostForm"})(AddNewPostForm);

const MyPosts = (props) => {

    let onSubmit = (formData) => {
        console.log(formData.newPostText);
        props.addPost(formData.newPostText);
    }

    let postsElements = props.posts.map(
        p => <Post key={p.id} id={p.id} message={p.message} name={p.name} likes={p.likesCount}/>
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