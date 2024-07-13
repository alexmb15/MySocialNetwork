import {profileActions} from "../../../Redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../Redux/redux-store";
import {PostType} from "../../../types/types";
import {getPosts} from "../../../Redux/Selectors/profile-selectors";

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
                       (mapStateToProps, {addPost: profileActions.addPost})(MyPosts);

export default MyPostsContainer;