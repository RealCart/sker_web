// UInput.tsx
import React, { useRef } from "react";
import MaskedInput from "react-text-mask"; // Для масок ввода
import "./UInput.scss";

interface UInputProps {
	containerStyles?: string;
	icon?: React.ReactNode;
	type: "phone" | "input" | "textarea" | "search" | "numeral";
	placeholder?: string;
	onlyNumber?: boolean;
	value?: string;
	setValue?: (val: string) => void;
	defaultValue?: string;
	onFocus?: () => void;
}

const UInput: React.FC<UInputProps> = ({
										   containerStyles,
										   icon,
										   type,
										   value,
										   setValue,
										   placeholder,
										   onlyNumber,
										   defaultValue,
										   onFocus,
									   }) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const renderInput = () => {
		switch (type) {
			case "phone":
				return (
					<div className={`u-input ${containerStyles}`}>
						<MaskedInput
							inputRef={(ref) => {
								if (ref) {
									inputRef.current = ref;
								}
							}}
							mask={[
								"+",
								"7",
								" ",
								"(",
								/\d/,
								/\d/,
								/\d/,
								")",
								" ",
								/\d/,
								/\d/,
								/\d/,
								"-",
								/\d/,
								/\d/,
								"-",
								/\d/,
								/\d/,
							]}
							placeholder="+7 (___) ___-__-__"
							value={value}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue?.(e.target.value)}
							onFocus={onFocus}
							className="u-input__field"
						/>
						{icon && <div className="u-input__icon">{icon}</div>}
					</div>
				);

			case "textarea":
				return (
					<div className={`u-input u-input--textarea ${containerStyles}`}>
						<textarea
							ref={textareaRef}
							value={value}
							onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setValue?.(e.target.value)}
							onFocus={onFocus}
							placeholder={placeholder}
							className="u-input__field"
						/>
						{icon && <div className="u-input__icon">{icon}</div>}
					</div>
				);

			case "search":
				return (
					<div className={`u-input u-input--search ${containerStyles}`}>
						<input
							ref={inputRef}
							type="text"
							value={value}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue?.(e.target.value)}
							onFocus={onFocus}
							placeholder={placeholder}
							className="u-input__field"
						/>
						{icon && <div className="u-input__icon">{icon}</div>}
					</div>
				);

			case "numeral":
				const numberMask = (value: string) => {
					const cleanValue = value.replace(/\D/g, ""); // Убираем все нечисловые символы
					const maxLength = 13; // Максимальная длина
					const limitedValue = cleanValue.slice(0, maxLength); // Ограничиваем длину

					// Применяем форматирование: пробел каждые 3 символа с конца
					const reversedValue = limitedValue.split("").reverse().join("");
					const formattedValue = reversedValue.replace(/(\d{3})/g, "$1 ").trim();
					return formattedValue.split("").reverse().join("");
				};

				return (
					<div className={`u-input ${containerStyles}`}>
						<input
							ref={inputRef}
							type="text"
							value={numberMask(value || "")}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue?.(e.target.value.replace(/\D/g, ""))}
							onFocus={onFocus}
							placeholder={placeholder}
							className="u-input__field"
						/>
						{icon && <div className="u-input__icon">{icon}</div>}
					</div>
				);

			case "input":
			default:
				return (
					<div className={`u-input ${containerStyles}`}>
						{value && value !== "" && (
							<label className="u-input__label">{placeholder}</label>
						)}
						<input
							ref={inputRef}
							type={onlyNumber ? "number" : "text"}
							value={value}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue?.(e.target.value)}
							onFocus={onFocus}
							placeholder={placeholder}
							className="u-input__field"
						/>
						{icon && <div className="u-input__icon">{icon}</div>}
					</div>
				);
		}
	};

	return renderInput();
};

export default UInput;