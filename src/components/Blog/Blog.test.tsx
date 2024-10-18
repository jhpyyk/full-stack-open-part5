import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Blog from "./Blog";
import { BlogType, UserType } from "../../types";

describe("Blog component", () => {
    const mockHandler = vi.fn();
    const interact = userEvent.setup();

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
        likes: 1,
        user: user,
    };

    const blogComponent = (
        <Blog
            blog={blog}
            handleLike={mockHandler}
            handleRemoveBlog={mockHandler}
            showRemove={true}
            showLikeButton={true}
        />
    );

    it("renders title and not url and likes", () => {
        render(blogComponent);

        const title = screen.getByText(blog.title);
        const url = screen.queryByText(blog.url);
        const likes = screen.queryByText(`likes: ${blog.likes?.toString()}`);

        expect(title).toBeVisible();
        expect(url).toBeNull();
        expect(likes).toBeNull();
    });

    it("renders title, url and likes, when show button has been pressed", async () => {
        render(blogComponent);

        const title = screen.getByText(blog.title);
        const showButton = screen.getByText("show");

        await interact.click(showButton);

        const url = screen.queryByText(blog.url);
        const likes = screen.queryByText(`likes: ${blog.likes?.toString()}`);

        expect(title).toBeVisible();
        expect(url).toBeVisible();
        expect(likes).toBeVisible();
    });
});
