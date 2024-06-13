import axios from "axios";

let instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "690d6030-405b-47b2-9288-4542d8f1d46d"
    }
});

export const userAPI = {
    getUsers(currentPage = 1, pageSize = 5) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                //debugger;
                return response.data;
            });
    }
}

export  const authAPI = {
    isAuth() {
        return instance.get(`auth/me`).then(response => {return response.data});
    },

    logIn(email, password, rememberMe = false, captcha) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha});
    },

    logOut() {
        return instance.delete(`auth/login`).then(response => { return response.data});
    }
}

export const securityAPI = {
    getCaptcha() {
        return instance.get(`security/get-captcha-url`).then(response => { return response.data});
    }
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`).then(response => { return response.data});
    },

    getUserStatus(userId) {
        return instance.get(`profile/status/${userId}`).then(response => { return response.data});
    },

    updateUserStatus(status) {
        return instance.put(`profile/status`, {status: status}).then(response => { return response.data});
    },

    updateUserProfilePhoto(file) {
        const formData = new FormData();
        formData.append("image", file);

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => { return response.data});
    },

    saveProfileInfo(profileData) {
        return instance.put(`profile`, profileData).then(response => { return response.data});
    }
}

export const followAPI = {
    follow(userId) {
        return instance.post(`follow/${userId}`)
            .then(response => {
                return response.data;
            });
    },

    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
            .then(response => {
                return response.data;
            })
    }
}

