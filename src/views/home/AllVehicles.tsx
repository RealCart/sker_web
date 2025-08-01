// AllVehiclesPage.tsx
import React, { useEffect } from 'react';

interface AllVehiclesPageProps {
    updateHeader?: (newTitle: string, showBack: boolean) => void;
}

const AllVehicles: React.FC<AllVehiclesPageProps> = ({ updateHeader }) => {
    useEffect(() => {
        // Обновляем заголовок и показываем кнопку "Назад"
        if (updateHeader) {
            updateHeader("Часто вызывают", true);
        }
    }, [updateHeader]);

    return (
        <div className="all-vehicles-page">
            <h2>TODO</h2>
            {/* Здесь можно добавить список всех типов техники */}
        </div>
    );
};

export default AllVehicles;