import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import CreateBlog from "./CreateBlog";

describe("CreateBlog component", () => {
    const mockHandleSubmit = vi.fn();
    const mockDisplayNotification = vi.fn();
    const mockFetchBlogs = vi.fn();
    const mockTogglableRef = {
        current: {
            toggleVisible: () => {},
        },
    };
    const interact = userEvent.setup();

    const createBlog = (
        <CreateBlog
            handleSubmit={mockHandleSubmit}
            fetchBlogs={mockFetchBlogs}
            displayNotification={mockDisplayNotification}
            togglableRef={mockTogglableRef}
        />
    );

    const testTitle = "test title";
    const testAuthor = "test author";
    const testUrl = "test URL";

    it("calls handleSubmit with correct arguments", async () => {
        const { container } = render(createBlog);

        const titleInput = container.querySelector("#title");
        const authorInput = container.querySelector("#author");
        const urlInput = container.querySelector("#url");
        expect(titleInput).toBeDefined();
        expect(authorInput).toBeDefined();
        expect(testUrl).toBeDefined();
        const createButton = screen.getByText("create");

        await interact.type(titleInput!, testTitle);
        await interact.type(authorInput!, testAuthor);
        await interact.type(urlInput!, testUrl);
        await interact.click(createButton);

        expect(mockHandleSubmit.mock.calls).toHaveLength(1);
        console.log(mockHandleSubmit.mock.calls);
        expect(mockHandleSubmit.mock.calls[0][0]).toBe(testTitle);
        expect(mockHandleSubmit.mock.calls[0][1]).toBe(testAuthor);
        expect(mockHandleSubmit.mock.calls[0][2]).toBe(testUrl);
    });
});
