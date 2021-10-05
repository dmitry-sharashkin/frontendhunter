import * as axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers:  {"API-KEY":"2cc3354f-01b5-4bfb-aa39-e518c7551d43"}
});

export const usersAPI = {
    getUsers (currentPage = 1,pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response=> {
                return response.data
            });
    },
    follow(userId){
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId){
        return instance.delete(`follow/${userId}`)
    },

    getProfile(userId){
        console.warn("Obsolete method. Please use profileAPI obj")
        return profileAPI.getProfile(userId)
    }
}
export const profileAPI = {

    getProfile(userId){
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId){
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status){
        return instance.put('profile/status/',{status:status})
    }
}

export const authAPI = {
    checkAuth(){
        return  instance.get(`auth/me`)
    },
}
