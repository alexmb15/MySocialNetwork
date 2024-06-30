import {actions} from "../../../Redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../Redux/redux-store";
import {PostType} from "../../../types/types";
import {getPosts} from "../../../Redux/Selectors/user-selectors";

type MapStateToPropsType = {
    posts: Array<PostType>
}
type MapDispatchToPropsType = {
    addPost: (newPostText: string) => void
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        posts: getPosts(state)
    }
}

let MyPostsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>
                       (mapStateToProps, {addPost: actions.addPost})(MyPosts);

export default MyPostsContainer;