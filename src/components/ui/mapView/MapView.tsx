import React from 'react';
// import { YMaps, Map, Placemark } from 'react-yandex-maps';
import Location from '@/assets/images/location.png';
import './MapView.scss';

interface MapViewProps {
    coordinates: [number, number]; // Массив с координатами [latitude, longitude]
    smallMap?: boolean; // Флаг для переключения между маленькой и большой картой
    onMapClick?: () => void; // Коллбэк при нажатии на карту
}

const MapView: React.FC<MapViewProps> = ({ coordinates, smallMap = true, onMapClick }) => {
    const mapHeight = smallMap ? '60px' : '310px';

    return (
        <div className="map-view">

        </div>
    );
};

export default MapView;