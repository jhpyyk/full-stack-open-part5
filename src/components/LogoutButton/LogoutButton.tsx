import { SetStateAction } from "react";
import { AuthorizedUser } from "../../types";
import { removeUserLS } from "../../utils/localstorage";

interface LogoutButtonProps {
    setUser: React.Dispatch<SetStateAction<AuthorizedUser | undefined>>;
    displayNotification: (text: string, isSuccesful: boolean) => void;
}

const LogoutButton = ({ setUser, displayNotification }: LogoutButtonProps) => {
    const handleLogout = () => {
        displayNotification("Logged out", true);
        setUser(undefined);
        removeUserLS();
    };
    return <button onClick={handleLogout}>logout</button>;
};

export default LogoutButton;
