export type BlogType = {
    id: string;
    title: string;
    author: string;
    url: string;
    likes?: number;
    user: UserType;
};

export type NewBlog = Omit<BlogType, "id" | "likes" | "user">;

export type LoginInfo = {
    username: string;
    password: string;
};

export type AuthorizedUser = {
    username: string;
    name: string;
    id: string;
    token: string;
};

export type UserType = {
    username: string;
    name: string;
    id: string;
};
