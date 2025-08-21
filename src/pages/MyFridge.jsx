import "../components/common_components/ButtonModules";
import React, { useState, useEffect } from 'react';

//searchbar import
import SearchBar from "../components/SearchBar"
import SelectList from "../components/common_components/ListModule";
import { FridgeAddButton, FridgeEditButton } from "../components/common_components/ButtonModules";


//api

//userid
import useAuthStore from "../store/authStore";
import useFridgeStore from '../store/useFridgeStore';
import "./MyFridge.css";
import "../styles/font.css"

import {fetchAutocompleteResults} from "../api/searchAPI"




export function AddingBox() {
    const [searchResults, setSearchResults] = useState([]);
    // API 호출 중 에러 발생을 대비한 상태 (선택 사항)
    const [error, setError] = useState(null);

    const handleSearch = async (query) => {
        console.log("fsddfsd");
        if (!query.trim()) {
            setSearchResults([]);
            setError(null);
            return;
        }

        try {
            // [수정] API 호출 함수를 fetchAutocompleteResults로 변경합니다.
            const results = await fetchAutocompleteResults(query);
            setSearchResults(results);
            setError(null); // 성공 시 에러 상태 초기화
        } catch (err) {
            // API 호출 실패 시 에러 처리
            setError("데이터를 불러오는 데 실패했습니다.");
            setSearchResults([]); // 기존 목록을 비워줌
            console.error(err); // 콘솔에 에러 기록
        }
    };

    return (
        <div className="adding-box">
            <SearchBar onSearch={handleSearch} />
            {/* 에러가 발생했을 경우 메시지를 표시 */}
            {error && <p className="text-center text-danger mt-2">{error}</p>}
            <SelectList type="searchInFridge" results={searchResults} />
        </div>
    );
}




export default function MyFridge() {

    const { user } = useAuthStore();
    // 1. fridgeStore에서 fetchIngredients 액션을 가져옵니다.
    const fetchIngredients = useFridgeStore(state => state.fetchIngredients);


    useEffect(() => {
        // 2. user 정보가 있으면 스토어의 fetchIngredients 액션을 호출합니다.
        if (user?.id) {
            fetchIngredients(user.id);
        }
    }, [user, fetchIngredients]); // 의존성 배열에 fetchIngredients 추가

    // ... (isAddingBoxVisible 등 UI 상태는 그대로 유지) ...
    const [isAddingBoxVisible, showFlagStateFunction] = useState(false);
    const [isStateEdit, setEditPossibleFunction] = useState(false);
    const [isDoubleActive, preventDoubleActiveFunction] = useState(false);





return (
    <>
        <h2 className="fridge-title" style={{ fontFamily: "'RecipeFont', sans-serif" }}>my fridge</h2>
        {isAddingBoxVisible && <AddingBox />}
        <div className="container pt-5 pb-2">
            <SelectList
                editOrShow={isStateEdit}
                type="myFridge"
            />
        </div>
        <div className="side-floating-btns">
            <FridgeAddButton isDoubleActive={isDoubleActive} preventDoubleActiveFunction={preventDoubleActiveFunction} isAddingBoxVisible={isAddingBoxVisible} showFlagStateFunction={showFlagStateFunction} />
            <FridgeEditButton isDoubleActive={isDoubleActive} preventDoubleActiveFunction={preventDoubleActiveFunction} isStateEdit={isStateEdit} setEditPossibleFunction={setEditPossibleFunction} />
        </div>

    </>
);
}



