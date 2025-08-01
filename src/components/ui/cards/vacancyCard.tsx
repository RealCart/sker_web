import React from "react";
import {ReactSVG} from "react-svg";
import Location from "@/assets/icons/location.svg";
import Eye from "@/assets/icons/views.svg";
import People from "@/assets/icons/followed.svg";

export interface Vacancy {
    time?: string;
    title: string;
    location: string;
    salary: string;
    views: number;
    applicants: number;
    badgeType?: 'published' | 'archived';
}

const VacancyCard: React.FC<{ vacancy: Vacancy }> = ({ vacancy }) => (
    <div className="vacancy">
        {vacancy.time && <div className="vacancy__time">{vacancy.time}</div>}
        {vacancy.badgeType === 'published' && <div className="vacancy__badge vacancy__badge--published">Опубликовано</div>}
        {vacancy.badgeType === 'archived' && <div className="vacancy__badge vacancy__badge--archived">В архиве</div>}
        <div className="vacancy__title">{vacancy.title}</div>
        <div className="vacancy__location">
            <ReactSVG src={Location} className="vacancy__location-icon reactsvg" />
            <span>{vacancy.location}</span>
        </div>
        <div className="vacancy__row">
            <div className="vacancy__salary">{vacancy.salary}</div>
            <div className="vacancy__stats">
                <div className="vacancy__views vacancy__stat">
                    <ReactSVG src={Eye} className="vacancy__stat-icon reactsvg" />
                    {vacancy.views}
                </div>
                <div className="vacancy__people vacancy__stat">
                    <ReactSVG src={People} className="vacancy__stat-icon reactsvg" />
                    {vacancy.applicants}
                </div>
            </div>
        </div>
    </div>
);

export default VacancyCard;