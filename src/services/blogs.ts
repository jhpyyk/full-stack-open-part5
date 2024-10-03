import axios from "axios";
import { BlogType, NewBlog } from "../types";
import { getAuthorizationConfig } from "../utils/misc";
const baseUrl = "/api/blogs";

const getAll = async (): Promise<BlogType[]> => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const create = async (newBlog: NewBlog, token: string): Promise<BlogType> => {
    const config = getAuthorizationConfig(token);
    const response = await axios.post(baseUrl, newBlog, config);
    return response.data;
};

const patch = async (
    id: string,
    blogFields: Partial<BlogType>,
    token: string
) => {
    const config = getAuthorizationConfig(token);
    const response = await axios.patch(`${baseUrl}/${id}`, blogFields, config);
    return response.data;
};

const remove = async (id: string, token: string) => {
    const config = getAuthorizationConfig(token);
    const removedBlog = await axios.delete(`${baseUrl}/${id}`, config);
    return removedBlog;
};

export default { getAll, create, patch, remove };
