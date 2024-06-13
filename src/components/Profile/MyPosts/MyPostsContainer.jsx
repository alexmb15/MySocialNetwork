import {addPostActionCreator} from "../../../Redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

/*let MyPostsContainer = (props) => {

    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState().profilePage;

                    let addPost = () => {
                        let action = addPostActionCreator();
                        store.dispatch(action)
                    }

                    let updatePostMessage = (text) => {
                        let action = updatePostMessageActionCreator(text);
                        store.dispatch(action);
                    }

                    return (
                        <MyPosts addPost={addPost}
                                 updatePostMessage={updatePostMessage}
                                 posts={state.posts}
                                 newPostText={state.newPostText}
                        />)
                }
            }
        </StoreContext.Consumer>
    )
}*/

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => {
            let action = addPostActionCreator(newPostText);
            dispatch(action)
        }
    }
}

let MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;