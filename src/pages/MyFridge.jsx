
import "./MyFridge.css";
import "../components/common_components/ButtonModules";
import React, { useState } from 'react';



//searchbar import
import SearchBar  from "../components/SearchBar"

import SelectList  from "../components/common_components/ListModule";




function AddingBox() {
    return (
        <div className="adding-box">
           <SearchBar></SearchBar>
            <SelectList type="searchInFridge" />
        </div>
    );
    
}



export default function MyFridge() {

    const [isAddingBoxVisible, setIsAddingBoxVisible] = useState(false);

    const handleToggleAddingBox = () => {
        setIsAddingBoxVisible(nowstate=> !nowstate); // state를 true로 변경하여 AddingBox를 화면에 표시합니다.
    };

    return (
        <>
        <h2 className="fridge-title">my fridge</h2>
            {isAddingBoxVisible && <AddingBox />}
        <div className="container pt-5 pb-5">
                <SelectList type="myFridge" />
        </div>
        <div className="side-floating-btns">
                <button onClick={handleToggleAddingBox}  id="add-button" className="circle-btn">
                <i className="fa-solid fa-plus"></i>
            </button>
            <button id="edit-button" className="circle-btn">
                <i className="fa-solid fa-pen-to-square"></i>
            </button>
        </div>
        </>
    );
}