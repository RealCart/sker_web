import {useRoleState} from "@/provider/roleContext.tsx";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import './Index.scss';


import SkerrLogoIcon from "@/assets/images/Skerr_logo.png"

function Index() {
    const { authState, roleState } = useRoleState();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(authState)
        const timer = setTimeout(() => {
            if (authState?.authenticated && roleState?.isPerformer) {
                navigate("/app/home");
            } else if (authState?.authenticated && !roleState?.isPerformer) {
                navigate("/app/home");
            } else {
                navigate("/app/auth");
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [authState?.authenticated, roleState]);

    return (
        <div className="page index">
            <img src={SkerrLogoIcon} alt="Логотип Skerr"/>
        </div>
    );
}

export default Index;