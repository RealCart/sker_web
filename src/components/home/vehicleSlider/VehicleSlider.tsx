import React, { useState } from 'react';
import './VehicleSlider.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/navigation';
import images from '@/constants/images';
import { useFetchVehicelCategory } from '@/api/queries/useVehicleQuery';

// Типы данных
interface IVehicle {
	id?: number;
	name: string;
	img?: string | null; // Добавляем возможность null для изображения
}

interface IProps {
	onPress?: (item: IVehicle) => void;
	onPressToAll?: () => void;
}

// Компонент элемента слайдера
const VehicleSliderItem = ({
							   title,
							   image,
							   onPress,
							   style,
							   item,
							   isActive, // Новый пропс для отслеживания активности
						   }: {
	title: string;
	image: string;
	onPress?: (item: IVehicle) => void;
	style?: string;
	item: IVehicle;
	isActive: boolean; // Флаг активности
}) => {
	return (
		<button
			className={`vehicle-slider__item ${style} ${isActive ? 'vehicle-slider__item--active' : ''}`} // Добавляем класс active
			onClick={() => onPress && onPress(item)}
		>
			<img src={image || images.defaultImage} alt={title} className="vehicle-slider__icon" />
			<span className="vehicle-slider__label">{title}</span>
		</button>
	);
};

// Главный компонент слайдера
const VehicleSlider: React.FC<IProps> = ({ onPress, onPressToAll }) => {
	const { data } = useFetchVehicelCategory();
	const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null); // Состояние для активной категории

	// Маппинг изображений
	const mapImages = (id: number): string => {
		const imgMapping = [
			{ id: 1, img: images.road },
			{ id: 5, img: images.evacuate },
			{ id: 8, img: images.farming },
			{ id: 7, img: images.delivery },
			{ id: 2, img: images.load },
			{ id: 4, img: images.unload },
			{ id: 3, img: images.home },
			{ id: 6, img: images.communal },
			{ id: 10, img: images.drill },
		];
		return imgMapping.find((imgItem) => imgItem.id === id)?.img || images.defaultImage; // default image
	};

	// Фильтрация данных и добавление изображений
	const vehicles = data
		?.filter((item) => item.id !== undefined) // Исключаем элементы с undefined в id
		.map((item) => ({
			...item,
			img: mapImages(item.id!), // Используем оператор !, так как мы уже проверили id
		}))
		.filter((item) => item.img); // Исключаем элементы без изображений

	if (!data || data.length === 0) {
		return <div className="vehicle-slider__empty">Нет доступных категорий</div>;
	}

	// Обработчик клика по категории
	const handleCategoryClick = (item: IVehicle) => {
		if (onPress) {
			onPress(item);
		}
		setActiveCategoryId(item.id || null); // Устанавливаем ID активной категории
	};

	return (
		<div className="vehicle-slider">
			{/* Swiper слайдер */}
			<Swiper
				modules={[Navigation]}
				spaceBetween={5}
				slidesPerView="auto"
				className="vehicle-slider__list"
			>
				{/* Слайд "Все" */}
				<SwiperSlide style={{ width: '68px' }}>
					<button
						className={`vehicle-slider__all`}
						onClick={() => {
							if (onPressToAll) {
								onPressToAll();
							}
							setActiveCategoryId(null); // Сбрасываем активную категорию
						}}
					>
						<div className="vehicle-slider__dots">
							{[1, 2, 3, 4].map((dot) => (
								<div key={dot} className="vehicle-slider__dot"></div>
							))}
						</div>
						<span className="vehicle-slider__label">Все</span>
					</button>
				</SwiperSlide>

				{/* Остальные слайды */}
				{vehicles &&
					vehicles.map((item) => (
						<SwiperSlide key={item.id} style={{ width: '124px' }}>
							<VehicleSliderItem
								item={item}
								onPress={handleCategoryClick} // Передаем обработчик клика
								style="vehicle-slider__item--small"
								title={item.name}
								image={item.img || images.defaultImage}
								isActive={item.id === activeCategoryId} // Передаем флаг активности
							/>
						</SwiperSlide>
					))}
			</Swiper>
		</div>
	);
};

export default VehicleSlider;