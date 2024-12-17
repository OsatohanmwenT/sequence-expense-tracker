import {ProfileFormValues} from "@/lib/schemas";
import {getSession} from "@/lib/auth/session";

const url = process.env.NEXT_PUBLIC_API_URL;

export const updateUserProfile = async (data: ProfileFormValues) => {
    const session = await getSession();
    try{
        const response = await fetch(`${url}/profile/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.access_token}`
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Update failed');
        }



    } catch (error: any) {
        throw(error);
    }
}

export const deleteUserAccount = async () => {
    const session = await getSession();
    try{
        const response = await fetch(`${url}/auth/account`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.access_token}`
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Update failed');
        }

    } catch (error: any) {
        throw(error);
    }
}