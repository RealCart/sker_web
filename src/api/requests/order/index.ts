import { api } from "@/api/instance";
import { AxiosRequestConfig } from "axios";

interface RequestOrderParams {
	config?: AxiosRequestConfig;
	id?: number;
	data?: IOrder
	orderFeedback?: IOrderFeedback
	orderStatus?: 'FINISHED' | 'PROCESS' | 'PENDING' | 'DRAFT'
	userStatus?: 'CUSTOMER' | 'EXECUTOR'
	feedbackId?: number
	userId?: number
	hasFeedBack?: boolean | null
	ids?: number[]
}

export const postNewOrder = async ({ data }: RequestOrderParams) => {
	const response = await api.post<IOrder>(`/order`, data);
	return response.data;
}

export const putOrder = async ({ data }: RequestOrderParams) => {
	const response = await api.put<IOrder>(`/order`, data);
	return response.data;
}

export const getOrderList = async ({ orderStatus, userStatus, hasFeedBack }: RequestOrderParams) => {
	const response = await api.get<IOrder[]>(`/order/list/${orderStatus}/${userStatus}${hasFeedBack ? `/${hasFeedBack}` : ''}`);
	return response.data;
}

export const getFullOrderList = async ({ orderStatus }: RequestOrderParams) => {
	const response = await api.get<IOrder[]>(`/order/list/all/${orderStatus}`);
	return response.data;
}

export const getOrderListByUser = async ({ id, orderStatus }: RequestOrderParams) => {
	const response = await api.get<IOrder[]>(`/order/list/byUser/${id}/${orderStatus}`);
	return response.data;
}

export const postFetchOrdersByType = async ({ ids }: RequestOrderParams): Promise<IOrder[]> => {
	try {
		const response = await api.post<IOrder[]>('/order/listByType', {
			ids,
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching orders by type:', error);
		throw error;
	}
};


export const getOrderByID = async ({ id }: RequestOrderParams) => {
	const response = await api.get<IOrder>(`/order/${id}`);
	return response.data;
}

export const getOrderComplete = async ({ id }: RequestOrderParams) => {
	const response = await api.get<string>(`/order/${id}/done`)
	return response.data
}

// FEEDBACK

export const postFeedbackToOrder = async ({ orderFeedback }: RequestOrderParams) => {
	const response = await api.post<any>(`/orderFeedback`, orderFeedback);
	return response.data;
}

export const getOrderFeedbacks = async ({ id }: RequestOrderParams) => {
	const response = await api.get<IOrderFeedbackByOrder[]>(`/orderFeedback/byOrder/${id}`);
	return response.data;
}

export const getMyOrderList = async () => {
	const response = await api.get<IOrderFeedbackByOrder[]>(`/orderFeedback/myList`);
	return response.data;
}

export const getExecutorToOrder = async ({ id, feedbackId, userId }: RequestOrderParams) => {
	const response = await api.get<IOrder>(`/orderFeedback/setExecutor/${feedbackId}/${id}/${userId}`);
	return response.data;
}

export const getDeclineExecutor = async ({ feedbackId }: RequestOrderParams) => {
	const response = await api.get<IOrder>(`/orderFeedback/decline/${feedbackId}`);
	return response.data;
}

export const getOrderFeedbackById = async ({ id }: { id: string }) => {
	const response = await api.get<IOrderFeedbackByOrder>(`/orderFeedback/${id}`)
	return response.data
}

// Statystic

export const getOrderStatystic = async ({ userStatus }: { userStatus: 'CUSTOMER' | 'EXECUTOR' }) => {
	const response = await api.get<{ statistic: StatisticItem[] }>(`/order/stat/${userStatus}`)
	return response.data
}
