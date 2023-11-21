

export interface GetUserLoginRequestData{
    username:string
    password:string
}

export interface GetUserRegisterData{
    username:string
    password:string
}

export type GetUserLoginResponseData = ApiResponseData<string>