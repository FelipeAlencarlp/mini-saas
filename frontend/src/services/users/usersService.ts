import { api } from "@/services/api";
import { UserType } from "@/types/User.type";

export async function getUser(): Promise<UserType> {
    const response = await api.get('/users/user');
    const { sub, username, useremail } = response.data.data;
    
    return { sub, username, useremail };
}