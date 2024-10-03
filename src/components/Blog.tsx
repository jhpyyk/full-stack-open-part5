import { useState } from "react";
import { BlogType } from "../types";

interface BlogProps {
    blog: BlogType;
    handleLike: (blog: BlogType) => void;
    handleRemoveBlog: (blog: BlogType) => void;
    showRemove: boolean;
    showLikeButton: boolean;
}

const Blog = ({
    blog,
    handleLike,
    handleRemoveBlog,
    showRemove,
    showLikeButton,
}: BlogProps) => {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <ul
            style={{
                listStyleType: "none",
                paddingLeft: 10,
                marginBottom: 25,
                marginTop: 0,
                borderStyle: "dashed",
                borderWidth: 1,
            }}
        >
            <li>
                <b>
                    <i>{blog.title}</i>
                    <button
                        style={{ marginLeft: 20 }}
                        onClick={() => setIsVisible(!isVisible)}
                    >
                        {isVisible ? "hide" : "show"}
                    </button>
                </b>
            </li>
            {isVisible && (
                <div>
                    <li>
                        <b>{blog.author}</b>
                    </li>
                    <li>{blog.url}</li>
                    <li>
                        likes: {blog.likes?.toString()}{" "}
                        {showLikeButton && (
                            <button
                                style={{ marginLeft: 20 }}
                                onClick={() => handleLike(blog)}
                            >
                                like
                            </button>
                        )}
                    </li>

                    <li>From user: {blog.user.name}</li>
                    {showRemove && (
                        <li>
                            <button onClick={() => handleRemoveBlog(blog)}>
                                remove
                            </button>
                        </li>
                    )}
                </div>
            )}
        </ul>
    );
};

export default Blog;
