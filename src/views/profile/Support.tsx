import React, {useEffect, useContext} from "react";
import {HeaderContext} from "@/provider/headerContext.tsx";
import "./Support.scss";
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";

const Support: React.FC = () => {
    const context = useContext(HeaderContext);

    // Проверяем, что контекст существует
    if (!context) {
        throw new Error("HeaderContext must be provided");
    }

    const {setHeaderTitle, setShowBackButton} = context;

    useEffect(() => {
        setHeaderTitle("Поддержка");
        setShowBackButton(true);
    }, [setHeaderTitle, setShowBackButton]);

    return (
        <div className="profile-support">
            <div className="profile-support__top">
                <div className="profile-support__title">
                    Напишите нам если у вас возникли вопросы по работе приложения
                </div>
                <Form.Control className="profile-support__textarea" as="textarea"
                              placeholder="Опишите требования и пожелания  к технике, к исполнителю"
                              style={{minHeight: '150px'}}/>
            </div>
            <Button variant="primary" className="profile-support__button">
                Отправить
            </Button>
        </div>
    );
};

export default Support;