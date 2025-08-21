import { create } from 'zustand';
import {
    getBasketIngredients,
    addBasketIngredient,
    deleteBasketIngredient,
    deleteAllBasketIngredients
} from '../api/basketAPI'; // basketAPI.js 파일 경로

// 모든 API 호출에 공통적으로 사용될 페이지 정보
const defaultPageable = { page: 0, size: 20, sort: 'createdAt,desc' };

const useBasketStore = create((set, get) => ({
    // State: 컴포넌트에서 사용할 상태 값
    basketIngredients: [],
    isLoading: false,

    // Actions: 상태를 변경하는 함수들
    /** 장바구니 재료 목록을 불러옵니다. */
    fetchBasket: async (memberId) => {
        set({ isLoading: true });
        try {
            const data = await getBasketIngredients(memberId, defaultPageable);
            if (data && data.content) {
                set({ basketIngredients: data.content, isLoading: false });
            }
        } catch (error) {
            console.error("Failed to fetch basket ingredients:", error);
            set({ isLoading: false });
        }
    },

    /** 장바구니에 재료를 추가합니다. */
    addIngredientToBasket: async (memberId, ingredientId) => {
        try {
            // API는 추가 성공 후 최신 목록을 반환해줍니다.
            const updatedPage = await addBasketIngredient(memberId, defaultPageable, ingredientId);
            // 반환된 최신 목록으로 상태를 업데이트합니다.
            set({ basketIngredients: updatedPage.content });
        } catch (error) {
            console.error("Failed to add ingredient to basket:", error);
        }
    },

    /** 장바구니에서 특정 재료를 삭제합니다. */
    removeIngredientFromBasket: async (memberId, basketIngredientId) => {
        try {
            await deleteBasketIngredient(basketIngredientId, memberId, defaultPageable);
            // 삭제 API는 최신 목록을 반환하지 않으므로,
            // 삭제 성공 후 전체 목록을 다시 불러와 상태를 동기화합니다.
            await get().fetchBasket(memberId);
        } catch (error) {
            console.error("Failed to delete ingredient from basket:", error);
        }
    },

    /** 장바구니의 모든 재료를 삭제합니다. */
    clearBasket: async (memberId) => {
        try {
            await deleteAllBasketIngredients(memberId, defaultPageable);
            // 전체 삭제 성공 후, 목록을 빈 배열로 설정합니다.
            set({ basketIngredients: [] });
        } catch (error) {
            console.error("Failed to clear basket:", error);
        }
    },
}));

export default useBasketStore;