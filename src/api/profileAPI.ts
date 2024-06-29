import {PhotosType, ProfileType} from "../types/types";
import {instance, APIResponseType} from "./api";

type UpdateUserProfilePhotoDataType = {
        photos: PhotosType
}
export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`).then(response => {
            return response.data
        });
    },

    getUserStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(response => {
            return response.data
        });
    },

    updateUserStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status`, {status: status}).then(response => {
            return response.data
        });
    },

    updateUserProfilePhoto(file: File) {
        const formData = new FormData();
        formData.append("image", file);

        return instance.put<APIResponseType<UpdateUserProfilePhotoDataType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            return response.data
        });
    },

    saveProfileInfo(profileData: ProfileType) {
        return instance.put<APIResponseType>(`profile`, profileData).then(response => {
            return response.data
        });
    }
}