import { SetStateAction } from "react";
import { AuthorizedUser } from "../types";
import { removeUserLS } from "../utils/localstorage";

interface LogoutButtonProps {
    setUser: React.Dispatch<SetStateAction<AuthorizedUser | undefined>>;
}

const LogoutButton = ({ setUser }: LogoutButtonProps) => {
    const handleLogout = () => {
        setUser(undefined);
        removeUserLS();
    };
    return <button onClick={handleLogout}>logout</button>;
};

export default LogoutButton;
