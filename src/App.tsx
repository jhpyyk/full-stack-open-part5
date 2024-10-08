import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import { AuthorizedUser, BlogType } from "./types";
import Login from "./components/Login";
import { getUserLS } from "./utils/localstorage";
import UserDisplay from "./components/UserDisplay";
import LogoutButton from "./components/LogoutButton";
import CreateBlog from "./components/CreateBlog";
import NotificationBox, {
    NotificationColors,
} from "./components/NotificationBox/NotificationBox";
import Togglable, { ToggleVisibleHandle } from "./components/Togglable";
import { sortBlogs } from "./utils/misc";

const App = () => {
    const [blogs, setBlogs] = useState<BlogType[]>([]);
    const [user, setUser] = useState<AuthorizedUser | undefined>(undefined);
    const [notificationText, setNotificationText] = useState<string>("");
    const [notificationColor, setNotificationColor] =
        useState<NotificationColors>("lightgreen");
    const [timeoutID, setTimeoutID] = useState<number>(0);
    const togglableRef = useRef<ToggleVisibleHandle>(null);

    const displayNotification = (text: string, isSuccesful: boolean) => {
        setNotificationText(text);
        if (isSuccesful) {
            setNotificationColor("lightgreen");
        } else {
            setNotificationColor("red");
        }
        clearTimeout(timeoutID);
        setTimeoutID(
            setTimeout(() => {
                setNotificationText("");
            }, 5000)
        );
    };

    const fetchBlogs = async () => {
        console.log("fetching blogs");
        const blogs = await blogService.getAll();
        setBlogs(blogs);
    };

    const handleLike = async (blog: BlogType) => {
        console.log(blog);
        if (blog.likes !== undefined) {
            let newLikes = blog.likes + 1;
            await blogService.patch(blog.id, { likes: newLikes }, user!.token);
        } else {
            console.log("blog has no like field");
        }
        await fetchBlogs();
    };

    const handleRemoveBlog = async (blog: BlogType) => {
        if (window.confirm(`Removing blog ${blog.title}`)) {
            await blogService.remove(blog.id, user!.token);
            console.log("removed blog", blog.title);
            await fetchBlogs();
        }
    };

    useEffect(() => {
        const existingUser = getUserLS();
        if (existingUser) {
            setUser(existingUser);
            console.log("using user from local storage");
        }
    }, []);

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div>
            {!user && (
                <Login
                    setUser={setUser}
                    displayNotification={displayNotification}
                />
            )}

            {user && (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                    }}
                >
                    <UserDisplay user={user} />
                    <LogoutButton
                        setUser={setUser}
                        displayNotification={displayNotification}
                    />
                </div>
            )}
            {notificationText.length > 0 && (
                <NotificationBox
                    text={notificationText}
                    color={notificationColor}
                />
            )}
            {user && (
                <Togglable buttonText="new blog" ref={togglableRef}>
                    <CreateBlog
                        token={user.token}
                        fetchBlogs={fetchBlogs}
                        displayNotification={displayNotification}
                        togglableRef={togglableRef}
                    />
                </Togglable>
            )}
            <h2>Blogs</h2>
            {sortBlogs(blogs).map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    handleLike={handleLike}
                    handleRemoveBlog={handleRemoveBlog}
                    showRemove={blog.user.id === user?.id}
                    showLikeButton={user !== undefined}
                />
            ))}
        </div>
    );
};

export default App;
