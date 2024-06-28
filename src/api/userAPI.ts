import {instance} from "./api";
import {UserType} from "../types/types";

type GetUsersType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}
export const userAPI = {
    getUsers(currentPage = 1, pageSize = 5) {
        return instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                //debugger;
                return response.data;
            });
    }
}