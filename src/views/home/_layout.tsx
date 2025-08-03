// Layout.tsx
import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import TabHome from '@/assets/icons/tabHome.svg';
import TabVacancies from '@/assets/icons/tabVacancies.svg';
import TabOrders from '@/assets/icons/tabOrders.svg';
import TabProfile from '@/assets/icons/tabProfile.svg';
import { useNavigate } from 'react-router-dom';
import BackArrow from "@/assets/icons/arrow-left.svg";

interface LayoutProps {
    children: React.ReactNode; // Контент, который будет вставлен в центр
    initialHeaderTitle?: string; // Начальный заголовок
}

interface WithUpdateHeader {
    updateHeader?: (newTitle: string, showBack: boolean) => void;
}

const HomeLayout: React.FC<LayoutProps> = ({ children, initialHeaderTitle = "Header" }) => {
    const [headerTitle, setHeaderTitle] = useState<string>(initialHeaderTitle);
    const [showBackButton, setShowBackButton] = useState<boolean>(false);
    const navigate = useNavigate();

    // Функция для обновления заголовка и состояния кнопки "Назад"
    const updateHeader = (newTitle: string, showBack: boolean) => {
        setHeaderTitle(newTitle);
        setShowBackButton(showBack);
    };

    return (
        <div className="layout">
            {/* Header */}
            <header className="layout__header">
                {showBackButton && (
                    <button className="layout__back-button" onClick={() => navigate(-1)}>
                        <img src={BackArrow} className="layout__back-button-image" width={15} height={15}/>
                    </button>
                )}
                <h1 className="layout__title">{headerTitle}</h1>
            </header>

            {/* Main Content */}
            <main className="layout__content">
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child) && typeof child.type === "function") {
                        // Приводим типы к компонентам, принимающим updateHeader
                        const typedChild = child as React.ReactElement<WithUpdateHeader>;
                        return React.cloneElement(typedChild, { updateHeader });
                    }
                    return child;
                })}
            </main>

            {/* Bottom Tabs (Navigation) */}
            <nav className="layout__tabs">
                <div className="tabs">
                    <button className="tabs__item tabs__item--active"
                            onClick={() => {
                                navigate('/')
                            }}
                    >
                        <ReactSVG src={TabHome} className="tabs__icon"/>
                        <span className="tabs__label">Поиск</span>
                    </button>
                    <button className="tabs__item"
                            onClick={() => {
                                navigate('/zakazy')
                            }}
                    >
                        <ReactSVG src={TabOrders} className="tabs__icon"/>
                        <span className="tabs__label">Заказы</span>
                    </button>
                    <button className="tabs__item"
                            onClick={() => {
                                navigate('/vacancy')
                            }}
                    >
                        <ReactSVG src={TabVacancies} className="tabs__icon"/>
                        <span className="tabs__label">Вакансии</span>
                    </button>
                    <button className="tabs__item"
                            onClick={() => {
                                navigate('/profile')
                            }}
                    >
                        <ReactSVG src={TabProfile} className="tabs__icon"/>
                        <span className="tabs__label">Профиль</span>
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default HomeLayout;