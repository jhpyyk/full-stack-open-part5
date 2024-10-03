import { AxiosRequestConfig } from "axios";
import { BlogType } from "../types";

export const getAuthorizationConfig = (token: string): AxiosRequestConfig => {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return config;
};

export const sortBlogs = (blogs: BlogType[]): BlogType[] => {
    const blogsWithLikes = blogs.filter((blog) => {
        return blog.likes !== undefined;
    });
    const blogsWithNoLikes = blogs.filter((blog) => {
        return blog.likes === undefined;
    });

    const withLikesSorted = blogsWithLikes.sort((a, b) => a.likes! - b.likes!);

    const allSorted = [...withLikesSorted, ...blogsWithNoLikes];
    const reversed = allSorted.reverse();

    return reversed;
};
