import apiClient from "./apiModule";


/**
 * 재료 이름 자동완성 검색 결과를 요청합니다.
 * @param {string} query - 사용자가 입력한 검색어
 * @returns {Promise<Array<{id: number, name: string}>>} 검색 결과 배열
 */
export const fetchAutocompleteResults = async (query) => {
    try {
        const params = {
            q: query,
            // size는 기본값이 10이므로 따로 보내지 않습니다.
        };
        const response = await apiClient.get('/api/ingredients/autocomplete', { params });
        return response.data;
    } catch (error) {
        console.error("자동완성 검색 API 오류:", error);
        throw error;
    }
};




