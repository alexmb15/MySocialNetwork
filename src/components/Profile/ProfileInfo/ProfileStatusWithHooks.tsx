import React, {ChangeEvent, useEffect, useState} from "react";

type ProfileStatusType = {
    status: string
    updateUserStatus: (status: string) => void
}
const ProfileStatus = ({status, updateUserStatus}: ProfileStatusType) => {

    let [editMode, setEditMode] = useState(false);
    let [localStatus, setLocalStatus] = useState(status);

    useEffect(() => {
        setLocalStatus(status);
    }, [status])


    const activateEditMode = () => {
        //debugger;
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        updateUserStatus(localStatus);
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalStatus(e.currentTarget.value);
    }

    return (
        <div>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>Status: {status || "Du hast kein status!"}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={onStatusChange}
                           autoFocus={true}
                           onBlur={deactivateEditMode}
                           value={localStatus}
                    />
                </div>
            }
        </div>
    )
}

export default ProfileStatus;