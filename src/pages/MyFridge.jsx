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





function AddingBox() {
    return (
        <div className="adding-box">
            <SearchBar></SearchBar>
            <SelectList type="searchInFridge" />
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



