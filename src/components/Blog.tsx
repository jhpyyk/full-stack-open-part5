import { useState } from "react";
import { BlogType } from "../types";

interface BlogProps {
    blog: BlogType;
}

const Blog = ({ blog }: BlogProps) => {
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
                    <li>{blog.likes?.toString()}</li>
                </div>
            )}
        </ul>
    );
};

export default Blog;
