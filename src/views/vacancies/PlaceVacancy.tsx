import React, { useEffect, useState } from 'react';
import { useHeader } from '@/provider/headerContext';
import './PlaceVacancy.scss';
import PlacementCard from "@/components/ui/cards/PlacementCard.tsx";
import { Button } from "react-bootstrap";

const PlaceVacancy: React.FC = () => {
    const { setHeaderTitle, setShowBackButton } = useHeader();

    // Установка заголовка и кнопки "Назад"
    useEffect(() => {
        setHeaderTitle('Разместить вакансию');
        setShowBackButton(true);
    }, [setHeaderTitle, setShowBackButton]);

    // Состояния для выбранных карточек
    const [selectedCards, setSelectedCards] = useState<string[]>([]);

    // Цены за каждую карточку
    const cardPrices = {
        placement: 1500, // Цена за размещение вакансии
        newsletter: 2500, // Цена за рассылку
    };

    // Вычисление общей цены
    const totalPrice = selectedCards.reduce((total, card) => {
        return total + (cardPrices[card as keyof typeof cardPrices] || 0);
    }, 0);

    // Проверка, активна ли кнопка "Перейти к оплате"
    const isPayButtonDisabled = !selectedCards.includes('placement');

    // Обработчик выбора карточки
    const handleCardSelect = (cardType: string) => {
        setSelectedCards((prev) => {
            if (prev.includes(cardType)) {
                // Если карточка уже выбрана, удаляем её
                return prev.filter((item) => item !== cardType);
            } else {
                // Если карточка не выбрана, добавляем её
                return [...prev, cardType];
            }
        });
    };

    return (
        <div className="place-vacancy page">
            <div className="place-vacancy__cards">
                {/* Карточка размещения вакансии */}
                <PlacementCard
                    title="Разместить вакансию"
                    text="Вакансия будет размещена на 14 дней"
                    price="1 500"
                    isChecked={selectedCards.includes('placement')}
                    onCardClick={() => handleCardSelect('placement')}
                />

                {/* Карточка рассылки */}
                <PlacementCard
                    title="Рассылка"
                    text="Ваше объявление увидят +30 000 пользователей подписанных на новостную рассылку"
                    price="2 500"
                    isChecked={selectedCards.includes('newsletter')}
                    onCardClick={() => handleCardSelect('newsletter')}
                />
            </div>
            <div className="place-vacancy__bottom">
                <div className="place-vacancy__row">
                    Итого к оплате
                    <span>{totalPrice.toLocaleString()} ₸</span>
                </div>
                <Button disabled={isPayButtonDisabled}>Перейти к оплате</Button>
            </div>
        </div>
    );
};

export default PlaceVacancy;