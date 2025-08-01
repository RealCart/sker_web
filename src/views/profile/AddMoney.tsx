// AddMoneyPage.tsx
import React, { useEffect, useContext } from 'react';
import { HeaderContext } from '@/provider/headerContext.tsx';
import "./AddMoney.scss";
import {Button, FloatingLabel, InputGroup} from "react-bootstrap";
import Form from "react-bootstrap/Form";

const AddMoney: React.FC = () => {
    const context = useContext(HeaderContext);

    // Проверяем, что контекст существует
    if (!context) {
        throw new Error('HeaderContext must be provided');
    }

    const { setHeaderTitle, setShowBackButton } = context;

    useEffect(() => {
        setHeaderTitle('Пополнить счет');
        setShowBackButton(true);
    }, [setHeaderTitle, setShowBackButton]);

    return (
        <div className="add-money-page add-money">
            {/* Содержимое страницы */}
            <InputGroup className="add-money__input">
                <FloatingLabel controlId="floatingInput" label="Стоимость работ">
                    <Form.Control type="number" placeholder="Стоимость работ"/>
                </FloatingLabel>
                <InputGroup.Text>₸</InputGroup.Text>
            </InputGroup>
            <Button variant="primary" className="add-money__button">
                Перейти к оплате
            </Button>
        </div>
    );
};

export default AddMoney;