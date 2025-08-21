import apiClient from "./apiClient"; // apiClient 경로는 실제 프로젝트에 맞게 수정

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
 * @param {object} ingredientData - 추가할 재료 정보 (request body)
 */
export const addIngredient = async (ingredientData, memberId, pageable) => {
    try {
        const params = { memberId, ...pageable };
        // axios.post(URL, body, config) 형식으로, ingredientData를 request body로 보냅니다.
        const response = await apiClient.post('/api/fridge/ingredients', ingredientData, { params });
        return response.data;
    } catch (error) {
        console.error("냉장고 재료 추가 API 오류:", error);
        throw error;
    }
};

/**
 * 냉장고 재료 목록 수정 (여러 개 가능)
 * @param {array} updateRequests - 수정할 재료 정보 배열 (request body)
 */
export const updateIngredients = async (updateRequests, memberId, pageable) => {
    try {
        const params = { memberId, ...pageable };
        // axios.patch(URL, body, config) 형식으로, updateRequests 배열을 request body로 보냅니다.
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
        // 삭제 후에도 서버가 업데이트된 목록을 반환하므로 response.data를 return
        return response.data;
    } catch (error) {
        console.error("냉장고 재료 삭제 API 오류:", error);
        throw error;
    }
};