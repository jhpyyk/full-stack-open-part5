import "./NotificationBox.css";

export type NotificationColors = "red" | "lightgreen";

interface NotificationBoxProps {
    text: string;
    color: NotificationColors;
}

const NotificationBox = (props: NotificationBoxProps) => {
    return (
        <div className="container" style={{ borderColor: props.color }}>
            {props.text}
        </div>
    );
};

export default NotificationBox;
