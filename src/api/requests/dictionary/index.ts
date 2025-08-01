import { api } from "@/api/instance";

export const getCitiesList = async () => {
	const response = await api.get<ICity[]>(`/dictionary/city/list`);
	return response.data;
}