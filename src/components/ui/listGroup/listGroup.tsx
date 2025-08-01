import React from 'react';
import { ReactSVG } from 'react-svg';
import Arrow from "@/assets/icons/arrow-right.svg";
import './listGroup.scss';
import Switch from "@/components/shared/switch/Switch.tsx";

// Интерфейс для пропсов ListGroup
interface ListGroupProps {
    children: React.ReactNode; // Дочерние элементы
    className?: string; // Дополнительный класс для стилизации
}

// Основной компонент ListGroup
const ListGroup: React.FC<ListGroupProps> & { Item: React.FC<ListItemProps> } = ({ children, className }) => {
    const baseClassName = `list ${className || ''}`.trim();
    return <div className={baseClassName}>{children}</div>;
};

// Интерфейс для пропсов ListItem
export interface ListItemProps {
    icon?: string; // Путь к иконке
    href?: string; // Ссылка для перехода
    onClick?: () => void;
    switchProps?: { // Пропсы для Switch
        checked?: boolean;
        onChange?: (checked: boolean) => void;
    };
    children: React.ReactNode; // Произвольный контент
    error?: string;
    className?: string; // Дополнительный класс для стилизации
}

// Подкомпонент ListGroup.Item
const ListItem: React.FC<ListItemProps> = ({ icon, href, onClick, switchProps, children, error, className }) => {
    const contentClassName = `list-item__content ${className || ''}`.trim();
    const renderContent = () => (
        <>
            {/* Иконка */}
            {icon && <ReactSVG src={icon} className="list-item__icon" />}
            {/* Основной контент */}
            <div className={contentClassName}>
                {children}
                {error && <span className="list-item__error">{error}</span>}
            </div>
            {/* Switch */}
            {switchProps && <Switch {...switchProps} />}
            {/* Стрелка для ссылки */}
            {href && <ReactSVG src={Arrow} className="list-item__arrow" />}
        </>
    );

    const baseClassName = `list-item ${switchProps ? 'list-item--switch' : ''}`.trim();

    // Если есть href, оборачиваем содержимое в <a>
    if (href) {
        return (
            <a href={href} className={baseClassName} onClick={onClick}>
                {renderContent()}
            </a>
        );
    }

    // Если нет href, используем <div>
    return (
        <div className={baseClassName}>
            {renderContent()}
        </div>
    );
};

ListGroup.Item = ListItem;

export default ListGroup;