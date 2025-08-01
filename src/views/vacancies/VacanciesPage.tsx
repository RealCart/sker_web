import React, { useEffect, useState } from 'react';
import { useHeader } from '@/provider/headerContext';
import './VacanciesPage.scss';
import { Button, FloatingLabel, Form, InputGroup, Nav } from 'react-bootstrap';
import { ReactSVG } from 'react-svg';
import Filter from '@/assets/icons/filter.svg';
import BackArrow from '@/assets/icons/arrow-left.svg';
// import { BottomSheet } from 'react-spring-bottom-sheet';
import Multiselect from '@/components/shared/multiselect/multiselect';
import VacancyCard, { Vacancy } from '@/components/ui/cards/vacancyCard';

const useFilters = () => {
    const [selectedCities, setSelectedCities] = useState<string[]>([]);
    const [selectedBusyness, setSelectedBusyness] = useState<string[]>([]);
    const [selectedPeriod, setSelectedPeriod] = useState<string[]>([]);
    const [salaryFrom, setSalaryFrom] = useState<string>('');

    const resetFilters = () => {
        setSelectedCities([]);
        setSelectedBusyness([]);
        setSelectedPeriod([]);
        setSalaryFrom('');
    };

    // Функция для проверки активности фильтров
    const isFilterActive = () => {
        return (
            selectedCities.length > 0 ||
            selectedBusyness.length > 0 ||
            selectedPeriod.length > 0 ||
            salaryFrom.trim() !== ''
        );
    };

    return {
        selectedCities,
        setSelectedCities,
        selectedBusyness,
        setSelectedBusyness,
        selectedPeriod,
        setSelectedPeriod,
        salaryFrom,
        setSalaryFrom,
        resetFilters,
        isFilterActive,
    };
};

const VacanciesPage: React.FC = () => {
    const { setHeaderTitle, setHeaderSlot, setHeaderBottomSlot } = useHeader();
    const [activeTab, setActiveTab] = useState<'job-seekers' | 'vacancies' | 'applications'>('vacancies');
    const [showBottomSheet, setShowBottomSheet] = useState(false);

    const {
        selectedCities,
        setSelectedCities,
        selectedBusyness,
        setSelectedBusyness,
        selectedPeriod,
        setSelectedPeriod,
        salaryFrom,
        setSalaryFrom,
        resetFilters,
        isFilterActive,
    } = useFilters();

    const cityOptions = [
        { value: 'almaty', label: 'Алматы' },
        { value: 'astana', label: 'Астана' },
        { value: 'pavlodar', label: 'Павлодар' },
    ];

    const busynessOptions = [
        { value: '1', label: 'Полная занятость' },
        { value: '2', label: 'Сменный график' },
        { value: '3', label: 'Подработка' },
        { value: '4', label: 'Вахта' },
    ];

    const periodOptions = [
        { value: '1', label: 'Последняя неделя' },
        { value: '2', label: 'За месяц' },
    ];

    const jobSearchData: Vacancy[] = [
        {
            time: '5 часов назад',
            title: 'Автомеханик с опытом работы',
            location: 'г. Шымкент',
            salary: '1 200 ₸',
            views: 789,
            applicants: 3,
        },
        {
            time: '2 часа назад',
            title: 'Водитель грузового автомобиля',
            location: 'г. Нур-Султан',
            salary: '800 ₸',
            views: 456,
            applicants: 5,
        },
        {
            time: '2 часа назад',
            title: 'Главный механик по транспорту (спецтехника)',
            location: 'г. Алматы',
            salary: '1 500 ₸',
            views: 123,
            applicants: 2,
        },
    ];

    const vacanciesData: Vacancy[] = [...jobSearchData];
    const applicationsData: Vacancy[] = [
        {
            badgeType: 'published',
            title: 'Главный механик по транспорту (спецтехника)',
            location: 'г. Алматы',
            salary: '1 500 ₸',
            views: 123,
            applicants: 2,
        },
        {
            badgeType: 'archived',
            title: 'Водитель грузового автомобиля',
            location: 'г. Нур-Султан',
            salary: '800 ₸',
            views: 456,
            applicants: 5,
        },
    ];

    useEffect(() => {
        setHeaderTitle('Вакансии');
        setHeaderSlot(
            <Button
                variant="info"
                className={`btn-filter ${isFilterActive() ? 'btn-filter--active' : ''}`}
                onClick={() => setShowBottomSheet(true)}
            >
                <ReactSVG src={Filter} />
            </Button>
        );
        setHeaderBottomSlot(
            <Nav defaultActiveKey="vacancies" variant="pills" onSelect={(eventKey) => setActiveTab(eventKey as any)}>
                <Nav.Item>
                    <Nav.Link eventKey="job-seekers">Ищу работу</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="vacancies">Вакансии</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="applications">Мои заявки</Nav.Link>
                </Nav.Item>
            </Nav>
        );

        return () => {
            setHeaderTitle('');
            setHeaderSlot(undefined);
            setHeaderBottomSlot(undefined);
        };
    }, [
        setHeaderTitle,
        setHeaderSlot,
        setHeaderBottomSlot,
        selectedCities,
        selectedBusyness,
        selectedPeriod,
        salaryFrom,
    ]);

    const renderContent = () => {
        switch (activeTab) {
            case 'job-seekers':
                return jobSearchData.map((item, index) => <VacancyCard key={index} vacancy={item} />);
            case 'vacancies':
                return vacanciesData.map((item, index) => <VacancyCard key={index} vacancy={item} />);
            case 'applications':
                return applicationsData.map((item, index) => <VacancyCard key={index} vacancy={item} />);
            default:
                return null;
        }
    };

    return (
        <div className="vacancies">
            {renderContent()}
            <Button variant="primary" className="vacancies__add">
                Оставьте заявку
            </Button>
            
        </div>
    );
};

export default VacanciesPage;