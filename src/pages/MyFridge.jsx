
import "./MyFridge.css";

import IngredientList  from "../components/comon_components/ListModule";




export default function MyFridge() {
    return (
        <>
        <h2 className="fridge-title">my fridge</h2>
        <div className="container pt-5 pb-5">
        <IngredientList />
        </div>
        <div className="side-floating-btns">
            <button id="add-button" className="circle-btn">
                <i className="fa-solid fa-plus"></i>
            </button>
            <button id="edit-button" className="circle-btn">
                <i className="fa-solid fa-pen-to-square"></i>
            </button>
        </div>
        </>
    );
}