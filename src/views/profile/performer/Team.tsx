import React, { useEffect, useContext } from "react";
import { HeaderContext } from "@/provider/headerContext.tsx";
import ListGroup from "@/components/ui/listGroup/listGroup.tsx";

interface listGroupItem {
    href: string;
    text: string;
}

const ProfileTeam: React.FC = () => {
    const context = useContext(HeaderContext);

    // Проверяем, что контекст существует
    if (!context) {
        throw new Error("HeaderContext must be provided");
    }

    const { setHeaderTitle, setShowBackButton } = context;

    useEffect(() => {
        setHeaderTitle("Моя команда");
        setShowBackButton(true);
    }, [setHeaderTitle, setShowBackButton]);

    const listGroupItems: listGroupItem[] = [
        { href: "/profile/team/add", text: "Добавить оператора" },
        { href: "/profile/team/list", text: "Моя команда" },
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

export default ProfileTeam;