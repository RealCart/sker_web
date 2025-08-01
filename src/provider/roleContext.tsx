import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export enum Role {
	PERFORMER = 'performer',
	CLIENT = 'client'
}

interface RoleProps {
	authState: { authenticated: boolean | null };
	LogIn: () => void;
	LogOut: () => void;
	roleState: { isPerformer: boolean | null };
	setRole: (role: 'performer' | 'client') => void;
}

const RoleContext = createContext<RoleProps>({
	authState: { authenticated: null },
	LogIn: () => {},
	LogOut: () => {},
	roleState: { isPerformer: null },
	setRole: () => {}
});

export const useRoleState = () => {
	return useContext(RoleContext);
};

export interface RoleProviderProps {
	children: ReactNode;
}

export const RoleProvider = ({ children }: RoleProviderProps) => {
	const navigate = useNavigate();
	const [roleState, setRoleState] = useState<{
		isPerformer: boolean | null,
	}>({
		isPerformer: null,
	});

	const [authState, setAuthState] = useState<{
		authenticated: boolean | null,
	}>({
		authenticated: null,
	});

	const setRole = (role: 'performer' | 'client') => {
		setRoleState({
			isPerformer: role === 'performer',
		});
		console.log(`set ${role}`)
	};

	const LogIn = () => {
		setAuthState({
			authenticated: true,
		});
	};

	const LogOut = async () => {
		localStorage.removeItem('jwtToken');
		setAuthState({
			authenticated: false,
		});
		setRoleState({
			isPerformer: null,
		});
		navigate('/app/');
	};

	useEffect(() => {
		const restoreAuthState = async () => {
			try {
				const token = localStorage.getItem('jwtToken');
				setAuthState({
					authenticated: !!token,
				});
			} catch (error) {
				console.error("Error restoring auth state:", error);
				setAuthState({
					authenticated: false,
				});
			}
		};

		restoreAuthState();
	}, []);

	const value = {
		setRole,
		roleState,
		authState,
		LogIn,
		LogOut
	};

	return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};