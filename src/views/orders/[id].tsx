import React, {useContext, useEffect, useState} from 'react';
import {HeaderContext} from '@/provider/headerContext.tsx';
import {useParams} from 'react-router-dom'; // Для получения параметров маршрута
import {useFetchOrder, useFetchOrderFeedback} from '@/api/queries/useOrderQuery.ts';
import {useRoleState} from '@/provider/roleContext.tsx';
import './[id].scss'
import MapView from "@/components/ui/mapView/MapView.tsx";
import OrderAddiction from '@/components/orderAddiction/OrderAddiction.tsx';
import AddrDotsIcon from '@/assets/icons/addr-dots.svg'
import {ReactSVG} from "react-svg";

const OrderInfo: React.FC = () => {
    const context = useContext(HeaderContext);
    const {id} = useParams(); // Получаем ID из URL

    if (!context) {
        throw new Error('HeaderContext must be provided');
    }

    const {setHeaderTitle, setShowBackButton} = context;

    // Установка заголовка и кнопки "Назад"
    useEffect(() => {
        setHeaderTitle(`Задача №${id}`);
        setShowBackButton(true); // Показываем кнопку "Назад"
    }, [setHeaderTitle, setShowBackButton, id]);

    // const {roleState} = useRoleState();
    const {data, isFetching, refetch: orderRefetch} = useFetchOrder(Number(id));
    const {data: feedbackList, refetch} = useFetchOrderFeedback(Number(id));

    const [smallMap, setSmallMap] = useState(true);
    // const [requestOrderData, setRequestOrderData] = useState<{
    //     description?: string;
    //     price?: number;
    // } | null>(null);
    // const [feedbackId, setFeedbackId] = useState<number | null>(null);

    // Обновление feedbackId при изменении данных
    // useEffect(() => {
    //     if (data?.executor?.id && feedbackList) {
    //         const feedback = feedbackList.find(item => item.executor.id === data.executor?.id);
    //         setFeedbackId(feedback?.id || null);
    //     }
    // }, [data?.executor?.id, feedbackList]);

    // Сохранение feedbackId в localStorage
    // const setOrderFeedbackId = async () => {
    //     if (data) {
    //         const currentFeedbackId = data.orderFeedbacks?.find((feedback) => feedback.status === 'ACCEPTED')?.id;
    //         console.log('feedbackId:', currentFeedbackId);
    //
    //         if (currentFeedbackId) {
    //             await localStorage.setItem('orderFeedbackId', String(currentFeedbackId));
    //             await localStorage.setItem('orderId', String(id));
    //         }
    //     }
    // };

    return (
        <>
            <div className="order-info page">
                <div className="order-info__details">
                    {feedbackList && feedbackList?.length < 1 && (
                        <div className="order-info__status">
                            Ожидание откликов
                        </div>
                    )}
                    {!data?.executor && feedbackList && feedbackList?.length > 0 && (
                        <div className="order-info__status">
                            Ожидание выбора исполнителя
                        </div>
                    )}
                    {data?.status === 'PROCESS' && (
                        <div className="order-info__status">
                            На исполнении
                        </div>
                    )}
                    {data?.status === 'FINISHED' && (
                        <div className="order-info__status">
                            Завершен
                        </div>
                    )}

                    <div className="order-info__title">
                        Требуется {data?.vehicleType?.map(item => item.name).join(',')}
                    </div>

                    <div className="order-info__row">
                        <div className="order-info__price">
                            <div className="order-info__property">
                                Цена:
                            </div>
                            {data?.price?.toLocaleString('Ru-ru')} ₸
                        </div>

                        <div className="order-info__time">
                            <div className="order-info__property">
                                Когда:
                            </div>
                            {data?.orderDate}{data?.orderTime && `, ${data?.orderTime}`}
                        </div>
                    </div>

                    <div className="order-info__location">
                        <div className="order-info__small-title">
                            Адрес:
                        </div>

                        {data?.deliveryAddress ? (
                            <div className="order-info__addr order-info__addr--many">
                                <div className="order-info__addr-item">
                                    <div className="order-info__addr-item-name order-info__property">
                                        {data?.vehicleType && data?.vehicleType[0] && data?.vehicleType[0].id === 4 ? 'Откуда: ' : 'Куда: '}
                                    </div>
                                    {data?.vehicleAddress}
                                </div>
                                <ReactSVG src={AddrDotsIcon} className="order-info__addr-dots reactsvg"/>
                                <div className="order-info__addr-item">
                                    <div className="order-info__addr-item-name order-info__property">
                                        Куда:
                                    </div>
                                    {data?.deliveryAddress}
                                </div>
                            </div>
                        ) : (
                            <div className="order-info__addr">
                                <div className="order-info__addr-item">
                                    <div className="order-info__addr-item-name order-info__property">
                                        {data?.vehicleType && data?.vehicleType[0] && data?.vehicleType[0].id === 4 ? 'Откуда: ' : 'Куда: '}
                                    </div>
                                    {data?.vehicleAddress}
                                </div>
                            </div>
                        )}

                        {data?.coordinates &&
                            <MapView
                                coordinates={data.coordinates as [number, number]}
                                smallMap={smallMap}
                                onMapClick={() => setSmallMap(false)}
                            />
                        }
                    </div>

                    <OrderAddiction data={data}/>
                </div>
            </div>
        </>
    );
};

export default OrderInfo;