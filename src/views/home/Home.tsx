// HomePage.tsx
import React, {useContext, useEffect} from 'react';
import VehicleSlider from "@/components/home/vehicleSlider/VehicleSlider.tsx";
import NewOrder from "@/views/home/NewOrder.tsx";
import {HeaderContext} from "@/provider/headerContext.tsx";
import './Home.scss'

const Home: React.FC = () => {
    const context = useContext(HeaderContext);

    // Проверяем, что контекст существует
    if (!context) {
        throw new Error("HeaderContext must be provided");
    }

    const { setHeaderTitle, setShowBackButton } = context;

    useEffect(() => {
        setHeaderTitle("Часто вызывают");
    }, [setHeaderTitle, setShowBackButton]);

    return (
        <div className="home-page">
            <VehicleSlider/>
            <NewOrder/>
        </div>
    );
};

export default Home;