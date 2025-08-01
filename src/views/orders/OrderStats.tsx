import React, {useContext, useEffect} from 'react';
import {HeaderContext} from "@/provider/headerContext.tsx";
import "./OrderStats.scss";
import {Button, Nav} from "react-bootstrap";
import DonutChart from "@/components/ui/DonutChart/DonutChart.tsx";

interface IndexPageProps {
    updateHeader?: (newTitle: string, showBack: boolean) => void;
}

const OrdersStats: React.FC<IndexPageProps> = () => {
    const context = useContext(HeaderContext);

    // Проверяем, что контекст существует
    if (!context) {
        throw new Error("HeaderContext must be provided");
    }

    const { setHeaderTitle, setShowBackButton } = context;

    useEffect(() => {
        setHeaderTitle("Статистика");
        setShowBackButton(true);
    }, [setHeaderTitle, setShowBackButton]);

    const data = [
        { name: 'Отменённых заказов', value: 23, color: '#252525' },
        { name: 'В работе заказов', value: 23, color: '#5B7D98' },
        { name: 'Выполненных заказов', value: 10, color: '#FF4F00' },
    ];

    return (
        <div className="orders-stats">
            <Nav
                defaultActiveKey="link-1"
                variant="pills"
            >
                <Nav.Item>
                    <Nav.Link eventKey="link-1">Общая</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">По периодам</Nav.Link>
                </Nav.Item>
            </Nav>

            <DonutChart data={data} />

            <Button className="orders-stats__download" variant="dark">Скачать статистику</Button>
        </div>
    );
};

export default OrdersStats;