import apiClient from "./apiModule"; // 실제 API 통신을 위한 모듈

/**
 * 재료 이름 자동완성 검색 결과를 요청합니다.
 * @param {string} query - 사용자가 입력한 검색어
 * @returns {Promise<Array<{id: number, name: string}>>} 검색 결과 배열
 */
export const fetchAutocompleteResults = async (query) => {
    try {
        const params = {
            q: query,
        };
        // GET 요청: /api/ingredients/autocomplete?q=검색어
        const response = await apiClient.get('/api/ingredients/autocomplete', { params });
        return response.data;
    } catch (error) {
        console.error("자동완성 검색 API 오류:", error);
        throw error; // 오류 발생 시 상위 컴포넌트에서 처리할 수 있도록 throw
    }
};