import React, { useEffect, useContext } from "react";
import { HeaderContext } from "@/provider/headerContext.tsx";
import "./Edit.scss";
import UserDefault from "@/assets/images/userDefault.png"
import Form from "react-bootstrap/Form";
import {Button, FloatingLabel} from "react-bootstrap";
import Switch from "@/components/shared/switch/Switch.tsx";

const Edit: React.FC = () => {
    const context = useContext(HeaderContext);

    // Проверяем, что контекст существует
    if (!context) {
        throw new Error("HeaderContext must be provided");
    }

    const { setHeaderTitle, setShowBackButton } = context;

    useEffect(() => {
        setHeaderTitle("Настройка личных данных");
        setShowBackButton(true);
    }, [setHeaderTitle, setShowBackButton]);

    return (
        <div className="profile-edit">
            <label className="profile-edit__photo" htmlFor="profilePhotoInput">
                <img className="profile-edit__photo-image" src={UserDefault} alt="Нет фотографии"/>
                Выбрать фотографию
                <input type="file" id="profilePhotoInput" className="profile-edit__photo-input"/>
            </label>

            <div className="profile-edit__tile tile">
                <div className="tile__title">
                    Личные данные
                </div>
                <FloatingLabel controlId="floatingInput" label="Ваше имя">
                    <Form.Control type="text" placeholder="Ваше имя"/>
                </FloatingLabel>
                <FloatingLabel controlId="floatingInput" label="Ваша фамилия">
                    <Form.Control type="text" placeholder="Ваша фамилия"/>
                </FloatingLabel>
                <FloatingLabel controlId="floatingSelect" label="Ваш город">
                    <Form.Select aria-label="Выбор города">
                        <option>Выберите город</option>
                        <option value="1">Алматы</option>
                        <option value="2">Астана</option>
                        <option value="3">Павлодар</option>
                    </Form.Select>
                </FloatingLabel>
            </div>

            <div className="profile-edit__tile tile">
                <div className="tile__title">
                    Контакты
                </div>
                <div className="tile__text">
                    Исполнители видят ваши контакты только, когда вы сами выбираете кому их отправить
                </div>
                <FloatingLabel controlId="floatingInput" label="Ваше имя">
                    <Form.Control type="text" placeholder="Ваше имя"/>
                </FloatingLabel>

                <div className="tile__row">
                    <div className="tile__row-text">
                        Разрешить исполнителям звонить мне
                    </div>

                    <Switch checked={true}
                            onChange={()=>{console.log("Switch checked")}}
                    />
                </div>

                <FloatingLabel controlId="floatingInput" label="Email">
                    <Form.Control type="text" placeholder="Email"/>
                    <Form.Control.Feedback type="invalid" style={{display: 'block'}}>
                        Подтвердите свою почту
                    </Form.Control.Feedback>
                </FloatingLabel>
            </div>
            <div className="profile-edit__buttons">
                <Button variant="primary" className="profile__button profile__button--change-type">
                    Сохранить
                </Button>
                <Button variant="light" className="profile__button profile__button--exit">
                    Удалить профиль
                </Button>
            </div>
        </div>
    );
};

export default Edit;