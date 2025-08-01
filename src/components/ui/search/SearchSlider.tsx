import { useFetchVehicelCategory } from '@/api/queries/useVehicleQuery'
import { useState } from 'react'
import images from '@/constants/image'

const SearchSliderItem = (
	{ title, img, active, onClick }:
		{ title: string, img: string, active: boolean, onClick: () => void }
) => {
	return (
		<button
			onClick={onClick}
			className={`min-w-[200px] h-full bg-white rounded-lg flex flex-col justify-around items-center px-[12px] hover:bg-[#f5f5f5] ${active ? 'border-2 border-[#FF4F00]' : 'border-2 border-transparent'}`}>
			<img src={img} alt={title} className='h-[80px]' />
			<span className='w-full'>{title}</span>
		</button>
	)
}

function SearchSlider({ onClick }: { onClick: (id: number) => void }) {

	const { data } = useFetchVehicelCategory()
	const [activeItem, setActiveItem] = useState<number | null>(null)

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

	const vehicles = data?.map((item) => ({
		...item,
		img: imgMapping.find((imgItem) => imgItem.id === item.id)?.img || null, // Добавляем изображение по индексу, если оно существует
	}));

	const handleClick = (id: number) => {

		onClick(id)

		if (activeItem) {
			setActiveItem(null)
		}

		setActiveItem(id)
	}

	return (
		<div className='h-[160px] bg-[#f5f5f5] flex flex-row gap-[20px] overflow-x-auto'>

			{vehicles?.map((item) => (
				<SearchSliderItem
					key={item.id}
					title={item.name}
					img={item.img || ''}
					active={activeItem === item.id}
					onClick={() => handleClick(item.id as number)}
				/>
			))}

		</div>
	)
}

export default SearchSlider