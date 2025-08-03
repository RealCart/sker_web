import React, { useEffect, useContext } from "react";
import "./Profile.scss";
import { ReactSVG } from "react-svg";
import { HeaderContext } from "@/provider/headerContext.tsx";
import { Button } from "react-bootstrap";
import ListGroup, {ListItemProps} from "@/components/ui/listGroup/listGroup.tsx";
import { useNavigate } from "react-router-dom";
import { useFetchReviews, useFetchUser } from "@/api/queries/useUserQuery.ts";
import { useRoleState } from "@/provider/roleContext.tsx";
import { baseURL } from "@/api/instance.ts";

import ArrowIcon from "@/assets/icons/arrow-right.svg";
import StarIcon from "@/assets/icons/star.svg";
import MessageIcon from "@/assets/icons/message.svg";
import NotificationIcon from "@/assets/icons/notification.svg";
import AboutIcon from "@/assets/icons/about.svg";
import SupportIcon from "@/assets/icons/support.svg";
import ClipboardIcon from "@/assets/icons/clipboard.svg";

const Profile: React.FC = () => {
    const context = useContext(HeaderContext);
    const navigate = useNavigate(); // Вызываем хук в начале компонента

    // Проверяем, что контекст существует
    if (!context) {
        throw new Error("HeaderContext must be provided");
    }

    const { setHeaderTitle, setShowBackButton } = context;

    useEffect(() => {
        setHeaderTitle("Мой профиль");
    }, [setHeaderTitle, setShowBackButton]);

    const { data } = useFetchUser();
    const { roleState, setRole, LogOut } = useRoleState();

    const { data: reviews } = useFetchReviews({
        id: data ? Number(data.id) : undefined,
        role: roleState?.isPerformer ? 'EXECUTOR' : 'CUSTOMER',
    });


    if (!setRole) {
        console.error('setRole is undefined. Ensure RoleProvider is wrapping the component.');
        return null;
    }

    const setDefault = () => {
        setRole('client');
    };

    const handleLogout = () => {
        LogOut?.();
    };

    const writeId = (id: string) => {
        try {
            localStorage.setItem('myId', id); // Убираем await
        } catch (error) {
            console.error('Ошибка записи ID в localStorage:', error);
        }
    };


    const commonItems = [
        { href: "/profile/my-reviews", icon: MessageIcon, children: "Мои отзывы", onClick: () => data?.id && writeId(String(data.id)) },
        { href: "/profile/notifications", icon: NotificationIcon, children: "Настройка уведомлений" },
        { href: "/profile/about", icon: AboutIcon, children: "О приложении" },
        { href: "/profile/support", icon: SupportIcon, children: "Поддержка" },
    ];

    const listGroupItems = roleState?.isPerformer
        ? commonItems
        : [...commonItems, { href: "/profile/team", icon: SupportIcon, children: "Я собственник техники" }];

    console.log(roleState);
    console.log(data?.roles);
    return (
        <div className="profile-page profile">
            <a href="/profile/edit" className="profile__tile profile__info">
                <img
                    className="profile__info-image"
                    src={data?.photoUrl ? `${baseURL}/files/download/${data?.photoUrl}` : 'https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg'}
                    alt="Profile"
                />
                <div className="profile__info-data">
                    <div className="profile__info-type">{roleState?.isPerformer ? 'Исполнитель' : 'Заказчик'}</div>
                    <div className="profile__info-name profile__tile-bold">{data?.firstName}</div>
                    <div className="profile__info-phone">{data?.username}</div>
                </div>
                <ReactSVG src={ArrowIcon} className="profile__tile-icon profile__info-arrow" />
            </a>
            <div className="profile__tiles">
                <a href="#" className="profile__tile profile__docs">
                    <ReactSVG src={ClipboardIcon} className="profile__tile-icon profile__docs-icon reactsvg"/>
                    <div className="profile__docs-text">Документы проверены</div>
                </a>
                <a href="#" className="profile__tile profile__rating">
                    <div
                        className="profile__rating-mark profile__tile-bold">{roleState?.isPerformer ? data?.ratingExecutor : data?.ratingCustomer}</div>
                    <div className="profile__rating-text">Рейтинг в Skerr</div>
                    <ReactSVG src={StarIcon} className="profile__tile-icon profile__rating-icon"/>
                </a>
                <a href="/profile/reviews" className="profile__tile profile__reviews">
                    <div className="profile__reviews-mark profile__tile-bold">{reviews ? reviews.length : 0}</div>
                    <div className="profile__reviews-text">Отзыва о работе</div>
                    <ReactSVG src={MessageIcon} className="profile__tile-icon profile__reviews-icon"/>
                </a>
            </div>

            <ProfileMenu items={listGroupItems}/>

            {roleState?.isPerformer ? (
                <Button
                    variant="dark"
                    className="profile__button profile__button--change-type"
                    onClick={setDefault}
                >
                    Я заказчик (перейти на профиль)
                </Button>
            ) : (
                <Button
                    variant="dark"
                    className="profile__button profile__button--change-type"
                    onClick={() => {
                        if (data?.roles?.some((role) => role === 'ROLE_EXECUTOR')) {
                            setRole('performer');
                            navigate('/profile');
                        } else {
                            navigate('/profile');
                        }
                    }}
                >
                    Хочу стать исполнителем
                </Button>
            )}

            <Button variant="light" onClick={handleLogout} className="profile__button profile__button--exit">
                Выйти из профиля
            </Button>
        </div>
    );
};

const ProfileMenu: React.FC<{ items: ListItemProps[] }> = ({ items }) => (
    <ListGroup className="profile__list">
        {items.map((item, index) => (
            <ListGroup.Item href={item.href} key={index} icon={item.icon} onClick={item.onClick}>
                {item.children}
            </ListGroup.Item>
        ))}
    </ListGroup>
);

export default Profile;