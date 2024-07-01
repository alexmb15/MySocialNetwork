import Sidebar from "./Sidebar";
import {connect} from "react-redux";
import {AppStateType} from "../../../Redux/redux-store";

export type SidebarPropsType = ReturnType<typeof mapStateToProps>

const mapStateToProps = (state: AppStateType) => {
    return {
        sidebar: state.sidebar
    }
}

let SidebarContainer = connect(mapStateToProps, {})(Sidebar);

export default SidebarContainer;