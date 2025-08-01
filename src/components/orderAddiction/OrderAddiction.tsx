import React, {useState} from 'react';
import './OrderAddiction.scss'
import {Button} from "react-bootstrap";
import {baseURL} from "@/api/instance.ts";

interface OrderAddictionProps {
    data?: IOrder; // Добавляем тип для data (IOrder должен быть определен где-то в вашем проекте)
}

const OrderAddiction: React.FC<OrderAddictionProps> = ({ data }) => {
    const [isActive, setIsActive] = useState(true)
    const [visible, setIsVisible] = useState(false);

    return (
        <div className="order-addiction">
            {
                isActive ?
                    (
                        <>
                            <div className="order-addiction__title">
                                Требующеюся техника
                            </div>
                            <div className="order-addiction__vehicles">
                                {data && data?.vehicleType?.map((item, index) =>
                                    <div className="order-addiction__vehicles-item" key={index}>
                                        {item.name}
                                    </div>
                                )}
                            </div>
                            <div className="order-addiction__title">
                                Детали заказа
                            </div>
                            <div className="order-addiction__description">
                                {data?.description &&
                                    data?.description
                                }
                            </div>
                                {data?.photoUrl && data?.photoUrl?.length > 0 &&
                                    <div className="order-addiction__images">
                                        <img className="order-addiction__images-item" onClick={() => setIsVisible(true)}
                                             src={`${baseURL}/files/download/${data?.photoUrl[0]}`}
                                             alt=""
                                        />
                                    </div>
                                }
                            {data?.createdAt &&
                                <div className="order-addiction__date">
                                    Заявка оформлена {data?.createdAt.toString().split('T')[0]}
                                </div>
                            }
                            <Button className="order-addiction__btn" variant="info" onClick={() => setIsActive(false)}>Скрыть детали</Button>
                        </>
                    ) : (
                        <Button className="order-addiction__btn" variant="dark" onClick={() => setIsActive(true)}>Показать детали заказа</Button>
                    )
            }


        </div>
    );
};

export default OrderAddiction;