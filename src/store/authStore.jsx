import { create } from 'zustand';
import { loginRequest, registerRequest } from '../api/authAPI'; // 1단계에서 만든 API 모듈


const useAuthStore = create((set) => ({
    // 상태: 사용자 정보와 로그인 여부
    user: null,         // 로그인한 사용자 정보 (e.g., { id: 1, loginId: "test" })
    isLoggedIn: false,  // 로그인 상태 플래그

    
    // 액션(Action): 상태를 변경하는 함수
    login: async (loginId, password) => {
        try {
            const userData = await loginRequest(loginId, password);
            // API 요청 성공 시, user 상태와 isLoggedIn 상태를 업데이트
            set({ user: userData, isLoggedIn: true });

            // 💡 로그인 정보 영속성 관리
            localStorage.setItem('user', JSON.stringify(userData));

        } catch (error) {
            console.error("로그인 실패:", error);
            // 로그인 실패 시 에러를 던져서 컴포넌트에서 후속 처리를 할 수 있게 함
            throw error;
        }
    },

    logout: () => {
        // user 상태를 비우고 로그아웃 상태로 변경
        set({ user: null, isLoggedIn: false });

        // 💡 localStorage에서도 사용자 정보 제거
        localStorage.removeItem('user');
    },

    // 앱 시작 시 로그인 상태를 확인하는 액션
    checkAuth: () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            set({ user: JSON.parse(storedUser), isLoggedIn: true });
        }
        else {
            console.error("로그인 상태 반영 안됨");
        }
    },

    register: async (loginId, password) => {
        let res;
        try {
            const res = await registerRequest(loginId, password);
        } catch (error) {
            console.error("회원가입 실패:", error);
            throw error; // 컴포넌트에서 에러를 처리할 수 있도록 전파
        }
    },


}));



// 앱 시작 시 localStorage를 확인하여 로그인 상태를 복원
useAuthStore.getState().checkAuth();

export default useAuthStore;