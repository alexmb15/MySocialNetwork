import {instance} from "./api";
import {UserType} from "../types/types";

type GetUsersType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}
export const userAPI = {
    getUsers(currentPage = 1, pageSize = 5, term = "", friend: null | boolean = null) {
        return instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` +
            (friend === null ? '' : `&friend=${friend}`))
            .then(response => {
                //debugger;
                return response.data;
            });
    }
}