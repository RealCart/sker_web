import React from 'react';
import './balance.scss';
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'; // Импортируем хук

const Balance: React.FC = () => {
    const navigate = useNavigate(); // Получаем функцию для навигации

    return (
        <div className="balance">
            <div className="balance__title">
                На вашем счету
            </div>
            <div className="balance__sum">
                20 563 ₸
            </div>
            <div className="balance__buttons">
                {/* Кнопка "Пополнить счет" */}
                <Button
                    variant="secondary"
                    size="sm"
                    className="balance__button balance__button--add"
                    onClick={()=>{navigate('/profile-add-money')}} // Привязываем обработчик
                >
                    Пополнить счет
                </Button>

                {/* Кнопка "История операций" */}
                <Button
                    variant="dark"
                    size="sm"
                    className="balance__button balance__button--history"
                    onClick={()=>{navigate('/profile-transactions-history')}} // Привязываем обработчик
                >
                    История операций
                </Button>
            </div>
        </div>
    );
};

export default Balance;