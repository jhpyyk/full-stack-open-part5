import { useState } from "react";
import blogService from "../services//blogs";
import { NewBlog } from "../types";

interface CreateBlogProps {
    token: string;
    fetchBlogs: () => void;
    displayNotification: (text: string, isSuccesful: boolean) => void;
}

const CreateBlog = (props: CreateBlogProps) => {
    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [URL, setURL] = useState<string>("");

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        const newBlog: NewBlog = {
            title: title,
            author: author,
            url: URL,
        };

        const createdBlog = await blogService.create(newBlog, props.token);
        props.displayNotification(
            `Succesully added blog ${createdBlog.title}`,
            true
        );
        console.log(createdBlog);
        props.fetchBlogs();
    };

    return (
        <div>
            <h2>New blog</h2>
            <form onSubmit={handleSubmit}>
                <p>Title</p>
                <input
                    type="text"
                    value={title}
                    id="title"
                    onChange={({ target }) => setTitle(target.value)}
                />
                <p>Author</p>
                <input
                    value={author}
                    type="text"
                    id="author"
                    onChange={({ target }) => setAuthor(target.value)}
                />
                <p>URL</p>
                <input
                    value={URL}
                    type="text"
                    id="url"
                    onChange={({ target }) => setURL(target.value)}
                />
                <div style={{ marginTop: "15px" }}>
                    <button type="submit">create</button>
                </div>
            </form>
        </div>
    );
};

export default CreateBlog;
