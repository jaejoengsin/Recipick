import apiClient from "./apiModule";


///auth
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




export const registerRequest = async (loginId, password) => {
    try {
        const response = await apiClient.post('/api/auth/signup', { // POST 요청 경로
            loginId: loginId,
            password: password,
            checkPassword: password //나중에 없앨 계획

        });
        // 성공 시 응답 데이터 반환
        return response.data;
    } catch (error) {
        // 실패 시 에러 처리
        console.error("회원가입 API 오류:", error);
        throw error; // 에러를 상위로 전파하여 컴포넌트에서 처리할 수 있게 함
    }
};


export const getAuthMe = async () => {
    try {
        const response = await apiClient.get('/api/auth/me');
        return response.data;
    } catch (error) {
        console.error("내 정보 조회 API 오류:", error);
        throw error;
    }
};






/**
 * 로그아웃 API 요청 함수
 * 서버에 로그아웃을 요청합니다. 요청 및 응답 데이터는 없습니다.
 */
export const logoutRequest = async () => {
    try {
        // POST 메서드로 /api/auth/logout 경로에 요청을 보냅니다.
        // 요청 본문(body)이 필요 없으므로 두 번째 인자는 비워둡니다.
        await apiClient.post('/api/auth/logout');

        // 성공 시 별도의 반환 데이터가 없으므로 여기서 함수를 종료합니다.
        return;
    } catch (error) {
        // 실패 시 에러 처리
        console.error("로그아웃 API 오류:", error);
        throw error; // 에러를 상위로 전파하여 컴포넌트에서 처리할 수 있게 함
    }
};


