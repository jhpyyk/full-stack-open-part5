import axios from "axios";
import { AuthorizedUser, LoginInfo } from "../types";
const baseUrl = "/api/login";

const login = async (loginInfo: LoginInfo): Promise<AuthorizedUser> => {
    const response = await axios.post(baseUrl, { ...loginInfo, name: "sttt" });
    console.log(response.data);
    return response.data;
};

export default { login };
