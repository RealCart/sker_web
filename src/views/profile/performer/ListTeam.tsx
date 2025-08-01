import React, {useEffect, useContext, useState} from "react";
import {HeaderContext, useHeader} from "@/provider/headerContext.tsx";
import TeamCard, {TeamCardProps} from "@/components/ui/cards/teamCard/TeamCard.tsx";
import "./ListTeam.scss";
import {Dropdown, Button} from "react-bootstrap";
import {ReactSVG} from "react-svg";
import Filter from "@/assets/icons/dots.svg";
import TrashIcon from "@/assets/icons/trash.svg";
import VehicleIcon from "@/assets/icons/VehicleIcon.svg";

const ProfileListTeam: React.FC = () => {
    const context = useContext(HeaderContext);
    const {setHeaderSlot} = useHeader();

    // Проверяем, что контекст существует
    if (!context) {
        throw new Error("HeaderContext must be provided");
    }

    const {setHeaderTitle, setShowBackButton} = context;

    // Состояние для хранения списка команды
    const [teamList, setTeamList] = useState<TeamCardProps[]>([
        {
            job: "Специалист",
            name: "Иван Иванов",
            phone: "+7 800 00 12 50",
        },
        {
            job: "Специалист",
            name: "Петр Петров",
            phone: "+7 800 00 12 51",
        },
        {
            job: "Специалист",
            name: "Сидор Сидоров",
            phone: "+7 800 00 12 52",
        },
    ]);

    // Состояние для режима выбора
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    useEffect(() => {
        setHeaderTitle("Моя команда");
        setShowBackButton(true);
        setHeaderSlot(
            <Dropdown data-bs-theme="dark">
                <Dropdown.Toggle variant="info" className="btn-filter">
                    <ReactSVG src={Filter} className="reactsvg"/>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item
                        style={{color: "#F55353"}}
                        onClick={() => setIsSelectionMode(true)}
                    >
                        Удалить оператора
                        <ReactSVG src={TrashIcon} className="reactsvg"/>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    }, [setHeaderTitle, setHeaderSlot, setShowBackButton]);

    // Обработчик выбора/отмены выбора карточки
    const handleCheckboxChange = (index: number) => {
        setSelectedItems((prev) =>
            prev.includes(index)
                ? prev.filter((item) => item !== index) // Убрать из выбранных
                : [...prev, index] // Добавить в выбранные
        );
    };

    // Удаление выбранных карточек
    const handleDeleteSelected = () => {
        setTeamList((prev) => prev.filter((_, index) => !selectedItems.includes(index)));
        setSelectedItems([]); // Очистить выбранные элементы
        setIsSelectionMode(false); // Выключить режим выбора
    };

    return (
        <div className="team-list page">
            {
                teamList.length > 0 ?
                    (
                        <>
                            {
                                teamList.map((team, index) => (
                                    <div key={index} className="team-card-container">
                                        <TeamCard
                                            job={team.job}
                                            name={team.name}
                                            phone={team.phone}
                                            showCheckbox={isSelectionMode}
                                            isChecked={selectedItems.includes(index)}
                                            onCheckboxChange={() => handleCheckboxChange(index)}
                                        />
                                    </div>
                                ))
                            }
                            {isSelectionMode && (
                                <Button variant="danger" onClick={handleDeleteSelected}>
                                    Удалить выбранные
                                </Button>
                            )}
                        </>
                    ) : (
                        <>
                            <div className="team-list__empty">
                                <ReactSVG src={VehicleIcon} className="team-list__empty-icon"/>
                                <div className="team-list__empty-text">
                                    После добавления, здесь будут отображаться ваши операторы
                                </div>
                            </div>
                        </>
                    )

            }
            {}

        </div>
    );
};

export default ProfileListTeam;