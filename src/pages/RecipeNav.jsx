



import "../styles/font.css"

import React, { useEffect } from 'react';
import SelectList from '../components/ListmoduleForNav/ListModule';
import SearchBar from '../components/SearchBar';
import { fetchAutocompleteResults } from '../api/searchAPI';
import useAuthStore from '../store/useAuthStore';
import useFridgeStore from '../store/useFridgeStore';
import useBasketStore from '../store/useBasketStore';
import "../styles/font.css";

// SearchEreaInNav: 로컬 상태(검색 결과)와 스토어(장바구니)를 함께 사용
function SearchEreaInNav() {
    const [searchResults, setSearchResults] = React.useState([]);
    const [error, setError] = React.useState(null);

    const handleSearch = async (query) => {
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }
        try {
            const results = await fetchAutocompleteResults(query);
            setSearchResults(results);
            setError(null);
        } catch (err) {
            setError("검색 결과를 불러오는 데 실패했습니다.");
            console.error(err);
        }
    };

    return (
        <div className="d-flex flex-column h-100">
            <div className="flex-grow-0 pt-1">
                <div className='container'>
                    <SearchBar onSearch={handleSearch} />
                </div>
            </div>
            <div className="flex-grow-1" style={{ minHeight: 0 }}>
                <div className='container h-100' style={{ overflowY: 'auto' }}>
                    {error && <p className="text-center text-danger mt-2">{error}</p>}
                    <SelectList type="searchInRecipeNav" searchResults={searchResults} />
                </div>
            </div>
        </div>
    );
}



// FridgeEreaInNav: 스토어(냉장고)의 데이터를 직접 사용
function FridgeEreaInNav() {
    return (
        <div className='fridge-in-nav'>
            <SelectList type="myFridgeInNav" />
        </div>
    );
}

// RecipeNav: 데이터 로딩을 책임지는 메인 컴포넌트
export default function RecipeNav() {
    const { user } = useAuthStore();
    const fetchFridge = useFridgeStore(state => state.fetchIngredients);
    const fetchBasket = useBasketStore(state => state.fetchBasket);

    useEffect(() => {
        if (user?.id) {
            console.log("데이터 로딩 시작. 사용자 ID:", user.id);

            // 👇 아래 fetch 함수들을 하나씩 주석 처리해보며 어떤 함수가 문제인지 확인합니다.
            // fetchFridge(user.id);
            // fetchBasket(user.id);
        }
    }, [user, fetchFridge, fetchBasket]);

    return (
        <div className='container h-100'>
            <div className='row px-3 h-100'>
                <div className='col-6 d-flex flex-column'>
                    <h1 className="pb-1" style={{ fontFamily: "'RecipeFont', sans-serif", fontWeight: 'bold' }}>재료 검색</h1>
                    <div className='flex-grow-1' style={{ minHeight: 0 }}>
                        <SearchEreaInNav />
                    </div>
                </div>
                <div className='col-6 d-flex flex-column'>
                    <h1 className="pb-1" style={{ fontFamily: "'RecipeFont', sans-serif", fontWeight: 'bold' }}>내 냉장고</h1>
                    <div className='flex-grow-1' style={{ minHeight: 0, overflowY: 'auto' }}>
                        <FridgeEreaInNav />
                    </div>
                </div>
            </div>
        </div>
    );
}