import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import './codeInput.scss';

interface CodeInputProps {
    onCodeComplete: (code: string) => void; // Коллбэк для проверки кода
    isInvalid: boolean; // Флаг ошибки
}

const CodeInput: React.FC<CodeInputProps> = ({ onCodeComplete, isInvalid }) => {
    const [code, setCode] = useState<string[]>(['', '', '', '']); // Массив для хранения символов кода

    const handleInputChange = (index: number, value: string) => {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Автоматический переход к следующему полю
        if (value.length === 1 && index < code.length - 1) {
            const nextInput = document.getElementById(`input-${index + 1}`);
            if (nextInput) {
                nextInput.focus();
            }
        }

        // Проверяем, заполнены ли все поля
        if (newCode.every((digit) => digit !== '')) {
            onCodeComplete(newCode.join('')); // Передаем полный код
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && code[index] === '') {
            // Если нажата Backspace и текущее поле пустое
            if (index > 0) {
                const prevInput = document.getElementById(`input-${index - 1}`);
                if (prevInput) {
                    prevInput.focus(); // Перемещаем фокус на предыдущее поле
                }
            }
        }
    };

    return (
        <div className={`code-input ${isInvalid ? 'code-input--invalid' : ''}`}>
            {code.map((digit, index) => (
                <Form.Control
                    key={index}
                    id={`input-${index}`}
                    type="text"
                    maxLength={1} // Разрешаем только один символ в каждом поле
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e as React.KeyboardEvent<HTMLInputElement>)} // Обработка нажатия клавиш
                />
            ))}
        </div>
    );
};

export default CodeInput;