import { create } from 'zustand';
// API 함수 이름을 정확하게 import 합니다.
import { getFridgeIngredients, addIngredient, updateIngredients, deleteIngredient } from '../api/fridgeAPI';

// 스토어 내부에서 사용할 기본 페이지 옵션
const defaultPageable = { page: 0, size: 20, sort: 'createdAt,desc' };

const useFridgeStore = create((set, get) => ({
    // State
    ingredients: [],
    isLoading: true,

    // Actions
    /**
     * 초기 재료 목록을 불러옵니다.
     */
    fetchIngredients: async (memberId) => {
        set({ isLoading: true });
        try {
            const data = await getFridgeIngredients(memberId, defaultPageable);
            if (data && data.content) {
                set({ ingredients: data.content, isLoading: false });
            }
        } catch (error) {
            console.error("Failed to fetch ingredients:", error);
            set({ isLoading: false });
        }
    },

    /**
     * 새 재료를 추가합니다.
     */
    addIngredient: async (ingredientData, memberId) => {
        try {
            const updatedPage = await addIngredient(ingredientData, memberId, defaultPageable);
            // 서버가 반환한 최신 목록으로 상태를 업데이트합니다.
            set({ ingredients: updatedPage.content });
        } catch (error) {
            console.error("Failed to add ingredient:", error);
        }
    },

    /**
     * 단일 재료를 업데이트합니다. (서버 API는 배열을 받도록 되어있음)
     */
    updateSingleIngredient: async (updateRequest, memberId) => {
        // updateRequest 예시: { fridgeIngredientId: 1, count: 5, memo: "수정된 메모" }
        try {
            // 서버 API는 배열을 받으므로, 단일 객체를 배열로 감싸서 보냅니다.
            const updatedPage = await updateIngredients([updateRequest], memberId, defaultPageable);
            set({ ingredients: updatedPage.content });
        } catch (error) {
            console.error("Failed to update ingredient:", error);
        }
    },

    /**
     * 재료를 삭제합니다.
     */
    deleteIngredient: async (fridgeIngredientId, memberId) => {
        try {
            const updatedPage = await deleteIngredient(fridgeIngredientId, memberId, defaultPageable);
            set({ ingredients: updatedPage.content });
        } catch (error) {
            console.error("Failed to delete ingredient:", error);
        }
    },
}));

export default useFridgeStore;