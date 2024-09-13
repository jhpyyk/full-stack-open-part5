import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import { AuthorizedUser, BlogType } from "./types";
import Login from "./components/Login";

const App = () => {
    const [blogs, setBlogs] = useState<BlogType[]>([]);
    const [user, setUser] = useState<AuthorizedUser | undefined>(undefined);

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
            {!user && <Login setUser={setUser} />}
            {user && <h2>Logged in as {user.name}</h2>}
            <h2>blogs</h2>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default App;
