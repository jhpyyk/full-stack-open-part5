export type BlogType = {
    id: string;
    title: string;
    author: string;
    url: string;
    likes?: Number;
};

export type LoginInfo = {
    username: string;
    password: string;
};

export type AuthorizedUser = {
    username: string;
    name: string;
    token: string;
};
