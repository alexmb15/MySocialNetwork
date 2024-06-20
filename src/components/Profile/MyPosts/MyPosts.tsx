import classes from './MyPosts.module.css'
import Post from './Post/Post';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsComponent/FormsComponent";
import {maxLength} from "../../../utils/validators/validators";
import {PostType} from "../../../types/types";

const maxLength20 = maxLength(20);

const AddNewPostForm = ({handleSubmit}: InjectedFormProps<{}, {}>) => {
    return (
        <form onSubmit={handleSubmit}>
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

type MyPostsType = {
    posts: Array<PostType>
    addPost: (newPostText: string) => void
}
const MyPosts = ({posts, addPost}: MyPostsType) => {

    let onSubmit = (formData: any) => {
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