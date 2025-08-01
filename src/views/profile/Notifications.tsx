import React, { useEffect, useContext } from "react";
import { HeaderContext } from "@/provider/headerContext.tsx";
import ListGroup, {ListItemProps} from "@/components/ui/listGroup/listGroup.tsx";

import "./Notifications.scss";


const ProfilePolitics: React.FC = () => {
    const context = useContext(HeaderContext);

    // Проверяем, что контекст существует
    if (!context) {
        throw new Error("HeaderContext must be provided");
    }

    const { setHeaderTitle, setShowBackButton } = context;

    useEffect(() => {
        setHeaderTitle("Настройка уведомлений");
        setShowBackButton(true);
    }, [setHeaderTitle, setShowBackButton]);

    const listGroupItems: ListItemProps[] = [
        {
            children: "СМС",
            switchProps: {
                checked: true, // Начальное состояние
                onChange: (checked) => console.log("СМС:", checked), // Обработчик изменения
            },
        },
        {
            children: "Письма",
            error: "Подтвердите свою почту",
            switchProps: {
                checked: false, // Начальное состояние
                onChange: (checked) => console.log("Письма:", checked), // Обработчик изменения
            },
        },
    ];

    return (
        <div className="profile-notifications">
            <ListGroup  >
                {listGroupItems.map((item, index) => (
                    <ListGroup.Item {...item} key={index}>
                        {item.children}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default ProfilePolitics;