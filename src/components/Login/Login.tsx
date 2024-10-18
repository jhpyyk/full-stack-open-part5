import { SetStateAction, useState } from "react";
import loginService from "../../services/login";
import { AuthorizedUser } from "../../types";
import { setUserLS } from "../../utils/localstorage";

interface LoginProps {
    setUser: React.Dispatch<SetStateAction<AuthorizedUser | undefined>>;
    displayNotification: (text: string, isSuccesful: boolean) => void;
}

const Login = (props: LoginProps) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        try {
            const user = await loginService.login({ username, password });
            props.setUser(user);
            setUserLS(user);
            props.displayNotification(
                `Succesfully logged in as ${username}`,
                true
            );
        } catch (error) {
            const errorText = `Login failed: ${error as string}`;
            console.error(errorText);
            props.displayNotification(errorText, false);
        }
    };
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <p>Username</p>
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
                <p>Password</p>
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
                <div style={{ marginTop: "15px" }}>
                    <button type="submit">login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
