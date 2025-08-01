import { createContext, useContext, useState, ReactNode } from 'react';

interface IUser {
	// Добавьте здесь поля вашего пользователя
	id: string;
	firstName: string;
	middleName: string;
	photoUrl?: string;
	ratingExecutor?: number;
	ratingCustomer?: number;
}

interface UserContextProps {
	userState: IUser | null;
	getUser: (data: IUser) => void;
	updateUser: (data: IUser) => void;
}

const UserContext = createContext<UserContextProps>({
	userState: null,
	getUser: () => {},
	updateUser: () => {}
});

export const useUserState = () => {
	return useContext(UserContext);
};

interface UserProviderProps {
	children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
	const [userState, setUserState] = useState<IUser | null>(null);

	const getUser = (data: IUser) => {
		console.log('user:', data);
		setUserState(data);
	};

	const updateUser = (data: IUser) => {
		setUserState(data);
	};

	const value = {
		userState,
		getUser,
		updateUser
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};