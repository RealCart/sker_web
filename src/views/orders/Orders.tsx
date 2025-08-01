import React, { useCallback, useContext, useEffect, useState } from 'react';
import VehicleSlider from '@/components/home/vehicleSlider/VehicleSlider.tsx';
import { HeaderContext } from '@/provider/headerContext.tsx';
import './Orders.scss';
import {
    useFetchFullOrderList,
    useFetchOrdersByType,
} from "@/api/queries/useOrderQuery.ts";
import OrderCard from '@/components/ui/cards/orderCard/OrderCard.tsx';
import { useNavigate } from "react-router-dom";
import { useFetchTypesVehiclesByCategory } from "@/api/queries/useVehicleQuery.ts";

const OrdersPage: React.FC = () => {
    const context = useContext(HeaderContext);
    const navigate = useNavigate();
    const [isAll, setAll] = useState(true);
    const [currentCategory, setCurrentCategory] = useState("");
    const [vehicles, setVehicles] = useState<IDefault[]>([]);

    if (!context) {
        throw new Error('HeaderContext must be provided');
    }

    const { setHeaderTitle, setShowBackButton } = context;

    useEffect(() => {
        setHeaderTitle('Часто вызывают');
    }, [setHeaderTitle, setShowBackButton]);

    const {
        data: fullOrderList,
        refetch,
        isPending,
    } = useFetchFullOrderList({ orderStatus: "PENDING", index: 0 });
    const getList = useFetchTypesVehiclesByCategory();
    const orders = useFetchOrdersByType();

    // Рефетч данных при изменении зависимостей
    useEffect(() => {
        refetch();
    }, [refetch]);

    return (
        <>
            <VehicleSlider
                onPress={(category: IDefault) => {
                    setAll(false);
                    if (category?.id) {
                        setCurrentCategory(category.name);
                        setVehicles([])
                        getList.mutate(category.id as number, {
                            onSuccess: (data) => {
                                const validIds = data
                                    .map((item) => item.id)
                                    .filter((id): id is number => id !== undefined);
                                orders.mutate(validIds);
                            },
                        });
                    }
                }}
                onPressToAll={() => {
                    refetch();
                    setAll(true);
                }}
            />
            <div className="orders page">
                <h1>Новые заявки</h1>
                <div className="orders__list">
                    {isPending ? (
                        <div>Loading...</div> // Показываем индикатор загрузки
                    ) : isAll ? (
                        fullOrderList?.map((item) => (
                            <OrderCard
                                key={item.id}
                                onClick={() => navigate(`/orders/${item.id}`)}
                                startedTime={item.createdAt}
                                title={item.vehicleType
                                    ?.map((type) => type.name)
                                    .join(",")}
                                description={item.description}
                                adress={item.vehicleAddress || ""}
                                price={
                                    item.price?.toLocaleString("ru-RU") ||
                                    "По договоренности"
                                }
                                views={item.watchCount || 0}
                                followed={item.feedbackCount || 0}
                            />
                        ))
                    ) : (
                        orders?.data?.map((item) => (
                            <OrderCard
                                key={item.id}
                                onClick={() => navigate(`/order/${item.id}`)}
                                startedTime={item.createdAt}
                                title={item.vehicleType
                                    ?.map((type) => type.name)
                                    .join(",")}
                                description={item.description}
                                adress={item.vehicleAddress || ""}
                                price={
                                    item.price?.toLocaleString("ru-RU") ||
                                    "По договоренности"
                                }
                                views={item.watchCount || 0}
                                followed={item.feedbackCount || 0}
                            />
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default OrdersPage;