import React from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
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
            <YMaps>
                <Map
                    onMouseDown={onMapClick }
                    defaultState={{
                        center: coordinates,
                        zoom: 13,
                    }}
                    width="100%"
                    height={mapHeight}
                    options={{
                        suppressMapOpenBlock: true, // Убирает текст "Яндекс.Карты" внизу
                        controls: [], // Отключает все элементы управления (например, кнопки масштабирования)
                        disableDoubleClickZoom: true,
                    }}
                >
                    {/* Добавление собственной иконки */}
                    <Placemark
                        geometry={coordinates}
                        options={{
                            iconLayout: 'default#image', // Используем собственную иконку
                            iconImageHref: Location, // Путь к вашей иконке
                            iconImageSize: [28, 28], // Размер иконки (ширина и высота в пикселях)
                            iconImageOffset: [-14, -14], // Смещение иконки (чтобы центр был в точке координат)
                        }}
                    />
                </Map>
            </YMaps>
        </div>
    );
};

export default MapView;