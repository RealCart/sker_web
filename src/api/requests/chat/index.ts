import { api } from "@/api/instance";
import { AxiosRequestConfig } from "axios";

interface RequestOrderParams {
	config?: AxiosRequestConfig;
	id?: string | null;
}

export const getChat = async ({ id }: RequestOrderParams) => {
	const response = await api.get<IMessage[]>(`/chat/orders/${id}/messages`);
	return response.data;
}
