// App.tsx
import React from 'react';
import './styles/global.scss';
import {Route, Routes} from 'react-router-dom';
import Home from './views/home/Home.tsx';
import AllVehicles from './views/home/AllVehicles.tsx';
import Profile from './views/profile/Profile.tsx';
import Reviews from './views/profile/Reviews.tsx';
import MyReviews from './views/profile/MyReviews.tsx';
import AddMoney from './views/profile/AddMoney.tsx';
import {HeaderProvider} from '@/provider/headerContext.tsx';
import Transactions from "@/views/profile/Transactions.tsx";
import Edit from "@/views/profile/Edit.tsx";
import Politics from "@/views/profile/Politics.tsx";
import Support from "@/views/profile/Support.tsx";
import ProfileAbout from "@/views/profile/AboutApp.tsx";
import Conditions from "@/views/profile/Conditions.tsx";
import ProfileNotifications from "@/views/profile/Notifications.tsx";
import OrderStats from "@/views/orders/OrderStats.tsx";
import AuthPhone from "@/views/auth/authPhone.tsx";
import AuthCode from "@/views/auth/authCode.tsx";
import {RoleProvider} from "@/provider/roleContext.tsx";
import OrdersPage from './views/orders/Orders.tsx';
import OrderInfo from './views/orders/[id].tsx';
import {TabProvider} from "@/provider/TabContext.tsx";
import DefaultLayout from "@/layouts/DefaultLayout.tsx";
import DarkLayout from "@/layouts/DarkLayout.tsx";
import Index from "@/views/Index.tsx";
import EmptyLayout from "@/layouts/EmptyLayout.tsx";
import ProfileTeam from "@/views/profile/performer/Team.tsx";
import ProfileAddTeam from "@/views/profile/performer/AddTeam.tsx";
import ProfileListTeam from "@/views/profile/performer/ListTeam.tsx";
import AddVacancy from "@/views/vacancies/AddVacancy.tsx";
import PlaceVacancy from "@/views/vacancies/PlaceVacancy.tsx";
import VacanciesPage from "@/views/vacancies/VacanciesPage.tsx";

function App() {

    return (
        <HeaderProvider>
            <RoleProvider>
                <TabProvider>
                    <Routes>
                        {/* AUTH */}
                        <Route path="/auth" element={<EmptyLayout><AuthPhone/></EmptyLayout>}/>
                        <Route path="/auth/code" element={<EmptyLayout><AuthCode/></EmptyLayout>}/>
                        <Route path="/auth/userInfo" element={<EmptyLayout><AuthCode/></EmptyLayout>}/>

                        {/* MAIN */}
                        <Route path="/" element={<EmptyLayout><Index/></EmptyLayout>}/>
                        <Route path="/home" element={<DefaultLayout><Home/></DefaultLayout>}/>
                        <Route path="/home/all-vehicles" element={<DefaultLayout><AllVehicles/></DefaultLayout>}/>

                        {/* ORDERS */}
                        <Route path="/orders" element={<DefaultLayout><OrdersPage/></DefaultLayout>}/>
                        <Route path="/orders/stats" element={<DefaultLayout><OrderStats/></DefaultLayout>}/>
                        <Route path="/orders/:id" element={<DarkLayout><OrderInfo/></DarkLayout>}/>

                        {/* VACANCIES */}
                        <Route path="/vacancies" element={<DefaultLayout><VacanciesPage/></DefaultLayout>}/>
                        <Route path="/vacancies/add" element={<DefaultLayout><AddVacancy/></DefaultLayout>}/>
                        <Route path="/vacancies/place" element={<DefaultLayout><PlaceVacancy/></DefaultLayout>}/>

                        {/* PROFILE */}
                        <Route path="/profile" element={<DefaultLayout><Profile/></DefaultLayout>}/>
                        <Route path="/profile/reviews" element={<DefaultLayout><Reviews/></DefaultLayout>}/>
                        <Route path="/profile/my-reviews" element={<DefaultLayout><MyReviews/></DefaultLayout>}/>
                        <Route path="/profile/add-money" element={<DefaultLayout><AddMoney/></DefaultLayout>}/>
                        <Route path="/profile/transactions"
                               element={<DefaultLayout><Transactions/></DefaultLayout>}/>
                        <Route path="/profile/edit" element={<DefaultLayout><Edit/></DefaultLayout>}/>
                        <Route path="/profile/support" element={<DefaultLayout><Support/></DefaultLayout>}/>
                        <Route path="/profile/notifications"
                               element={<DefaultLayout><ProfileNotifications/></DefaultLayout>}/>
                        <Route path="/profile/about" element={<DefaultLayout><ProfileAbout/></DefaultLayout>}/>
                        <Route path="/profile/politics" element={<DefaultLayout><Politics/></DefaultLayout>}/>
                        <Route path="/profile/conditions" element={<DefaultLayout><Conditions/></DefaultLayout>}/>
                        <Route path="/profile/team" element={<DefaultLayout><ProfileTeam/></DefaultLayout>}/>
                        <Route path="/profile/team/add" element={<DefaultLayout><ProfileAddTeam/></DefaultLayout>}/>
                        <Route path="/profile/team/list" element={<DefaultLayout><ProfileListTeam/></DefaultLayout>}/>
                    </Routes>
                </TabProvider>
            </RoleProvider>
        </HeaderProvider>
    );
}

export default App;