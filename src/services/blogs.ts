import axios from "axios";
import { BlogType } from "../types";
const baseUrl = "/api/blogs";

const getAll = async (): Promise<BlogType[]> => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const create = async () => {};

export default { getAll, create };
