import axios from "axios";



const apiClient = axios.create({
    baseURL: "http://172.21.100.198:8080", // 백엔드 주소
    headers: { "Content-Type": "application/json" },
    withCredentials: true,                 // ✅ 쿠키 포함해서 요청/응답
});


export const loginRequest = async (loginId, password) => {
    try {
        const response = await apiClient.post('/api/auth/login', { // POST 요청 경로
            loginId: loginId,
            password: password
        });
        // 성공 시 응답 데이터 반환
        return response.data;
    } catch (error) {
        // 실패 시 에러 처리
        console.error("로그인 API 오류:", error);
        throw error; // 에러를 상위로 전파하여 컴포넌트에서 처리할 수 있게 함
    }
};