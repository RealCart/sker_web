import { api } from "@/api/instance";

// Тестовые данные
const TEST_PHONE = "+77083281994"; // Замените на реальный номер телефона
const TEST_SMS_CODE = '0000'; // Замените на реальный код из SMS

// Функция для тестовой авторизации
export const testAuth = async () => {
    try {
        // Шаг 1: Отправка SMS
        console.log("Отправка SMS...");
        await api.get(`/auth/sendSms/${TEST_PHONE}`);
        console.log("SMS успешно отправлено.");

        // Шаг 2: Подтверждение SMS
        console.log("Подтверждение SMS...");
        const response = await api.post<string>(`/auth/verifySms`, {
            phone: TEST_PHONE,
            sms: TEST_SMS_CODE,
        });

        // Сохранение токена
        const token = response.data;
        localStorage.setItem("jwtToken", token); // Для веба
        console.log("Токен успешно сохранён:", token);
    } catch (error) {
        console.error("Ошибка при авторизации:", error);
    }
};