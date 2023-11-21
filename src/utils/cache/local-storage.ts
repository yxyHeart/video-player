export function getToken() {
    return localStorage.getItem('token');
}

// 设置令牌
export function setToken(token:string) {
    localStorage.setItem('token', token);
}

// 移除令牌
export function removeToken() {
    localStorage.removeItem('token');
}