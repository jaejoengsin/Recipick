import "../components/common_components/ButtonModules";
import React, { useState, useEffect } from 'react';

//searchbar import
import SearchBar from "../components/SearchBar"
import SelectList from "../components/common_components/ListModule";
import { FridgeAddButton, FridgeEditButton } from "../components/common_components/ButtonModules";


//api
import * as fridgeAPI from "../api/fridgeAPI";
//userid
import useAuthStore from "../store/authStore";

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


    const [isAddingBoxVisible, showFlagStateFunction] = useState(false);
    const [isStateEdit, setEditPossibleFunction] = useState(false);
    const [isDoubleActive, preventDoubleActiveFunction] = useState(false);


    // 1. 서버에서 받아온 재료 목록을 저장할 state를 생성합니다.
    const [ingredients, setIngredients] = useState([]);

    // 2. 컴포넌트가 처음 렌더링될 때 API를 호출하여 데이터를 가져옵니다.
    useEffect(() => {

        const fetchMyFridgeIngredients = async () => {

            try {
            
            // user정보가 없는 경우, 라우터에서 이미 막아주기 때문에 user정보가 없는 경우가 거의 없음
            
            if (user) {
                const userId = user.id;
                console.log(user.id);
                const data = await fridgeAPI.getFridgeIngredients(userId);
                // userId 전달하지 않음
                // 응답 데이터의 content 배열을 state에 저장합니다.
                console.log("냉장고 로드 성공");
                if (data && data.content) {
                    setIngredients(data.content);
                }
            }
            else {
                console.log("냉장고 로드 실패");
            }
        } catch (error) {
            if (error.response) {
                // ✨ 2. 서버가 보낸 에러 메시지(본문)를 콘솔에 출력합니다.
                // "아이디가 중복됩니다." 와 같은 메시지가 여기에 들어있습니다.
                // alert("냉장고 재료 로드 실패: " + error.response.data.message);
                console.error("서버 응답 에러:", error.response.data);
            } else {
                // 서버 응답이 없는 다른 종류의 에러 처리
                // alert("냉장고 재료 로드 실패: " + error.message);
                console.error("API 요청 실패:", error.message);
            }
        }
    };

    fetchMyFridgeIngredients();
}, []); // 의존성 배열을 비워두면 컴포넌트가 처음 마운트될 때 한 번만 실행됩니다.





return (
    <>
        <h2 className="fridge-title" style={{ fontFamily: "'RecipeFont', sans-serif" }}>my fridge</h2>
        {isAddingBoxVisible && <AddingBox />}
        <div className="container pt-5 pb-2">
            <SelectList editOrShow={isStateEdit} type="myFridge" />
          
        </div>
        <div className="side-floating-btns">
            <FridgeAddButton isDoubleActive={isDoubleActive} preventDoubleActiveFunction={preventDoubleActiveFunction} isAddingBoxVisible={isAddingBoxVisible} showFlagStateFunction={showFlagStateFunction} />
            <FridgeEditButton isDoubleActive={isDoubleActive} preventDoubleActiveFunction={preventDoubleActiveFunction} isStateEdit={isStateEdit} setEditPossibleFunction={setEditPossibleFunction} />
        </div>

    </>
);
}



