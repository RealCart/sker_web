import React, {useEffect, useContext} from 'react';
import {HeaderContext} from '@/provider/headerContext.tsx';
import "./Transactions.scss";
import VehicleIcon from '@/assets/icons/VehicleIcon.svg'
import {ReactSVG} from "react-svg";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

interface Transaction {
    type: string;
    date: string;
    time: string;
    amount: string;
    badgeText: string;
    badgeColor: 'green' | 'black' | 'error'; // Цвет бейджа
}

const Transactions: React.FC = () => {
    const context = useContext(HeaderContext);
    const navigate = useNavigate(); // Получаем функцию для навигации

    // Проверяем, что контекст существует
    if (!context) {
        throw new Error('HeaderContext must be provided');
    }

    const {setHeaderTitle, setShowBackButton} = context;

    useEffect(() => {
        setHeaderTitle('История операций');
        setShowBackButton(true);
    }, [setHeaderTitle, setShowBackButton]);

    const transactions: Transaction[] = [
        {
            type: 'Пополнение счета',
            date: '03.02.24',
            time: '11:59',
            amount: '+20 563 ₸',
            badgeText: 'Пополнено',
            badgeColor: 'green',
        },
        {
            type: 'Оплата подписки',
            date: '03.02.24',
            time: '11:59',
            amount: '-5 563 ₸',
            badgeText: 'Оплачена подписка',
            badgeColor: 'black',
        },
        {
            type: 'Пополнение счета',
            date: '03.02.24',
            time: '11:59',
            amount: '+10 563 ₸',
            badgeText: 'Ошибка',
            badgeColor: 'error',
        },
    ];

    return (
        <div className="transactions">
            {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                    <TransactionCard key={index} {...transaction} />
                ))
            ) : (
                <div className="transactions__empty">
                    <div className="transactions__empty-top">
                        <ReactSVG src={VehicleIcon} className="transactions__empty-icon"/>
                        <div className="transactions__empty-text">
                            Вы еще не совершали<br/> ни одной оплаты
                        </div>
                    </div>

                    <Button variant="primary"
                            className="transactions__empty-button"
                            onClick={() => {
                                navigate('/profile-add-money')
                            }}
                    >
                        Пополнить счет
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Transactions;

interface TransactionCardProps {
    type: string;
    date: string;
    time: string;
    amount: string;
    badgeText: string;
    badgeColor: 'green' | 'black' | 'error';
}

const TransactionCard: React.FC<TransactionCardProps> = ({type, date, time, amount, badgeText, badgeColor}) => {
    return (
        <div className="transaction">
            <div className="transaction__type">{type}</div>
            <div className="transaction__date">
                <span>{date}</span>
                <span>{time}</span>
            </div>
            <div className="transaction__row">
                <div className="transaction__amount">{amount}</div>
                <div className={`transaction__badge transaction__badge--${badgeColor}`}>{badgeText}</div>
            </div>
        </div>
    );
};