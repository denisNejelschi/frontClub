import React from "react";
import styles from './button.module.css'

interface ButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
                                           label,
                                           onClick,
                                           disabled = false,
                                           className = '',
                                       }) => {
    const handleClick = () => {
        onClick();
    }
    return (
        <button
            className={`${styles.btn} ${className}`}
            onClick={handleClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default Button;