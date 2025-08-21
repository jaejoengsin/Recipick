import apiClient from "./apiModule";

/**
 * 냉장고 재료 목록 조회
 */
export const getFridgeIngredients = async (memberId, pageable) => {
    try {
        const params = { memberId, ...pageable };
        const response = await apiClient.get('/api/fridge/ingredients', { params });
        return response.data;
    } catch (error) {
        console.error("냉장고 재료 조회 API 오류:", error);
        throw error;
    }
};

/**
 * 냉장고에 재료 추가
 */
export const addIngredient = async (ingredientData, memberId, pageable) => {
    try {
        const params = { memberId, ...pageable };
        const response = await apiClient.post('/api/fridge/ingredients', ingredientData, { params });
        return response.data;
    } catch (error) {
        console.error("냉장고 재료 추가 API 오류:", error);
        throw error;
    }
};

/**
 * 냉장고 재료 목록 수정
 */
export const updateIngredients = async (updateRequests, memberId, pageable) => {
    try {
        const params = { memberId, ...pageable };
        const response = await apiClient.patch('/api/fridge/ingredients', updateRequests, { params });
        return response.data;
    } catch (error) {
        console.error("냉장고 재료 수정 API 오류:", error);
        throw error;
    }
};

/**
 * 냉장고 재료 삭제
 */
export const deleteIngredient = async (fridgeIngredientId, memberId, pageable) => {
    try {
        const params = { memberId, ...pageable };
        const response = await apiClient.delete(`/api/fridge/ingredients/${fridgeIngredientId}`, { params });
        return response.data;
    } catch (error) {
        console.error("냉장고 재료 삭제 API 오류:", error);
        throw error;
    }
};