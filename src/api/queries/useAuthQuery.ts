
import { useMutation } from "@tanstack/react-query";
import { getSendSMS, postVerifySMS } from "../requests/auth";
import { useNavigate } from "react-router-dom";

export function useSendSMS() {

	return useMutation({
		mutationFn: (phone: string) => getSendSMS({ phone }),
		onSuccess: (data) => {
			try {
				const phoneValue = data.phone;
				const isExist = String(data.exist)
				localStorage.setItem('phone', phoneValue);
				localStorage.setItem('isUserExist', isExist);
			} catch (error) {
				console.error('Failed to save phone in AsyncStorage:', error);
			}
		}
	})
}

export function useSignIn() {

	const navigate = useNavigate()

	return useMutation({
		mutationFn: ({ phone, sms }: { phone: string, sms: number }) => postVerifySMS({ phone, sms }),
		onSuccess: () => {
			try {
				const isExist = (localStorage.getItem('isUserExist')) === 'true';

				if (isExist) {
					navigate('/app/');
				} else {
					navigate('/app/auth/userInfo');
				}
			} catch (error) {
				console.error('Failed to handle sign-in:', error);
			}
		},
	})
}
