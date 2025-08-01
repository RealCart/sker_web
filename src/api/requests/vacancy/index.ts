import { api } from "@/api/instance";
import { AxiosRequestConfig } from "axios";

interface RequestVacancyParams {
	config?: AxiosRequestConfig;
	id?: number;
	data?: IVacancy
	filterData?: IVacancyFilter
}

export const postVacancy = async ({ data }: RequestVacancyParams) => {
	const response = await api.post<IVacancy>(`/vacancy`, data);
	return response.data;
}

export const putVacancy = async ({ data }: RequestVacancyParams) => {
	const response = await api.put<IVacancy>(`/vacancy`, data);
	return response.data;
}


export const getVacancyList = async ({ filterData }: RequestVacancyParams) => {

	console.log('filterData', filterData);
	const response = await api.post<IVacancy[]>(`/vacancy/list`, { ...filterData, typeOfEmployment: filterData?.typeOfEmployment && filterData?.typeOfEmployment.map((item) => item.name) });
	return response.data;
}

export const getMyVacancyList = async ({ filterData }: RequestVacancyParams) => {
	const response = await api.post<IVacancyAndResume[]>(`/vacancy/allMyList`, { ...filterData, typeOfEmployment: filterData?.typeOfEmployment && filterData?.typeOfEmployment.map((item) => item.name) });
	return response.data;
}

export const getVacancy = async ({ id }: RequestVacancyParams) => {
	const response = await api.get<IVacancy>(`/vacancy/${id}`);
	return response.data;
}

// Резюме

export const postResume = async ({ data }: RequestVacancyParams) => {
	const response = await api.post<any>(`/resume`, data);
	return response.data;
}

export const putResume = async ({ data }: RequestVacancyParams) => {
	const response = await api.post<any>(`/resume`, data);
	return response.data;
}

export const getResumeList = async ({ filterData }: RequestVacancyParams) => {
	const response = await api.post<IResume[]>(`/resume/list`, { ...filterData, typeOfEmployment: filterData?.typeOfEmployment && filterData?.typeOfEmployment.map((item) => item.name) });
	return response.data;
}

export const getMyResumeList = async () => {
	const response = await api.post<IResume[]>(`/resume/myList`);
	return response.data;
}

export const getResume = async ({ id }: RequestVacancyParams) => {
	const response = await api.get<IResume>(`/resume/${id}`);
	return response.data;
}
