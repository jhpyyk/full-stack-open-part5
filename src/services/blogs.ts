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

export default { getAll, create };
