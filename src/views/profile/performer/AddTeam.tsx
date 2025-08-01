import React, { useEffect, useContext, useState } from "react";
import { HeaderContext } from "@/provider/headerContext.tsx";
import { Button, Form } from "react-bootstrap";
import { format, useMask } from "@react-input/mask";
import './AddTeam.scss';
import TeamCard, { TeamCardProps } from "@/components/ui/cards/teamCard/TeamCard.tsx";

const ProfileAddTeam: React.FC = () => {
    const context = useContext(HeaderContext);

    // Проверяем, что контекст существует
    if (!context) {
        throw new Error("HeaderContext must be provided");
    }

    const { setHeaderTitle, setShowBackButton } = context;

    useEffect(() => {
        setHeaderTitle("Добавить оператора");
        setShowBackButton(true);
    }, [setHeaderTitle, setShowBackButton]);

    const [validated, setValidated] = useState(false); // Флаг проверки валидации
    const [value, setValue] = useState(''); // Состояние для номера телефона
    const [message, setMessage] = useState('Указывая номер оператора вы подтверждаете что являетесь собственником техники');
    const [isFound, setIsFound] = useState(false); // Флаг успешного поиска
    const [foundOperator, setFoundOperator] = useState<TeamCardProps | null>(null); // Найденный оператор

    // Имитация поиска оператора
    const searchOperator = async (phone: string): Promise<TeamCardProps | null> => {
        const mockData: TeamCardProps[] = [
            { job: "Специалист", name: "Иван Иванов", phone: "+71111111111" },
            { job: "Техник", name: "Петр Петров", phone: "+72222222222" },
        ];

        return new Promise((resolve) => {
            setTimeout(() => {
                const found = mockData.find((operator) => operator.phone === phone);
                resolve(found || null);
            }, 500); // Задержка для имитации запроса
        });
    };

    const handleSubmit = async () => {
        // Если длина введенного номера меньше 9, не меняем текст и не выполняем поиск
        if (value.replace(/[\s()]/g, '').length < 9) {
            setValidated(true);
            setMessage("Проверьте номер телефона, по указанному номеру ОПЕРАТОР не найден");
            return;
        }

        // Форматируем номер телефона
        const phoneNumber = `+7${value.replace(/[\s()]/g, '')}`;
        const result = await searchOperator(phoneNumber);

        if (result) {
            setIsFound(true);
            setFoundOperator(result); // Сохраняем найденного оператора
            setMessage("По вашему запросу найден оператор");
        } else {
            setIsFound(false);
            setFoundOperator(null); // Очищаем найденного оператора
            setMessage("Проверьте номер телефона, по указанному номеру ОПЕРАТОР не найден");
            setValidated(true); // Устанавливаем флаг ошибки
        }
    };

    return (
        <div className="add-team page">
            <div className="add-team__search">
                <div className="add-team__text">{message}</div>
                <Form noValidate validated={validated} onSubmit={(e) => e.preventDefault()} id="authForm">
                    <Form.Group className="add-team__input form-tel">
                        <Form.Control
                            ref={useMask({
                                mask: '(____) ______',
                                replacement: { _: /\d/ },
                            })}
                            type="tel"
                            className={`form-tel ${validated && !isFound ? 'is-invalid' : ''} ${isFound ? 'add-team__input--success' : ''}`}
                            required
                            placeholder="(0000) 00000"
                            minLength={8} // Минимальная длина ввода
                            maxLength={14} // Максимальная длина ввода
                            pattern="^\(\d{4}\) \d{5}$" // Регулярное выражение для маски
                            value={value} // Привязываем значение к состоянию
                            onChange={(e) => {
                                setValue(e.target.value);
                                setValidated(false); // Сбрасываем флаг ошибки при изменении значения
                            }}
                        />
                    </Form.Group>
                </Form>
                <Button variant="dark" onClick={handleSubmit}>
                    Найти
                </Button>
            </div>
            {isFound && foundOperator && (
                <>
                    <div className="add-team__result">
                        <TeamCard
                            job={foundOperator.job}
                            name={foundOperator.name}
                            phone={foundOperator.phone}
                        />
                    </div>
                    <Button variant="dark" onClick={() => alert("Оператор добавлен в команду")}>
                        Добавить в мою команду
                    </Button>
                </>
            )}
        </div>
    );
};

export default ProfileAddTeam;