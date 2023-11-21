import { atom, selector } from 'recoil';

//存储用户登录状态
export const isLoginState = atom({
    key:'isloginState',
    default:false
})
