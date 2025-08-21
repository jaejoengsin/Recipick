import apiClient from "./apiModule";




///////basket-controller
// GET /api/basket/ingredients
// 쿼리: memberId, pageable
export const getBasketIngredients = async (memberId, pageable) => {
    try {
        const params = {
            memberId,
            ...pageable,
        };
        const response = await apiClient.get('/api/basket/ingredients', { params });
        return response.data;
    } catch (error) {
        console.error("장바구니 재료 조회 API 오류:", error);
        throw error;
    }
};

// POST /api/basket/ingredients
// 쿼리: memberId, pageable, ingredientId
export const addBasketIngredient = async (ingredientData, memberId, pageable, ingredientId) => {
    try {
        const params = {
            memberId,
            ingredientId,
            ...pageable,
        };
        const response = await apiClient.post('/api/basket/ingredients', ingredientData, { params });
        return response.data;
    } catch (error) {
        console.error("장바구니 재료 추가 API 오류:", error);
        throw error;
    }
};

// DELETE /api/basket/ingredients/{basketIngredientId}
// 쿼리: memberId, pageable
// path: basketIngredientId
export const deleteBasketIngredient = async (basketIngredientId, memberId, pageable) => {
    try {
        const params = {
            memberId,
            ...pageable,
        };
        await apiClient.delete(`/api/basket/ingredients/${basketIngredientId}`, { params });
    } catch (error) {
        console.error("장바구니 재료 삭제 API 오류:", error);
        throw error;
    }
};

// DELETE /api/basket/ingredients/all
// 쿼리: memberId, pageable
export const deleteAllBasketIngredients = async (memberId, pageable) => {
    try {
        const params = {
            memberId,
            ...pageable,
        };
        await apiClient.delete('/api/basket/ingredients/all', { params });
    } catch (error) {
        console.error("장바구니 재료 전체 삭제 API 오류:", error);
        throw error;
    }
};



////