import { api } from "@/api/instance";
import { AxiosRequestConfig } from "axios";

interface RequestFilesParams {
	config?: AxiosRequestConfig;
	filename?: string
	formdata?: FormData
}

export const postUploadFile = async ({ formdata, ...config }: RequestFilesParams) => {
	console.log('@formdata:', formdata)

	const response = await api.postForm<string>(
		`/files/upload`,
		formdata, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	}
	)
	return response.data;
};

export const getFileUrl = async ({ filename }: RequestFilesParams) => {
	const response = await api.get<string>(`/files/url/${filename}`);
	return response.data;
}

export const getFileDownload = async ({ filename }: RequestFilesParams) => {
	const response = await api.get<ArrayBuffer>(`/files/download/${filename}`, {
		responseType: 'arraybuffer'
	});

	return response.data;
}