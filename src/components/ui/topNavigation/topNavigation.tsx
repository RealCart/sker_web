import React, {ReactNode} from 'react';
import './topNavigation.scss';

interface TopNavigationProps {
    leftSlot?: ReactNode;
    rightSlot?: ReactNode;
    bottomSlot?: ReactNode;
    title: string;
    className?: string;
}

const TopNavigation: React.FC<TopNavigationProps> =
    ({
         leftSlot,
         rightSlot,
         bottomSlot,
         title,
         className = ''
     }) => {
        return (
            <div className={`top-navigation ${className}`}>
                <div className="top-navigation__row">
                    <div className="top-navigation__slot">
                        {leftSlot}
                    </div>
                    <div className="top-navigation__heading">
                        {title}
                    </div>
                    <div className="top-navigation__slot">
                        {rightSlot}
                    </div>
                </div>
                {bottomSlot && (
                    <div className="top-navigation__bottom-slot">
                        {bottomSlot}
                    </div>
                )}
            </div>
        );
    };

export default TopNavigation;