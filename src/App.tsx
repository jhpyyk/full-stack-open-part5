import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import { AuthorizedUser, BlogType } from "./types";
import Login from "./components/Login";
import { getUserLS } from "./utils/localstorage";
import UserDisplay from "./components/UserDisplay";
import LogoutButton from "./components/LogoutButton";

const App = () => {
    const [blogs, setBlogs] = useState<BlogType[]>([]);
    const [user, setUser] = useState<AuthorizedUser | undefined>(undefined);

    useEffect(() => {
        const existingUser = getUserLS();
        if (existingUser) {
            setUser(existingUser);
            console.log("using user from local storage");
        }
    }, []);

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
            {user && (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                    }}
                >
                    <UserDisplay user={user} />
                    <LogoutButton setUser={setUser} />
                </div>
            )}
            <h2>blogs</h2>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default App;
