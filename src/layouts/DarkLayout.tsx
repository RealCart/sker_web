
import React, { useRef, useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import BackArrow from '@/assets/icons/arrow-left.svg';
import { useNavigate } from 'react-router-dom';
import { useHeader } from '@/provider/headerContext';
import { useTabContext } from '@/provider/TabContext';

interface BaseLayoutProps {
    children: React.ReactNode;
}

const DefaultLayout: React.FC<BaseLayoutProps> = ({ children}) => {
    const navigate = useNavigate();
    const { headerTitle, showBackButton, headerSlot, headerBottomSlot } = useHeader();
    const { tabs, activeTab } = useTabContext();

    // Ссылка на DOM-элемент шапки
    const headerRef = useRef<HTMLHeadingElement | null>(null);
    const tabsRef = useRef<HTMLHeadingElement | null>(null);

    // Состояние для хранения высоты шапки
    const [headerHeight, setHeaderHeight] = useState<number>(0);
    const [tabsHeight, setTabsHeight] = useState<number>(0);

    // Эффект для вычисления высоты шапки
    useEffect(() => {
        if (headerRef.current) {
            setHeaderHeight(headerRef.current.offsetHeight);
        }
        if (tabs && tabs.length > 0 && tabsRef.current) {
            setTabsHeight(tabsRef.current.offsetHeight);
        }
    }, [tabs, headerTitle, headerSlot, headerBottomSlot]);

    return (
        <div className="layout layout--dark">
            {/* Header */}
            <header ref={headerRef} className={'layout__header '}>
                <div className="layout__header-wrapper">
                    {showBackButton && (
                        <button className="layout__back-button" onClick={() => navigate(-1)}>
                            <ReactSVG className="layout__back-button-image" src={BackArrow} width={15} height={15} />
                        </button>
                    )}
                    <h1 className="layout__title">{headerTitle}</h1>
                    <div className="layout__header-slot">
                        {headerSlot && headerSlot}
                    </div>
                </div>
                {headerBottomSlot && (
                    <div className="layout__header-bottom">
                        {headerBottomSlot}
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main
                className="layout__content"
                style={{
                    paddingTop: `${headerHeight}px`,
                    paddingBottom: `${tabsHeight}px`,
                }}
            >
                {children}
            </main>

            {/* Bottom Tabs (Navigation) */}
            <nav ref={tabsRef} className="layout__tabs">
                <div className="tabs">
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            className={`tabs__item ${tab.path === activeTab ? 'tabs__item--active' : ''}`}
                            onClick={() => navigate(tab.path)}
                        >
                            <ReactSVG src={tab.icon} className="tabs__icon" />
                            <span className="tabs__label">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default DefaultLayout;