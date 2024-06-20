import React, {ChangeEvent} from "react";

type PropsType = {
    status?: string
    updateUserStatus: (status?: string) => void
}
type StateType ={
    editMode?: boolean
    status?: string
}
class ProfileStatus extends React.Component<PropsType, StateType> {

    state = {
        editMode: false,
        status: this.props.status
    }

    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if(prevProps.status !== this.props.status){
            this.setState({
                status: this.props.status
            })
            //console.log();
        }

    }

    activateEditMode = () => {
        //debugger;
        //console.log("this: ", this);
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateUserStatus(this.state.status);
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || "Du hast kein status!"}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange}
                               autoFocus={true}
                               onBlur={this.deactivateEditMode}
                               value={this.state.status}
                        />
                    </div>
                }
            </div>

        )
    }
}

export default ProfileStatus;