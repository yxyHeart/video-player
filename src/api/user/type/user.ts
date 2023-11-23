

export interface GetUserLoginRequestData{
    username:string
    password:string
}

export interface GetUserRegisterData{
    username:string
    password:string
}

export interface GetUserUpdateData{
    data:FormData
}

export interface GetUserCheckFileData{
    userId:string
    md5:string
}
export type GetUserLoginResponseData = ApiResponseData<{username:string,avatar:string,token:string}>

export type GetUserCheckFileResponseData = ApiResponseData<{path:string}>