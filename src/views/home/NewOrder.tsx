// NewOrder.tsx
import React, {useState, useRef, useEffect} from "react";
import "./NewOrder.scss";
import {useFetchVehicelType} from "@/api/queries/useVehicleQuery";
import {convertDateFormat} from "@/utils/convertDate";
import {ReactSVG} from "react-svg";
import {
    Button,
    FloatingLabel,
    InputGroup,
} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {Typeahead} from "react-bootstrap-typeahead";
import SearchIcon from "@/assets/icons/search.svg";
import LocationIcon from "@/assets/icons/location.svg";
import EvacuationIcon from "@/assets/icons/evacuationLocation.svg";
import {BottomSheet} from "react-spring-bottom-sheet";
import BackArrow from "@/assets/icons/arrow-left.svg";

// Типы данных
interface IDefault {
    id: number;
    name: string;
}

interface IOrder {
    orderDate?: string;
    orderTime?: string;
    vehicleType: IDefault[];
    types?: Array<{ id: number; name: string }>;
    vehicleAddress?: string;
    deliveryAddress?: string;
}

const NewOrder = () => {
    // Состояния
    const [selectedDate] = useState<string>(new Date().toLocaleDateString("ru-RU"));
    const [orderData, setOrderData] = useState<IOrder>({
        orderDate: convertDateFormat(selectedDate),
        vehicleType: [],
    });
    const [searchTerm, setSearchTerm] = useState<string>("");
    const searchRef = useRef<HTMLDivElement>(null);
    const typeaheadRef = useRef<any>(null); // Реф для управления Typeahead
    const {data: vehicleCategories} = useFetchVehicelType();

    // Состояние для BottomSheet
    const [showBottomSheet, setShowBottomSheet] = useState(false);

    // Фильтрация техники по поисковому запросу
    const filteredTechniques = vehicleCategories
        ?.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .map((item) => ({id: item.id, name: item.name}));

    // Обработка клика вне области поиска
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setSearchTerm(""); // Очищаем поле поиска при клике вне области
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Удаление выбранного типа техники
    const handleRemoveVehicleType = (idToRemove: number) => {
        setOrderData((prevState) => ({
            ...prevState,
            vehicleType: prevState.vehicleType?.filter((type) => type.id !== idToRemove),
        }));
    };

    // Добавление выбранного типа техники
    const handleTypeSelect = (selected: Array<{ id: number; name: string }>) => {
        if (selected.length > 0) {
            const selectedItem = selected[0]; // Берем первый выбранный элемент

            // Проверяем, что элемент еще не добавлен
            if (!orderData.vehicleType?.some((type) => type.id === selectedItem.id)) {
                setOrderData((prevState) => ({
                    ...prevState,
                    vehicleType: [...(prevState.vehicleType || []), selectedItem],
                }));

                // Очищаем поле Typeahead
                if (typeaheadRef.current) {
                    typeaheadRef.current.clear();
                }
                setSearchTerm(""); // Очищаем строку поиска
            }
        }
    };

    return (
        <div className="new-order">
            {/* Основная форма */}
            <div className="form-container">
                <h2 className="form-title mb-3">Расскажите о своей задаче и мы подберем исполнителя</h2>

                {/* Поисковый инпут для техники */}
                <div className="technique-search" ref={searchRef}>
                    <InputGroup className="form-search mb-3">
                        <Typeahead
                            id="basic-typeahead-single"
                            ref={typeaheadRef}
                            className="form-control"
                            labelKey="name"
                            emptyLabel="Нет результатов"
                            options={filteredTechniques || []}
                            placeholder="Какая техника понадобится"
                            onChange={(selected) => {
                                // Приводим типы к совместимому виду
                                const typedSelected = selected as Array<{ id: number; name: string }>;
                                handleTypeSelect(typedSelected);
                            }}
                        />
                        <InputGroup.Text>
                            <ReactSVG src={SearchIcon}/>
                        </InputGroup.Text>
                    </InputGroup>
                </div>

                {/* Выбранные типы техники */}
                {orderData.vehicleType.length > 0 && (
                    <div className="selected-types mb-3">
                        {orderData.vehicleType.map((item) => {
                            // Проверяем, что item.id существует
                            const itemId = item.id ?? -1; // Если id undefined, используем значение по умолчанию (-1)
                            return (
                                <button
                                    key={itemId} // Теперь key точно определен
                                    className="selected-type"
                                    onClick={() => handleRemoveVehicleType(itemId)} // Передаем itemId
                                >
                                    {item.name}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Поля адреса */}
                <InputGroup className="mb-3">
                    <FloatingLabel controlId="floatingInput" label="Стоимость работ">
                        <Form.Control type="number" placeholder="Стоимость работ"/>
                    </FloatingLabel>
                    <InputGroup.Text>₸</InputGroup.Text>
                </InputGroup>

                {/* Дата и время */}
                <div className="date-time__name mb-3">Укажите дату и время</div>
                <div className="date-time mb-3">
                    <FloatingLabel controlId="floatingInput" label="Дата" className="w-100">
                        <Form.Control type="date" placeholder="Дата"/>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Время" className="w-100">
                        <Form.Control type="time" placeholder="Время"/>
                    </FloatingLabel>
                </div>

                {/* Кнопка "Уточнить детали" */}
                <Button variant="primary" className="w-100" onClick={() => setShowBottomSheet(true)}>
                    Уточнить детали
                </Button>
            </div>

            {/* Bottom Sheet */}
            <BottomSheet
                open={showBottomSheet}
                onDismiss={() => setShowBottomSheet(false)}
            >
                <div className="bottom-sheet__header">
                    <button className="bottom-sheet__header-back" onClick={() => setShowBottomSheet(false)}>
                        <img src={BackArrow} className="layout__back-button-image" width={15} height={15}/>
                    </button>
                    <span className="bottom-sheet__header-title">
                        Эвакуатор<br/>
                        опишите детали задачи
                    </span>
                </div>
                <div className="bottom-sheet__body">
                    <FloatingLabel className="mb-3" controlId="floatingInput" label="Марка автомобиля*">
                        <Form.Control type="text" placeholder="Марка автомобиля*"/>
                    </FloatingLabel>
                    <p className="fw-bold" style={{marginBottom: '12px'}}>Укажите адрес</p>
                    <InputGroup className="mb-3">
                        <FloatingLabel controlId="floatingInput" label="Адрес подачи*">
                            <Form.Control type="text" placeholder="Адрес подачи*"/>
                        </FloatingLabel>
                        <InputGroup.Text>
                            <ReactSVG src={LocationIcon} width={20} height={20}/>
                        </InputGroup.Text>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FloatingLabel controlId="floatingInput" label="Адрес доставки*">
                            <Form.Control type="text" placeholder="Адрес доставки*"/>
                        </FloatingLabel>
                        <InputGroup.Text>
                            <ReactSVG src={EvacuationIcon} width={20} height={20}/>
                        </InputGroup.Text>
                    </InputGroup>
                    <p className="fw-bold" style={{marginBottom: '12px'}}>Подробнее</p>
                    <Form.Control className="mb-3" as="textarea"
                                  placeholder="Опишите требования и пожелания  к технике, к исполнителю"
                                  style={{minHeight: '150px'}}/>
                    <Button variant="outline-primary" className="w-100">
                        Приложите фото или документ
                    </Button>
                </div>

                <div className="bottom-sheet__footer">
                    <Button variant="primary" className="w-100">
                        Оформить заказ
                    </Button>
                </div>
            </BottomSheet>
        </div>
    );
};

export default NewOrder;