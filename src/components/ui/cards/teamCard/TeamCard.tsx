import React from "react";
import DefaultPhoto from "@/assets/images/userDefault.png";
import './TeamCard.scss';
import {Form} from "react-bootstrap";

export type TeamCardProps = {
    job: string;
    name: string;
    phone: string;
    photo?: string;
    showCheckbox?: boolean; // Флаг для отображения чекбокса
    isChecked?: boolean; // Флаг для состояния чекбокса
    onCheckboxChange?: () => void; // Обработчик изменения чекбокса
};

const TeamCard: React.FC<TeamCardProps> = ({
                                               job,
                                               name,
                                               phone,
                                               photo = DefaultPhoto,
                                               showCheckbox = false,
                                               isChecked = false,
                                               onCheckboxChange,
                                           }) => {
    return (
        <div className="team-card">
            <img src={photo} alt="Фотография специалиста" className="team-card__photo" />
            <div className="team-card__info">
                <div className="team-card__job">{job}</div>
                <div className="team-card__name">{name}</div>
                <div className="team-card__phone">{phone}</div>
            </div>
            {showCheckbox && (
                <Form.Check
                    reverse
                    type="checkbox"
                    checked={isChecked}
                    onChange={onCheckboxChange}
                    className="team-card__checkbox"
                />
            )}
        </div>
    );
};

export default TeamCard;