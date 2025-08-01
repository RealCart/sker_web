import React from "react";
import {ReactSVG} from "react-svg";
import Location from "@/assets/icons/location.svg";
import Evacuation from "@/assets/icons/evacuationLocation.svg";
import Eye from "@/assets/icons/views.svg";
import People from "@/assets/icons/followed.svg";

type IOrderCard = {
    title?: string,
    description?: string,
    startedTime?: string | Date,
    images?: Array<string>,
    adress: string,
    price: number | string,
    views: number,
    followed: number,
    isEvacuate?: boolean,
    evacuateLocation?: string
    onClick?: () => void
}

const OrderCard: React.FC<IOrderCard> = (
    { title, startedTime, adress, description, images, price, views, followed, isEvacuate, evacuateLocation, onClick }
) => {
    const getTimeAgo = (date: Date | string | number) => {
        if (!date) return 'Дата неизвестна';

        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) return 'Неверная дата';

        const diffMs = Date.now() - parsedDate.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60)); // Convert to hours

        // If the difference is more than 24 hours, show days
        if (diffHours >= 24) {
            const diffDays = Math.floor(diffHours / 24);
            return `${diffDays} д. назад`;
        }

        return `${diffHours} ч. назад`;
    };

    return (
        <div className="order" onClick={onClick}>
            <div className="order__time">
                {startedTime ? getTimeAgo(startedTime as Date) : 'давно'}
            </div>
            <div className="order__title">{title}</div>
            {description && <div className="order__description">{description}</div>}

            <div className="order__location">
                <ReactSVG src={Location} className="order__location-icon reactsvg" />
                {adress}
            </div>

            {isEvacuate &&
                <div className="order__location">
                    <ReactSVG src={Evacuation} className="order__location-icon reactsvg"/>
                    {evacuateLocation}
                </div>
            }

            <div className="order__row">
                <div className="order__price">{price} ₸</div>
                <div className="order__stats">
                    <div className="order__stats-views">
                        <ReactSVG src={Eye} className="order__stats-icon reactsvg" />
                        {views}
                    </div>

                    <div className="order__stats-people">
                        <ReactSVG src={People} className="order__stats-icon reactsvg" />
                        {followed}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;