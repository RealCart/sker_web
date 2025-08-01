import React from "react";
import {ReactSVG} from "react-svg";
import Star from "@/assets/icons/star.svg";

export type Review = {
    date: string;
    name: string;
    rate: number;
    category: Array<string>;
    description: string;
    img: Array<string>;
}

const ReviewCard: React.FC<Review> = ({date, name, rate, category, description, img}) => {
    return (
        <div className="review-card">
            <div className="review-card__date">{date}</div>
            <div className="review-card__name">{name}</div>
            <div className="review-card__stars review-card__stars--{rating}">
                {[...Array(5)].map((_, index) => (
                    <ReactSVG
                        className={`review-card__star ${index < rate ? "review-card__star--filled" : ""}`}
                        key={index}
                        src={Star}
                    />
                ))}
            </div>
            <div className="review-card__vehicles">{category.join(", ")}</div>
            <div className="review-card__text">{description}</div>
            {img && img.length > 0 ? (
                <div className="review-card__images">
                    {img.map((item, index) => (
                        <img key={index} className="review-card__image" src={item} alt={`review-${index}`}/>
                    ))}
                </div>
            ) : null}

        </div>
    );
};

export default ReviewCard;