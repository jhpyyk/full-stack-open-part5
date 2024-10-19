import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Blog from "./Blog";
import { BlogType, UserType } from "../../types";

describe("Blog component", () => {
    const mockHandleLike = vi.fn();
    const mockHandleRemoveBlog = vi.fn();
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
            handleLike={mockHandleLike}
            handleRemoveBlog={mockHandleRemoveBlog}
            showRemove={true}
            showLikeButton={true}
        />
    );

    beforeEach(() => {
        mockHandleLike.mockClear();
        mockHandleRemoveBlog.mockClear();
    });

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

    it("like button event handler is called two times when clicked two times", async () => {
        render(blogComponent);

        const showButton = screen.getByText("show");
        await interact.click(showButton);

        const likeButton = screen.getByText("like");

        expect(mockHandleLike.mock.calls).toHaveLength(0);

        await interact.click(likeButton);
        await interact.click(likeButton);

        expect(mockHandleLike.mock.calls).toHaveLength(2);
    });
});
