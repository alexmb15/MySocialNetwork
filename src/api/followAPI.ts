import {instance, APIResponseType} from "./api";

export const followAPI = {
    follow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`)
            .then(response => {
                return response.data;
            });
    },

    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
            .then(response => {
                return response.data;
            }) as Promise<APIResponseType>
    }
}