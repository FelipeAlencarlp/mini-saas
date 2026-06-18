import { api } from "@/services/api";
import { UserProps } from "@/types/user";

export async function getUser(): Promise<UserProps> {
    const response = await api.get('/users/user');
    const { sub, username, useremail } = response.data.data;
    
    return { sub, username, useremail };
}