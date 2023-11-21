import { request } from "@/utils/service"
import type * as User from './type/user'

export function userLoginApi(data:User.GetUserLoginRequestData){
    return request<User.GetUserLoginResponseData>({
        url: "users/login",
        method: "post",
        data
    })
}

export function userRegisterApi(data:User.GetUserRegisterData){
    return request({
        url:"users/login",
        method:"post",
        data
    })
}