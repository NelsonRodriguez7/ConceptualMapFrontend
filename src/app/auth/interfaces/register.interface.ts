export interface RegisterRequest {
    email: string,
    userName: string,
    password: string,
    phone: string
}

export interface RegisterResponse {
    userCreated: boolean;
}
