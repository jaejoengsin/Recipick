import { create } from 'zustand';
import * as fridgeAPI from '../api/fridgeAPI';

const useFridgeStore = create((set, get) => ({
    // 1. State: 상태 변수들
    ingredients: [],
    isLoading: true,

    // 2. Actions: 상태를 변경하는 함수들
    // 이 함수들 안에 API 호출과 상태 업데이트 로직이 모두 포함됩니다.

    // 냉장고 재료 초기 데이터 로드
    fetchIngredients: async (memberId) => {
        set({ isLoading: true });
        try {
            const pageable = { page: 0, size: 20, sort: 'createdAt,desc' };
            const data = await fridgeAPI.getFridgeIngredients(memberId, pageable);
            if (data && data.content) {
                set({ ingredients: data.content, isLoading: false });
            }
        } catch (error) {
            console.error("Failed to fetch ingredients:", error);
            set({ isLoading: false });
        }
    },

    // 재료 수량/메모 업데이트
    updateIngredient: async (ingredientId, updatedData) => {
        try {
            // 서버에 먼저 업데이트 요청
            await fridgeAPI.updateIngredient(ingredientId, updatedData);

            // 성공 시, 클라이언트 상태를 업데이트하여 즉시 UI에 반영
            const newList = get().ingredients.map(ing =>
                ing.fridgeIngredientId === ingredientId ? { ...ing, ...updatedData } : ing
            );
            set({ ingredients: newList });

        } catch (error) {
            console.error("Failed to update ingredient:", error);
            // 에러 발생 시 사용자에게 알림을 주는 로직 추가 가능
        }
    },

    // 재료 삭제
    deleteIngredient: async (ingredientId) => {
        try {
            // 서버에 먼저 삭제 요청
            await fridgeAPI.deleteIngredient(ingredientId);

            // 성공 시, 클라이언트 상태에서 해당 아이템을 제거하여 즉시 UI에 반영
            const newList = get().ingredients.filter(ing => ing.fridgeIngredientId !== ingredientId);
            set({ ingredients: newList });

        } catch (error) {
            console.error("Failed to delete ingredient:", error);
        }
    },
}));

export default useFridgeStore;

