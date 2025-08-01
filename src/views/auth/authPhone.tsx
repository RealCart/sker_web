import React, { useContext, useEffect, useState } from 'react';
import './authPhone.scss';
import { Button, Form } from 'react-bootstrap';
import { HeaderContext } from '@/provider/headerContext';
import { useNavigate } from 'react-router-dom';
import {format, useMask} from '@react-input/mask';
import { useSendSMS } from '@/api/queries/useAuthQuery';

const AuthPhone: React.FC = () => {
    const context = useContext(HeaderContext);

    // Проверяем, что контекст существует
    if (!context) {
        throw new Error('HeaderContext must be provided');
    }

    const { setHeaderTitle, setShowBackButton } = context;

    useEffect(() => {
        setHeaderTitle('');
        setShowBackButton(false); // Убедитесь, что кнопка "Назад" скрыта

        const savedPhone = localStorage.getItem('phone');
        if (savedPhone) {
            // Форматируем значение для совместимости с маской
            const formattedPhone = format(savedPhone.slice(2), {
                mask: '(____) ______',
                replacement: { _: /\d/ },
            });
            setValue(formattedPhone);
        }
    }, [setHeaderTitle, setShowBackButton]);

    const [validated, setValidated] = useState(false);
    const [value, setValue] = useState(''); // Состояние для номера телефона
    const navigate = useNavigate();
    const sendSMS = useSendSMS();


    // Функция для отправки SMS
    const handleSendSMS = (phoneNumber:string) => {
        sendSMS.mutate(phoneNumber); // Вызываем мутацию для отправки SMS
    };

    // Переход на следующую страницу после успешной отправки
    useEffect(() => {
        if (sendSMS.isSuccess) {
            navigate('/app/auth/code');
        }
    }, [sendSMS.isSuccess, navigate]);

    // Обработчик отправки формы
    const handleSubmit = () => {
        const phoneNumber = `+7${value.replace(/[\s()]/g, '')}`;

        if (value.length < 9) {
            setValidated(true);
            return;
        }

        if (localStorage.getItem('phone') === phoneNumber)
            navigate('/app/auth/code');
        else
            handleSendSMS(phoneNumber);
    };

    return (
        <div className="auth-phone page">
            <div className="auth-phone__form">
                <div className="auth-phone__text">
                    <h1>
                        Войди или зарегистрируйся <br />
                        в приложении
                    </h1>
                    <p>
                        Укажите номер телефона, который можно подтвердить с помощью CMC
                    </p>
                </div>
                <Form noValidate validated={validated} onSubmit={(e) => e.preventDefault()} id="authForm">
                    <Form.Group className="form-tel">
                        <Form.Control
                            ref={useMask({
                                mask: '(____) ______',
                                replacement: { _: /\d/ },
                            })}
                            type="tel"
                            required
                            placeholder="(0000) 00000"
                            minLength={8} // Минимальная длина ввода
                            maxLength={14} // Максимальная длина ввода
                            pattern="^\(\d{4}\) \d{5}$" // Регулярное выражение для маски
                            isInvalid={validated && value.length < 9} // Проверка валидности
                            value={value} // Привязываем значение к состоянию
                            onChange={(e) => {
                                setValue(e.target.value);
                            }}
                        />
                    </Form.Group>
                </Form>

                <div className="auth-phone__agreement">
                    Подтверждаю согласие на обработку моих персональных данных в соответствии с{' '}
                    <a href="#">Политикой оператора</a> и <a href="#">Пользовательским соглашением</a>.
                </div>
            </div>
            {/* Кнопка привязана к форме через onClick */}
            <Button variant="dark" onClick={handleSubmit}>
                {sendSMS.isPending ? 'Отправка...' : 'Получить код'}
            </Button>
        </div>
    );
};

export default AuthPhone;