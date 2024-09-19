import { useState, useEffect } from "react";
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

const App = () => {
    const [blogs, setBlogs] = useState<BlogType[]>([]);
    const [user, setUser] = useState<AuthorizedUser | undefined>(undefined);
    const [notificationText, setNotificationText] = useState<string>("");
    const [notificationColor, setNotificationColor] =
        useState<NotificationColors>("lightgreen");

    const [timeoutID, setTimeoutID] = useState<number>(0);

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
                <div>
                    <CreateBlog
                        token={user.token}
                        fetchBlogs={fetchBlogs}
                        displayNotification={displayNotification}
                    />
                </div>
            )}
            <h2>Blogs</h2>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default App;
