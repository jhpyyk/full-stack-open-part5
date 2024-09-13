import axios from "axios";
import { BlogType } from "../types";
const baseUrl = "http://localhost:3003/api/blogs";

const getAll = (): Promise<BlogType[]> => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

export default { getAll };
