import React from 'react';
import './Switch.scss';

// Интерфейс для пропсов Switch
interface SwitchProps {
	checked?: boolean; // Начальное состояние (true/false)
	onChange?: (checked: boolean) => void; // Обработчик изменения состояния
	className?: string; // Дополнительный класс для стилизации
}

const Switch: React.FC<SwitchProps> = ({ checked = false, onChange, className }) => {
	const [isChecked, setIsChecked] = React.useState(checked);

	// Обработчик изменения состояния
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newChecked = event.target.checked;
		setIsChecked(newChecked);
		if (onChange) {
			onChange(newChecked);
		}
	};

	// Базовый класс для элемента
	const baseClassName = `switch ${className || ''}`.trim();

	return (
		<label className={baseClassName}>
			<input
				type="checkbox"
				checked={isChecked}
				onChange={handleChange}
				className="switch__input"
			/>
			<span className="switch__slider"></span>
		</label>
	);
};

export default Switch;