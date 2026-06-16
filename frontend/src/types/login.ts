// request
export interface LoginRequest {
    email: string;
    password: string;
}

// helper
export interface ValidateLoginFormProps {
    email: string;
    password: string
}

export interface ValidationErrors {
    email: string;
    password: string;
}