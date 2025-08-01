import { api } from "@/api/instance";
import { AxiosRequestConfig } from "axios";

interface RequestAuthParams {
	config?: AxiosRequestConfig;
	phone?: string;
	password?: number;
	sms?: number
}

export const getSendSMS = async ({ phone }: RequestAuthParams) => {
	const response = await api.get<checkPhone>(`/auth/sendSms/${phone}`);
	return response.data;
}
export const postVerifySMS = async ({ phone, sms }: RequestAuthParams) => {
	const response = await api.post<string>(`/auth/verifySms`, { phone, sms });
	localStorage.setItem('jwtToken', response.data);
	return response.data;
}