import React, { useEffect, useContext } from "react";
import { HeaderContext } from "@/provider/headerContext.tsx";
import ListGroup from "@/components/ui/listGroup/listGroup.tsx";

interface listGroupItem {
    href: string;
    text: string;
}

const ProfilePolitics: React.FC = () => {
    const context = useContext(HeaderContext);

    // Проверяем, что контекст существует
    if (!context) {
        throw new Error("HeaderContext must be provided");
    }

    const { setHeaderTitle, setShowBackButton } = context;

    useEffect(() => {
        setHeaderTitle("О приложении");
        setShowBackButton(true);
    }, [setHeaderTitle, setShowBackButton]);

    const listGroupItems: listGroupItem[] = [
        { href: "/app/profile/politics", text: "Политика о конфидициальности" },
        { href: "/app/profile/conditions", text: "Условия использования" },
    ];

    return (
        <div className="page">
            <ListGroup>
                {listGroupItems.map((item, index) => (
                    <ListGroup.Item href={item.href} key={index}>
                        {item.text}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default ProfilePolitics;