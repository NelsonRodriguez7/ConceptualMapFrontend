export interface LoginResponse {
    token: string,
    user: UserData
}

export interface LoginRequest {
    userName: string,
    password: string
}

export interface UserData {
    email: string,
    phone: string
}
