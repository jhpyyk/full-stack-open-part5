import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import { BlogType, UserType } from "../../types";

test("renders content", () => {
    const user: UserType = {
        username: "test username",
        name: "test name",
        id: "user1",
    };
    const blog: BlogType = {
        id: "blog1",
        title: "test title",
        author: "test author",
        url: "testurl",
        likes: 0,
        user: user,
    };

    render(
        <Blog
            blog={blog}
            handleLike={() => {}}
            handleRemoveBlog={() => {}}
            showRemove={false}
            showLikeButton={false}
        />
    );

    const title = screen.getByText(blog.title);
    const url = screen.queryByText(blog.url);
    const likes = screen.queryByText(blog.likes!.toString());
    expect(title).toBeDefined();
    expect(url).toBeNull();
    expect(likes).toBeNull();
});
