// HomePage.tsx
import React, {useCallback, useContext, useEffect, useState} from 'react';
import "./Reviews.scss";
import {ReactSVG} from "react-svg";
import VehicleIcon from "@/assets/icons/VehicleIcon.svg";
import {Button} from "react-bootstrap";
import {HeaderContext} from "@/provider/headerContext.tsx";
import { useRoleState } from '@/provider/roleContext';
import { useFetchReviews } from '@/api/queries/useUserQuery';
import ReviewCard from "@/components/ui/cards/reviewCard/ReviewCard.tsx";

interface IndexPageProps {
    updateHeader?: (newTitle: string, showBack: boolean) => void;
}

const MyReviews: React.FC<IndexPageProps> = () => {
    const context = useContext(HeaderContext);

    // Проверяем, что контекст существует
    if (!context) {
        throw new Error("HeaderContext must be provided");
    }

    const {setHeaderTitle, setShowBackButton} = context;

    useEffect(() => {
        setHeaderTitle("Мои отзывы");
        setShowBackButton(true);
    }, [setHeaderTitle, setShowBackButton]);

    const id = localStorage.getItem('myId');
    const { roleState } = useRoleState();

    const { data: reviews, refetch: refetchReviews } = useFetchReviews({ id: Number(id), role: roleState?.isPerformer ? 'EXECUTOR' : 'CUSTOMER' })

    return (
        <div className="reviews page">
            {reviews && reviews.length > 0 ? (
                <>
                    <div className="reviews__list">
                        {reviews.map((review) => (
                            <ReviewCard
                                key={review.id}
                                date={review.createdAt}
                                name={review.userName}
                                rate={review.rating}
                                category={review.vehicleType ? review.vehicleType.map((item) => item.name) : []}
                                description={review.description}
                                img={review.photoUrl}
                            />
                        ))}
                    </div>
                    {reviews.length > 10 ? (
                        <Button variant="info" className="profile__button profile__button--change-type">
                            Все 123 отзыва
                        </Button>
                    ) : null}
                </>
            ) : (
                <div className="reviews__placeholder">
                    <ReactSVG src={VehicleIcon} className="reviews__placeholder-icon reactsvg"/>
                    <div className="reviews__placeholder-title">Отзывы</div>
                    <div className="reviews__placeholder-text">
                        После выполнения заявок, здесь будут отображаться отзывы о вашей работе
                    </div>
                </div>
            )}

        </div>
    );
};

export default MyReviews;