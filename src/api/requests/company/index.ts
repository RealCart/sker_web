import { api } from "@/api/instance";
import { AxiosRequestConfig } from "axios";

interface RequestCompanyParams {
	config?: AxiosRequestConfig;
	company?: ICompany
	id?: number
	companyId?: number
}

export const postCompany = async ({ company }: RequestCompanyParams) => {

	try {
		const response = await api.post<ICompany>(`/company`, { company });
		return response.data;
	}
	catch (err) {
		console.log(err)
	}

}

export const getMyCompany = async () => {
	const response = await api.get<ICompany[]>(`/company/getMyCompany`);
	return response.data;
}

export const getAddCompanyOperator = async ({ companyId, id }: RequestCompanyParams) => {
	const response = await api.get<ICompany>(`/company/${companyId}/${id}`);
	return response.data;
}