// ProfileLayout.tsx
import React, { useContext } from 'react';
import { ReactSVG } from 'react-svg';
import TabHome from '@/assets/icons/tabHome.svg';
import TabVacancies from '@/assets/icons/tabVacancies.svg';
import TabOrders from '@/assets/icons/tabOrders.svg';
import TabProfile from '@/assets/icons/tabProfile.svg';
import BackArrow from "@/assets/icons/arrow-left.svg";
import { useNavigate } from 'react-router-dom';
import { HeaderContext } from '@/provider/headerContext.tsx';

const ProfileLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const context = useContext(HeaderContext);

    // Проверяем, что контекст существует
    if (!context) {
        throw new Error('HeaderContext must be provided');
    }

    const { headerTitle, showBackButton } = context;

    return (
        <div className="layout">
            {/* Header */}
            <header className="layout__header">
                {showBackButton && (
                    <button className="layout__back-button" onClick={() => navigate(-1)}>
                        <img src={BackArrow} className="layout__back-button-image" alt="Назад" width={15} height={15} />
                    </button>
                )}
                <h1 className="layout__title">{headerTitle}</h1>
            </header>

            {/* Main Content */}
            <main className="layout__content">{children}</main>

            {/* Bottom Tabs (Navigation) */}
            <nav className="layout__tabs">
                <div className="tabs">
                    <button className="tabs__item"
                            onClick={()=>{navigate('/app/')}}
                    >
                        <ReactSVG src={TabHome} className="tabs__icon" />
                        <span className="tabs__label">Поиск</span>
                    </button>
                    <button className="tabs__item"
                            onClick={()=>{navigate('/app/zakazy')}}
                    >
                        <ReactSVG src={TabOrders} className="tabs__icon" />
                        <span className="tabs__label">Заказы</span>
                    </button>
                    <button className="tabs__item"
                            onClick={()=>{navigate('/app/vacancy')}}
                    >
                        <ReactSVG src={TabVacancies} className="tabs__icon" />
                        <span className="tabs__label">Вакансии</span>
                    </button>
                    <button className="tabs__item tabs__item--active"
                            onClick={()=>{navigate('/app/profile')}}
                    >
                        <ReactSVG src={TabProfile} className="tabs__icon" />
                        <span className="tabs__label">Профиль</span>
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default ProfileLayout;