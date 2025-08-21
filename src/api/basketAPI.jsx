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
// ResponseBody data, "content"는 카트에 담길 재료, 
// 각 재료는  
//{
//  "basketIngredientId": 0,
//     "ingredientId": 0,
//       "name": "string",
//    "inFridge": true
//                             }
// {
//     "totalPages": 0,
//         "totalElements": 0,
//             "first": true,
//                 "last": true,
//                     "size": 0,
//                         "content": [
//                             {
//                                 "basketIngredientId": 0,
//                                 "ingredientId": 0,
//                                 "name": "string",
//                                 "inFridge": true
//                             }
//                         ],
//                             "number": 0,
//                                 "sort": [
//                                     {
//                                         "direction": "string",
//                                         "nullHandling": "string",
//                                         "ascending": true,
//                                         "property": "string",
//                                         "ignoreCase": true
//                                     }
//                                 ],
//                                     "numberOfElements": 0,
//                                         "pageable": {
//         "offset": 0,
//             "sort": [
//                 {
//                     "direction": "string",
//                     "nullHandling": "string",
//                     "ascending": true,
//                     "property": "string",
//                     "ignoreCase": true
//                 }
//             ],
//                 "unpaged": true,
//                     "paged": true,
//                         "pageSize": 0,
//                             "pageNumber": 0
//     },
//     "empty": true
//   }
export const addBasketIngredient = async (memberId, pageable, ingredientId) => {
    try {
        const params = {
            memberId,
            ingredientId,
            ...pageable,
        };
        // POST 요청 시 Body가 필요 없으므로 두 번째 인자로 null 또는 빈 객체({})를 전달합니다.
        const response = await apiClient.post('/api/basket/ingredients', null, { params });
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