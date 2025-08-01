// UButton.tsx
import React from "react";
import "./UButton.scss";

interface UButtonProps {
	icon?: React.ReactNode; // Иконка, если есть
	style?: string; // Дополнительные стили через className
	onPress?: () => void; // Обработчик нажатия
	children: React.ReactNode; // Текст или содержимое кнопки
	disable?: boolean; // Флаг для отключения кнопки
	className?: string;
}

const UButton: React.FC<UButtonProps> = ({ icon, style, onPress, children, disable, className }) => {
	return (
		<button
			onClick={onPress}
			disabled={disable}
			className={`u-button ${style} ${icon ? "u-button--with-icon" : ""} ${className || ""}`}
		>
			<span className="u-button__text">{children}</span>
			{icon && <div className="u-button__icon">{icon}</div>}
		</button>
	);
};

export default UButton;