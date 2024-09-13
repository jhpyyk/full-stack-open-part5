import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import { BlogType } from "./types";

const App = () => {
    const [blogs, setBlogs] = useState<BlogType[]>([]);

    const fetchBlogs = async () => {
        console.log("fetching blogs");
        const blogs = await blogService.getAll();
        setBlogs(blogs);
    };
    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div>
            <h2>blogs</h2>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default App;
