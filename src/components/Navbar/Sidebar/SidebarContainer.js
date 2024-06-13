import Sidebar from "./Sidebar";
import {connect} from "react-redux";

/*let SidebarContainer = (props) => {
    return <StoreContext.Consumer>
        {
            (store) => <Sidebar sidebar={store.getState().sidebar}/>
        }
    </StoreContext.Consumer>
}*/

const mapStateToProps = (state) => {
    return {
        sidebar: state.sidebar
    }
}
const mapDispatchToProps = () => {
    return {

    }
}

let SidebarContainer = connect(mapStateToProps, mapDispatchToProps)(Sidebar);

export default SidebarContainer;