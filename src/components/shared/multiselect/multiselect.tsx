import React, { useState, useRef } from 'react';
import { FloatingLabel, InputGroup, Form, Button } from 'react-bootstrap';
import { BottomSheet } from 'react-spring-bottom-sheet';
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

			<BottomSheet className="bottom-sheet bottom-sheet--multiselect" open={showBottomSheet} onDismiss={() => setShowBottomSheet(false)}>
				<div className="bottom-sheet__header">
					<button className="bottom-sheet__header-back" onClick={() => setShowBottomSheet(false)}>
						<img src={BackArrow} className="layout__back-button-image" width={15} height={15} />
					</button>
					<span className="bottom-sheet__header-title">{label}</span>
					{/* Кнопка "Очистить" внутри BottomSheet */}
					{selectedValues.length > 0 && (
						<button className="bottom-sheet__header-clear" onClick={handleClear}>
							Очистить
						</button>
					)}
				</div>
				<div className="bottom-sheet__body">
					{options.map((option) => (
						<Form.Check
							reverse
							key={option.value}
							type="checkbox"
							id={`option-${option.value}`}
							label={option.label}
							checked={selectedValues.includes(option.value)}
							className="multiselect__check"
							onChange={(e) => {
								if (e.target.checked) {
									setSelectedValues([...selectedValues, option.value]);
								} else {
									setSelectedValues(selectedValues.filter((val) => val !== option.value));
								}
							}}
						/>
					))}
				</div>
				<div className="bottom-sheet__footer">
					<Button variant="primary" onClick={() => setShowBottomSheet(false)} className="w-100">
						Выбор
					</Button>
				</div>
			</BottomSheet>
		</>
	);
};

export default Multiselect;