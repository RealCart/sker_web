import { api } from "@/api/instance";
import { AxiosRequestConfig } from "axios";

interface RequestVehicleParams {
	config?: AxiosRequestConfig;
	data?: IUser
	vehicle?: IVehicle
	vehicles?: number[]
	id?: string
}


export const getVehicleCategoryList = async () => {
	const response = await api.get<IDefault[]>(`/vehicle/vehicleType/list`);
	return response.data;
}

export const getVehicleTypeList = async () => {
	const response = await api.get<IDefault[]>(`/vehicle/vehicleType/list`);
	return response.data;
}

export const getVehicleModelList = async () => {
	const response = await api.get<VehicleModel[]>(`/vehicle/vehicleModel/list`);
	return response.data;
}

export const getVehicleBrandList = async () => {
	const response = await api.get<IDefault[]>(`/vehicle/vehicleBrand/list`);
	return response.data;
}

export const postVehicle = async ({ vehicle }: RequestVehicleParams) => {
	const response = await api.post<IVehicle>(`/vehicle`, vehicle);
	return response.data;
}

export const putVehicle = async ({ vehicle }: RequestVehicleParams) => {
	const response = await api.put<IVehicle>(`/vehicle`, vehicle);
	return response.data;
}

export const getVehicleList = async () => {
	const response = await api.get<IVehicle[]>(`/vehicle/list`);
	return response.data;
}

export const getUserVehicleList = async ({ id }: RequestVehicleParams) => {
	const response = await api.get<IVehicle[]>(`/vehicle/listByUserId/${id}`);
	return response.data;
}

export const getUserVehicleImages = async ({ id }: RequestVehicleParams) => {
	const response = await api.get<IVehicle[]>(`/vehicle/list/photo/${id}`);
	return response.data;
}



export const getVehicleMyList = async () => {
	const response = await api.get<IVehicle[]>(`/vehicle/mylist`);
	return response.data;
}


export const getVehicle = async ({ id }: RequestVehicleParams) => {
	const response = await api.get<IVehicle>(`/vehicle/${id}`);
	return response.data;
}

export const deleteVehicle = async ({ vehicles }: RequestVehicleParams) => {
	const response = await api.delete<{ ids: number[] }>(`/vehicle`, {
		data: { ids: vehicles },
	});
	return response.data;
};

export const getVehicleListByCategory = async ({ id }: RequestVehicleParams) => {
	const response = await api.get<IOrderType[]>(`/order-types/list/${id}`);
	return response.data;
}
