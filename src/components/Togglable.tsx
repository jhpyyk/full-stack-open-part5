import { ReactNode, useImperativeHandle, useState, forwardRef } from "react";

interface TogglableProps {
    buttonText: string;
    children: ReactNode;
}

export interface ToggleVisibleHandle {
    toggleVisible: () => void;
}

const Togglable = (
    props: TogglableProps,
    ref: React.ForwardedRef<ToggleVisibleHandle>
) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const toggleVisible = () => {
        setIsVisible(!isVisible);
    };

    useImperativeHandle(ref, () => {
        return {
            toggleVisible,
        };
    });
    return (
        <>
            {
                <button onClick={toggleVisible}>
                    {isVisible ? "hide blog creator" : props.buttonText}
                </button>
            }
            {isVisible && props.children}
        </>
    );
};

export default forwardRef(Togglable);
