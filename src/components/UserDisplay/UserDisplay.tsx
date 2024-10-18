import { AuthorizedUser } from "../../types";

interface UserDisplayProps {
    user: AuthorizedUser;
}

const UserDisplay = ({ user }: UserDisplayProps) => {
    return (
        <div>
            <h3>Logged in as {user.name}</h3>
        </div>
    );
};

export default UserDisplay;
