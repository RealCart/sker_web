import React, { useEffect, useState } from 'react';
import { useHeader } from '@/provider/headerContext';
import Form from "react-bootstrap/Form";
import { Button, FloatingLabel, InputGroup } from "react-bootstrap";
import './AddVacancy.scss';
import Multiselect from "@/components/shared/multiselect/multiselect.tsx";
import { useMask } from "@react-input/mask";
import {useNavigate} from "react-router-dom";

const AddVacancy: React.FC = () => {
    const { setHeaderTitle, setShowBackButton } = useHeader();

    // Установка заголовка и кнопки "Назад"
    useEffect(() => {
        setHeaderTitle('Разместить вакансию');
        setShowBackButton(true);
    }, [setHeaderTitle, setShowBackButton]);

    // Опции для типа занятости
    const cityOptions = [
        { value: 'fulltime', label: 'Полная занятость' },
        { value: 'small', label: 'Сменный график' },
        { value: 'parttime', label: 'Подработка' },
        { value: 'watch', label: 'Вахта' },
    ];

    // Состояния для полей формы
    const [position, setPosition] = useState<string>(() => localStorage.getItem('positionVacancyForm') || '');
    const [selectedCities, setSelectedCities] = useState<string[]>(() => JSON.parse(localStorage.getItem('selectedCitiesVacancyForm') || '[]'));
    const [salary, setSalary] = useState<number | ''>(() => Number(localStorage.getItem('salaryVacancyForm')) || '');
    const [isAgreementChecked, setIsAgreementChecked] = useState<boolean>(() => JSON.parse(localStorage.getItem('isAgreementCheckedVacancyForm') || 'false'));
    const [companyName, setCompanyName] = useState<string>(() => localStorage.getItem('companyNameVacancyForm') || '');
    const [companyActivity, setCompanyActivity] = useState<string>(() => localStorage.getItem('companyActivityVacancyForm') || '');
    const [details, setDetails] = useState<string>(() => localStorage.getItem('detailsVacancyForm') || '');
    const [phone, setPhone] = useState<string>(() => localStorage.getItem('phoneVacancyForm') || '');
    const [whatsapp, setWhatsapp] = useState<string>(() => localStorage.getItem('whatsappVacancyForm') || '');

    const navigate = useNavigate();

    // Минимальное и максимальное значение зарплаты
    const MIN_SALARY = 10000;
    const MAX_SALARY = 1000000;

    // Проверка валидности формы
    const isFormValid = (): boolean => {
        return (
            position.trim() !== '' &&
            selectedCities.length > 0 &&
            (isAgreementChecked || (typeof salary === 'number' && salary >= MIN_SALARY && salary <= MAX_SALARY)) &&
            companyName.trim() !== '' &&
            companyActivity.trim() !== '' &&
            details.trim() !== '' &&
            phone.replace(/[\s()]/g, '').length > 9
        );
    };

    const submitForm = (): void => {
        navigate('/app/vacancies/place');
    }

    // Сохранение данных в localStorage при изменении состояний
    useEffect(() => {
        localStorage.setItem('positionVacancyForm', position);
    }, [position]);

    useEffect(() => {
        localStorage.setItem('selectedCitiesVacancyForm', JSON.stringify(selectedCities));
    }, [selectedCities]);

    useEffect(() => {
        localStorage.setItem('salaryVacancyForm', String(salary));
    }, [salary]);

    useEffect(() => {
        localStorage.setItem('isAgreementCheckedVacancyForm', JSON.stringify(isAgreementChecked));
    }, [isAgreementChecked]);

    useEffect(() => {
        localStorage.setItem('companyNameVacancyForm', companyName);
    }, [companyName]);

    useEffect(() => {
        localStorage.setItem('companyActivityVacancyForm', companyActivity);
    }, [companyActivity]);

    useEffect(() => {
        localStorage.setItem('detailsVacancyForm', details);
    }, [details]);

    useEffect(() => {
        localStorage.setItem('phoneVacancyForm', phone);
    }, [phone]);

    useEffect(() => {
        localStorage.setItem('whatsappVacancyForm', whatsapp);
    }, [whatsapp]);

    return (
        <div className="add-vacancy page">
            <div className="add-vacancy__block">
                <FloatingLabel controlId="floatingInput" label="Должность">
                    <Form.Control
                        type="text"
                        placeholder="Должность"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                    />
                </FloatingLabel>
                <Multiselect
                    options={cityOptions}
                    selectedValues={selectedCities}
                    setSelectedValues={setSelectedCities}
                    placeholder="Тип занятости"
                    label="Тип занятости"
                />
                <h2>Заработная плата</h2>
                <InputGroup>
                    <FloatingLabel controlId="floatingInput" label="Стоимость работ">
                        <Form.Control
                            type="number"
                            placeholder="Стоимость работ"
                            value={salary}
                            disabled={isAgreementChecked}
                            onChange={(e) => {
                                const value = e.target.value === '' ? '' : Number(e.target.value);
                                if (value === '' || ( value <= MAX_SALARY)) {
                                    setSalary(value);
                                }
                            }}
                        />
                    </FloatingLabel>
                    <InputGroup.Text>₸</InputGroup.Text>
                </InputGroup>
                <Form.Check
                    reverse
                    type="checkbox"
                    id="agreement"
                    className="add-vacancy__check"
                    label="По договоренности"
                    checked={isAgreementChecked}
                    onChange={(e) => setIsAgreementChecked(e.target.checked)}
                />
            </div>
            <div className="add-vacancy__block">
                <h2>О компании</h2>
                <FloatingLabel controlId="floatingInput" label="Наименование компании">
                    <Form.Control
                        type="text"
                        placeholder="Наименование компании"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </FloatingLabel>
                <FloatingLabel controlId="floatingInput" label="Деятельность компании">
                    <Form.Control
                        type="text"
                        placeholder="Деятельность компании"
                        value={companyActivity}
                        onChange={(e) => setCompanyActivity(e.target.value)}
                    />
                </FloatingLabel>
            </div>
            <div className="add-vacancy__block">
                <h2>Детали требований к кандидату</h2>
                <Form.Control
                    className="mb-3"
                    as="textarea"
                    placeholder="Опишите требования и пожелания к технике, к исполнителю"
                    style={{ minHeight: '150px' }}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                />
                <Button variant="info">Приложите фото или документ</Button>
            </div>
            <div className="add-vacancy__block">
                <h2>Контакты</h2>
                <div className="add-vacancy__text">
                    Обращаем внимание! Все оставленные тут контакты видны и коммуникация ведется по оставленным контактам
                </div>
                <Form.Group className="add-team__input form-tel">
                    <Form.Control
                        ref={useMask({
                            mask: '(____) ______',
                            replacement: { _: /\d/ },
                        })}
                        type="tel"
                        className={`form-tel`}
                        required
                        placeholder="(0000) 00000"
                        minLength={8} // Минимальная длина ввода
                        maxLength={14} // Максимальная длина ввода
                        pattern="^\(\d{4}\) \d{5}$" // Регулярное выражение для маски
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </Form.Group>
                <FloatingLabel controlId="floatingInput" label="Whatsapp">
                    <Form.Control
                        type="text"
                        placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                    />
                </FloatingLabel>
            </div>
            <Button
                disabled={!isFormValid()}
                onClick={() => submitForm()}
            >
                Далее
            </Button>
        </div>
    );
};
export default AddVacancy;

