import axios from "axios";

export const baseURL = `https://api.skerr.kz`;


export const api = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	},
})

// Модификация интерцептора
api.interceptors.request.use(
	async (config) => {

		const excludedPaths = ['/auth/sendSms', '/auth/authenticate', '/auth/verifySms'];

		if (!excludedPaths.some((path) => config.url?.startsWith(path))) {
			const token = localStorage.getItem('jwtToken');
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		}

		if (config.method === 'get') {
			config.headers['Content-Type'] = 'application/json';
			config.headers['Accept'] = 'application/json';
		}

		return config;

	},
	(error) => Promise.reject(error)
);

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const excludedPaths = ['/auth/authenticate', '/user/view'];

		if (error.response?.status === 401 && !excludedPaths.some((path) => error.config.url?.startsWith(path))) {
			await localStorage.removeItem('jwtToken');
			// router.replace('/first-intro-screen');
		}
		return Promise.reject(error);
	}
);
