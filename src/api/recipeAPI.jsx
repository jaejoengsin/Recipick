import apiClient from "./apiModule";




//recipe-controller
/**
 * 1. 레시피 히스토리 조회 API
 * GET /api/recipe/history
 * 사용자의 레시피 조회 기록을 가져옵니다.
 */
export const getRecipeHistory = async (memberId, pageable) => {
    try {
        // pageable 객체가 페이지, 사이즈 등으로 구성되어 있다고 가정 spread로 합쳐서 하나의 prams 객체 생성
        const params = {
            memberId,
            ...pageable
        };

        const response = await apiClient.get('/api/recipe/history', { params });
        return response.data;
    } catch (error) {
        console.error("레시피 히스토리 조회 API 오류:", error);
        throw error;
    }
  };
/**
 * 2. 레시피 히스토리 추가 API
 * POST /api/recipe/history
 * 특정 레시피를 조회 기록에 추가합니다.
 * @param {number} 
 */
export const addRecipeToHistory = async (recipeId, memberId) => {
    try {
        // 보통 어떤 레시피를 추가할지 ID를 함께 보냅니다.
        await apiClient.post('/api/recipe/history', { recipeId: recipeId, memberId: memberId});
    } catch (error) {
        console.error("레시피 히스토리 추가 API 오류:", error);
        throw error;
    }
};

/**
 * 3. 레시피 히스토리 삭제 API
 * DELETE /api/recipe/history
 * 특정 레시피를 조회 기록에서 삭제합니다.
 * @param {number} 
 */
export const deleteRecipeFromHistory = async (historyRecipeId, memberId, pageable) => {
    try {
        await apiClient.delete('/api/recipe/history', {
            data: {
                historyRecipeId,
                memberId,
                ...pageable,
            },
        });
    } catch (error) {
        console.error("레시피 히스토리 삭제 API 오류:", error);
        throw error;
    }
  };


/**
 * 4. 레시피 목록 조회 API
 * GET /api/recipe
 * 특정 조건(예: 재료)에 맞는 레시피 목록을 조회합니다.
 * @param {Array<string>} 
 */
export const getRecipes = async (ingredients, memberId, pageable) => {
    try {
        const params = {
            ingredients: ingredients.join(','),
            memberId,
            ...pageable,
        };

        const response = await apiClient.get('/api/recipe', { params });
        return response.data;
    } catch (error) {
        console.error("레시피 목록 조회 API 오류:", error);
        throw error;
    }
};
/**
 * 5. 레시피 상세 정보 조회 API
 * GET /api/recipe/detail/{recipeId}
 * 특정 레시피의 상세 정보를 조회합니다.
 * @param {number} 
 */
export const getRecipeDetail = async (recipeId, memberId) => {
    try {
        const response = await apiClient.get(`/api/recipe/detail/${recipeId}`, {
            params: { memberId }
        });
        return response.data;
    } catch (error) {
        console.error("레시피 상세 정보 조회 API 오류:", error);
        throw error;
    }
};
  
