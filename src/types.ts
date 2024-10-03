export type BlogType = {
    id: string;
    title: string;
    author: string;
    url: string;
    likes?: number;
};

export type NewBlog = Omit<BlogType, "id" | "likes">;

export type LoginInfo = {
    username: string;
    password: string;
};

export type AuthorizedUser = {
    username: string;
    name: string;
    token: string;
};
