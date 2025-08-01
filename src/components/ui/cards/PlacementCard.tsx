import React from "react";
import "./PlacementCard.scss";
import { Form } from "react-bootstrap";

type PlacementCardProps = {
    title: string;
    text: string;
    price: string;
    isChecked: boolean; // Флаг, указывающий, выбрана ли карточка
    onCardClick: () => void; // Обработчик клика по карточке
};

const PlacementCard: React.FC<PlacementCardProps> = ({ title, text, price, isChecked, onCardClick }) => (
    <div
        className={`placement-card ${isChecked ? "placement-card--checked" : ""}`}
        onClick={onCardClick} // Добавляем обработчик клика
        role="button" // Для доступности
        tabIndex={0} // Для фокусировки
    >
        {/* Чекбокс */}
        <Form.Check
            reverse
            type="checkbox"
            className="placement-card__check"
            checked={isChecked} // Привязываем состояние чекбокса
        />
        {/* Заголовок */}
        <div className="placement-card__title">{title}</div>
        {/* Описание */}
        <div className="placement-card__text">{text}</div>
        {/* Стоимость */}
        <div className="placement-card__row">
            Стоимость
            <div className="placement-card__price">{price} ₸</div>
        </div>
    </div>
);

export default PlacementCard;