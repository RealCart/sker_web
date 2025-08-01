import React, { useState, useRef } from 'react';
import { FloatingLabel, InputGroup, Form, Button } from 'react-bootstrap';
// import { BottomSheet } from 'react-spring-bottom-sheet';
import BackArrow from '@/assets/icons/arrow-left.svg';
import "./multiselect.scss";
import { ReactSVG } from "react-svg";

interface MultiselectProps {
	options: { value: string; label: string }[]; // Опции для выбора
	selectedValues: string[]; // Выбранные значения
	setSelectedValues: (values: string[]) => void; // Функция для обновления выбранных значений
	placeholder: string; // Placeholder для поля ввода
	label: string; // Подпись к полю ввода
}

const Multiselect: React.FC<MultiselectProps> = ({
													 options,
													 selectedValues,
													 setSelectedValues,
													 placeholder,
													 label,
												 }) => {
	const [showBottomSheet, setShowBottomSheet] = useState(false);
	const inputRef = useRef<HTMLInputElement | null>(null); // Референс для поля ввода

	// Функция для получения текста из выбранных значений
	const getSelectedLabels = () => {
		return options
			.filter((option) => selectedValues.includes(option.value))
			.map((option) => option.label)
			.join(', ');
	};

	// Функция для очистки выбранных значений
	const handleClear = () => {
		setSelectedValues([]); // Очищаем выбранные значения
		if (inputRef.current) {
			inputRef.current.blur(); // Сбрасываем фокус
		}
		setShowBottomSheet(false); // Закрываем BottomSheet
	};

	return (
		<>
			<InputGroup>
				<FloatingLabel controlId="floatingInput" label={label}>
					<Form.Control
						ref={inputRef} // Привязываем референс
						className="multiselect__input"
						type="text"
						placeholder={placeholder}
						value={selectedValues.length ? getSelectedLabels() : ''}
						readOnly
						onClick={() => setShowBottomSheet(true)}
					/>
				</FloatingLabel>
				<InputGroup.Text>
					<ReactSVG src={BackArrow} style={{ transform: 'rotate(-90deg)' }} />
				</InputGroup.Text>
			</InputGroup>

			
		</>
	);
};

export default Multiselect;