import { useState } from "react";
import { ToggleVisibleHandle } from "../Togglable/Togglable";

interface CreateBlogProps {
    handleSubmit: (title: string, author: string, url: string) => void;
    fetchBlogs: () => void;
    displayNotification: (text: string, isSuccesful: boolean) => void;
    togglableRef: React.RefObject<ToggleVisibleHandle>;
}

const CreateBlog = (props: CreateBlogProps) => {
    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [URL, setURL] = useState<string>("");

    return (
        <div>
            <h2>New blog</h2>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    props.handleSubmit(title, author, URL);
                }}
            >
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
