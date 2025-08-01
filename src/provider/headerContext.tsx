import React, { createContext, useState, useContext } from 'react';

interface HeaderContextProps {
    headerTitle: string;
    setHeaderTitle: (title: string) => void;
    showBackButton: boolean;
    setShowBackButton: (show: boolean) => void;
    headerSlot?: React.ReactNode;
    setHeaderSlot: (slot: React.ReactNode) => void;
    headerBottomSlot?: React.ReactNode;
    setHeaderBottomSlot: (slot: React.ReactNode) => void;
}

export const HeaderContext = createContext<HeaderContextProps | undefined>(undefined);

export const HeaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [headerTitle, setHeaderTitle] = useState<string>('Главная');
    const [showBackButton, setShowBackButton] = useState<boolean>(false);
    const [headerSlot, setHeaderSlot] = useState<React.ReactNode | undefined>(undefined);
    const [headerBottomSlot, setHeaderBottomSlot] = useState<React.ReactNode | undefined>(undefined);

    return (
        <HeaderContext.Provider
            value={{
                headerTitle,
                setHeaderTitle,
                showBackButton,
                setShowBackButton,
                headerSlot,
                setHeaderSlot,
                headerBottomSlot,
                setHeaderBottomSlot,
            }}
        >
            {children}
        </HeaderContext.Provider>
    );
};

export const useHeader = () => {
    const context = useContext(HeaderContext);
    if (!context) {
        throw new Error('useHeader must be used within a HeaderProvider');
    }
    return context;
};