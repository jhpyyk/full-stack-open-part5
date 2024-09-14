import { AuthorizedUser } from "../types";

enum LSFields {
    user = "user",
}

export const setUserLS = (user: AuthorizedUser) => {
    window.localStorage.setItem(LSFields.user, JSON.stringify(user));
};

export const getUserLS = () => {
    const user = window.localStorage.getItem(LSFields.user);
    if (!user) {
        return undefined;
    }
    return JSON.parse(user) as AuthorizedUser;
};

export const removeUserLS = () => {
    window.localStorage.removeItem(LSFields.user);
};
