export interface UserEntity {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string
}

export interface UserResponse {
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    data: UserEntity[]
}

export interface RegisterEntity {
    id: number,
    token: string
}

export interface LoginEntity {
    token: string
}
