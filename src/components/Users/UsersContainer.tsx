import React from "react";
import Users from "./Users";
import {useSelector} from "react-redux";
import {getIsFetching} from "../../Redux/Selectors/user-selectors";
import Preloader from "../common/Preloader/Preloader";


type UsersPropsType = {}

export const UsersContainer: React.FC<UsersPropsType> = () => {
    const isFetching = useSelector(getIsFetching)
    return <>
        {isFetching ? <Preloader/> : null}
        <Users/>
    </>

}

