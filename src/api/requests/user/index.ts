import { api } from "@/api/instance";
import { AxiosRequestConfig } from "axios";

interface RequestUserParams {
	config?: AxiosRequestConfig;
	data?: IUser
	id?: number
	role?: string
	phone?: string
	companyUsers?: CompanyUsersType
}

export const getUser = async () => {
	const response = await api.get<IUser>(`/user`);
	// if (response.data && response.data.id) await AsyncStorage.setItem('userId', response.data.id.toString());
	// console.log('@CURRENT_ID:', response.data.id)
	return response.data;
}

export const putUser = async ({ data }: RequestUserParams) => {
	const response = await api.put<IUser>(`/user`, data)
	return response.data;
}

export const getUserById = async ({ id }: RequestUserParams) => {
	const response = await api.get<IUserById>(`/user/view/${id}`);
	// if (response.data && response.data.id) await AsyncStorage.setItem('partnerId', response.data.id.toString());
	// console.log('@ID:', response.data.id)
	return response.data;
}

export const getUserByPhone = async ({ phone }: RequestUserParams) => {
	const response = await api.get<IUserById[]>(`/user/${phone}`);
	return response.data;
}

export const getReviews = async ({ id, role }: RequestUserParams) => {
	const response = await api.get<IReview[]>(`/user/feedback/${id}/${role}`);
	return response.data;
}

export const deleteUsersFromCompany = async ({ companyUsers }: RequestUserParams) => {

	console.log('delData:', companyUsers)

	const response = await api.delete<IUserById[]>(`/user/company`, { data: companyUsers });
	return response.data;
}
