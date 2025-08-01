import { api } from "@/api/instance";
import { AxiosRequestConfig } from "axios";

interface RequestOrderParams {
	config?: AxiosRequestConfig;
	data?: IReport
}

export const postReport = async ({ data }: RequestOrderParams) => {
	const response = await api.post<IReport>(`/application`, data);
	return response.data;
}
