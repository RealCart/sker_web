// TabContext.tsx
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import TabHome from '@/assets/icons/tabHome.svg';
import TabOrders from '@/assets/icons/tabOrders.svg';
import TabVacancies from '@/assets/icons/tabVacancies.svg';
import TabProfile from '@/assets/icons/tabProfile.svg';

interface Tab {
    icon: string;
    label: string;
    path: string;
}

interface TabContextType {
    tabs: Tab[];
    activeTab: string | null;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export const TabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const location = useLocation();

    const tabs = useMemo(
        () => [
            { icon: TabHome, label: 'Поиск', path: '/app/home' },
            { icon: TabOrders, label: 'Заказы', path: '/app/orders' },
            { icon: TabVacancies, label: 'Вакансии', path: '/app/vacancies' },
            { icon: TabProfile, label: 'Профиль', path: '/app/profile' },
        ],
        []
    );

    // Автоматическое определение активного таба
    useEffect(() => {
        const currentTab = tabs.find((tab) => location.pathname.startsWith(tab.path));
        setActiveTab(currentTab?.path || null);
    }, [location.pathname, tabs]); // Теперь tabs стабилен благодаря useMemo

    return (
        <TabContext.Provider value={{ tabs, activeTab }}>
            {children}
        </TabContext.Provider>
    );
};

export const useTabContext = () => {
    const context = useContext(TabContext);
    if (!context) {
        throw new Error('useTabContext must be used within a TabProvider');
    }
    return context;
};