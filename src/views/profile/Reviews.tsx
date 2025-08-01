// HomePage.tsx
import React, {useContext, useEffect} from 'react';
import "./Reviews.scss";
import { ReactSVG } from "react-svg";
import Star from "@/assets/icons/star.svg";
import ReviewImage from "@/assets/images/reviews/image.jpg";
import { Button } from "react-bootstrap";
import {HeaderContext} from "@/provider/headerContext.tsx";
import ReviewCard, {Review} from "@/components/ui/cards/reviewCard/ReviewCard.tsx";

interface IndexPageProps {
    updateHeader?: (newTitle: string, showBack: boolean) => void;
}

const Reviews: React.FC<IndexPageProps> = ({ updateHeader }) => {
    const context = useContext(HeaderContext);

    // Проверяем, что контекст существует
    if (!context) {
        throw new Error("HeaderContext must be provided");
    }

    const { setHeaderTitle, setShowBackButton } = context;

    useEffect(() => {
        setHeaderTitle("Отзывы исполнителей");
        setShowBackButton(true);
    }, [setHeaderTitle, setShowBackButton]);

    useEffect(() => {
        if (updateHeader) {
            updateHeader("Отзывы исполнителей", true);
        }
    }, [updateHeader]);

    const reviews: Review[] = [
        {
            date: "01.01.25",
            name: "Серик Ахметов",
            rate: 3,
            category: ["Автобетоносмеситель", "Автопогрузчик"],
            description: "Все было как и договаривались",
            img: Array(6).fill(ReviewImage), // 6 одинаковых изображений
        },
        {
            date: "02.02.25",
            name: "Алексей Иванов",
            rate: 4,
            category: ["Экскаватор", "Бульдозер"],
            description: "Работа выполнена качественно и в срок",
            img: Array(4).fill(ReviewImage), // 4 одинаковых изображения
        },
    ];

    return (
        <div className="reviews page">
            <div className="reviews__list">
                {reviews.map((review, index) => (
                    <ReviewCard key={index} {...review} />
                ))}
            </div>
            <Button variant="info" className="profile__button profile__button--change-type">
                Все 123 отзыва
            </Button>
        </div>
    );
};

export default Reviews;