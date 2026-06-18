export interface UserProps {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

export interface UsersResponseProps {
    data: UserProps[];
    meta: {
        total: number;
        page: number;
        lastPage: number;
        limit: number;
    };
}

// Request
export interface CreateUserRequestProps {
    name: string;
    email: string;
    password: string;
}

export interface UpdateUserRequestProps {
    id: number;
    name: string;
    email: string;
}
