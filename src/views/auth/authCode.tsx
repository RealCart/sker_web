import React, { useContext, useEffect, useState } from 'react';
import './authCode.scss';
import { Button } from 'react-bootstrap';
import { HeaderContext } from '@/provider/headerContext';
import CodeInput from "@/components/shared/codeinput/CodeInput.tsx";
import ErrorIcon from "@/assets/icons/error.svg";
import { ReactSVG } from "react-svg";
import { useSendSMS, useSignIn } from '@/api/queries/useAuthQuery';
import { useRoleState } from '@/provider/roleContext';
import {useNavigate} from "react-router-dom";

const AuthCode: React.FC = () => {
    const context = useContext(HeaderContext);
    const phone = localStorage.getItem('phone');

    // Проверяем, что контекст существует
    if (!context) {
        throw new Error('HeaderContext must be provided');
    }

    const { setHeaderTitle, setShowBackButton } = context;

    useEffect(() => {
        setHeaderTitle('');
        setShowBackButton(true);
    }, [setHeaderTitle, setShowBackButton]);

    const [isInvalid, setIsInvalid] = useState(false); // Флаг ошибки
    const [timer, setTimer] = useState(30); // Таймер для повторной отправки (30 секунд)
    const [canResend, setCanResend] = useState(false); // Флаг возможности отправить код повторно
    const sendSMS = useSendSMS(); // Хук для отправки SMS
    const sendSignInCode = useSignIn()
    const { setRole } = useRoleState()
    const navigate = useNavigate();

    // Функция для проверки кода
    const validateCode = (enteredCode: string) => {
        sendSignInCode.mutate({ phone: phone as string, sms: Number(enteredCode) }, {
            onSuccess: () => {
                setIsInvalid(false);
                if (setRole)
                    setRole('client')
                navigate('/home')
            }
        })
    };

    // Функция для отправки кода повторно
    const resendCode = () => {
        if (phone) {
            const phoneNumber = `${phone.replace(/[\s()]/g, '')}`;
            sendSMS.mutate(phoneNumber); // Отправляем SMS снова
            setTimer(30); // Сбрасываем таймер
            setCanResend(false); // Блокируем кнопку повторной отправки
        }
    };

    // Запуск таймера
    useEffect(() => {
        if (timer > 0 && !canResend) {
            const interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);

            return () => clearInterval(interval); // Очистка интервала при размонтировании
        } else if (timer === 0) {
            setCanResend(true); // Разрешаем повторную отправку после завершения таймера
        }
    }, [timer, canResend]);

    // Форматирование таймера с ведущим нулём
    const formattedTimer = timer < 10 ? `0${timer}` : `${timer}`;

    return (
        <div className="auth-code page">
            <div className="auth-code__form">
                <div className="auth-code__text">
                    <h1>
                        Проверочный код
                    </h1>
                    <p>
                        Код был отправлен на <span>{phone}</span>
                    </p>
                </div>

                <CodeInput onCodeComplete={validateCode} isInvalid={isInvalid} />

                {/* Сообщение об ошибке */}
                {isInvalid && (
                    <div className="auth-code__invalid">
                        <ReactSVG className="reactsvg auth-code__invalid-icon" src={ErrorIcon} />
                        Неверный код. Попробуйте еще раз
                    </div>
                )}

                {/* Кнопка запроса повторной отправки */}
                <Button
                    variant="info"
                    disabled={!canResend || sendSMS.isPending}
                    onClick={resendCode}
                >
                    {sendSMS.isPending
                        ? 'Отправка...'
                        : canResend
                            ? 'Запросить повторно'
                            : `Запросить повторно через 0:${formattedTimer}`}
                </Button>
            </div>

            {/* Кнопка "Не приходит пароль?" */}
            <Button className="auth-code__sms-fail" variant="light">
                Не приходит пароль?
            </Button>
        </div>
    );
};

export default AuthCode;