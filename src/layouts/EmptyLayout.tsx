
import React from 'react';

interface BaseLayoutProps {
    children: React.ReactNode;
}

const EmptyLayout: React.FC<BaseLayoutProps> = ({ children}) => {

    return (
        <div className="layout">
            {/* Main Content */}
            <main
                className="layout__content"
            >
                {children}
            </main>
        </div>
    );
};

export default EmptyLayout;