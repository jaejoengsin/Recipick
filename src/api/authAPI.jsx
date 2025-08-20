import axios from "axios";



const apiClient = axios.create({
    baseURL: "http://172.21.100.198:8080", // 백엔드 주소
    headers: { "Content-Type": "application/json" },
    withCredentials: true,                 // ✅ 쿠키 포함해서 요청/응답
});




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

        const response = await apiClient.post('/api/fridge/ingredients',{ params });
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