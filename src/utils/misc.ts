import { AxiosRequestConfig } from "axios";

export const getAuthorizationConfig = (token: string): AxiosRequestConfig => {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return config;
};
