import React from 'react'

function OrderDefaultCard({ item }: { item: IOrder }) {
	return (
		<div className='w-full h-[200px] bg-white rounded-2xl p-[24px] flex flex-col justify-between'>
			<div className='flex flex-row justify-between'>
				<div>
					<h3 className='font-bold'>
						Требуется {item.vehicleType?.map((type) => type.name).join(', ')}
					</h3>
					<p className='text-[#7A7A7A]'>{item.description}</p>
				</div>

				<span className='font-bold'>{item.price ? `${item.price.toLocaleString('ru-RU')} ₸` : 'Договорная'}</span>
			</div>

			<span className='text-[#7A7A7A]'>
				{item.createdAt ? new Date(item.createdAt).toLocaleString("ru-RU") : "—"}
			</span>
		</div>
	)
}

export default OrderDefaultCard