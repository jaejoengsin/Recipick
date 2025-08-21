import apiClient from "./apiModule";






//////fridge-controller

export const getFridgeIngredients = async (memberId, pageable) => {
    try {
        const params = {
            memberId,
            ...pageable,
        };

        const response = await apiClient.get('/api/fridge/ingredients', { params });
        return response.data;
    } catch (error) {
        console.error("냉장고 재료 조회 API 오류:", error);
        throw error;
    }
};



export const addFridgeIngredient = async (memberId, pageable) => {
    try {
        const params = {
            memberId,
            ...pageable,
        };

        const response = await apiClient.post('/api/fridge/ingredients', { params });
        return response.data;
    } catch (error) {
        console.error("냉장고 재료 추가 API 오류:", error);
        throw error;
    }
};


export const updateFridgeIngredient = async (updateData, memberId, pageable) => {
    try {
        const params = {
            memberId,
            ...pageable,
        };

        const response = await apiClient.patch('/api/fridge/ingredients', updateData, { params });
        return response.data;
    } catch (error) {
        console.error("냉장고 재료 수정 API 오류:", error);
        throw error;
    }
};


export const deleteFridgeIngredient = async (fridgeIngredientId, memberId, pageable) => {
    try {
        const params = {
            memberId,
            ...pageable,
        };

        await apiClient.delete(`/api/fridge/ingredients/${fridgeIngredientId}`, { params });
    } catch (error) {
        console.error("냉장고 재료 삭제 API 오류:", error);
        throw error;
    }
};



