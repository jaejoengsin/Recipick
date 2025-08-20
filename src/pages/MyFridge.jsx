
import "./MyFridge.css";
import "../styles/font.css"


import "../components/common_components/ButtonModules";
import React, { useState } from 'react';



//searchbar import
import SearchBar  from "../components/SearchBar"
import SelectList  from "../components/common_components/ListModule";
import { FridgeAddButton, FridgeEditButton }  from "../components/common_components/ButtonModules";



function AddingBox() {
    return (
        <div className="adding-box">
           <SearchBar></SearchBar>
            <SelectList type="searchInFridge" />
        </div>
    );
    
}



export default function MyFridge() {

    const [isAddingBoxVisible, showFlagStateFunction] = useState(false);
    const [isStateEdit, setEditPossibleFunction] = useState(false);
    const [isDoubleActive, preventDoubleActiveFunction] = useState(false);
   
    
    return (
        <>
            <h2 className="fridge-title" style={{ fontFamily: "'RecipeFont', sans-serif" }}>my fridge</h2>
            {isAddingBoxVisible && <AddingBox />}
        <div className="container pt-5 pb-5">
                <SelectList editOrShow={isStateEdit} type="myFridge" />
        </div>
        <div className="side-floating-btns">
                <FridgeAddButton isDoubleActive={isDoubleActive} preventDoubleActiveFunction={preventDoubleActiveFunction} isAddingBoxVisible={isAddingBoxVisible} showFlagStateFunction={showFlagStateFunction}/>
                <FridgeEditButton isDoubleActive={isDoubleActive} preventDoubleActiveFunction={preventDoubleActiveFunction} isStateEdit={isStateEdit} setEditPossibleFunction={setEditPossibleFunction} />
        </div>
        
        </>
    );
}