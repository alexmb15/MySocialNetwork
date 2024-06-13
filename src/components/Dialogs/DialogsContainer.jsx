import {addDialogMessageActionCreator} from "../../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";

/*let DialogsContainer = (props) => {

    return <StoreContext.Consumer>
        {
            (store) => {
                let state = store.getState().dialogsPage;

                let addDialogMessage = () => {
                    let action = addDialogMessageActionCreator();
                    store.dispatch(action);
                }

                let updateDialogMessage = (text) => {
                    let action = updateDialogMessageActionCreator(text);
                    store.dispatch(action);
                }

                return <Dialogs addDialogMessage={addDialogMessage}
                                updateDialogMessage={updateDialogMessage}
                                dialogsPage={state}
                />
            }
        }
    </StoreContext.Consumer>;
}*/


const mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addDialogMessage: (newDialogMessage) => {
            let action = addDialogMessageActionCreator(newDialogMessage);
            dispatch(action);
        }
    }
}

//let DialogsContainer = withAuthRedirect(connect(mapStateToProps, mapDispatchToProps)(Dialogs));

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps)
)(Dialogs)