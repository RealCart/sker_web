import { api } from "@/api/instance";
import { AxiosRequestConfig } from "axios";

export const sendFCMToken = async (token: String) => {
  const response = await api.post<IReport>(`/user/fcmToken`, token);
  return response.data;
};
