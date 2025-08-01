import { api } from "@/api/instance";
import { AxiosRequestConfig } from "axios";

interface RequestCostParams {
	config?: AxiosRequestConfig;
	id?: number;
	data?: ICost
}

export const postCost = async ({ data }: RequestCostParams) => {
	const response = await api.post<ICost>(`/cost`, data);
	return response.data;
} 