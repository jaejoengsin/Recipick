import { useState } from "react";


import "../../styles/listmodules.css";

import RefrigeratorIcon from '../../assets/icons/RefrigeratorIcon.png';
import SearchIcon from '../../assets/icons/searchIcon.png';
import AddCartIcon from "../../assets/icons/addCartIcon.png";
import HistoryIcon from "../../assets/icons/HistoryIcon.png";


import Button from "./ButtonModules";
import { useParams } from "react-router-dom";
import { AddIngredientPopUp, ShowRecipeDetailPopUp, SyncFridgePopUp } from "../Popup";



////zustand
import useFridgeStore from '../../store/fridgeStore';





export function MyFridgeList({ editOrShow, ingredients, setIngredients }) {


    const { ingredients, updateIngredient, deleteIngredient, isLoading } = useFridgeStore();
    
    if (isLoading) {
        return <div>냉장고 재료를 불러오는 중...</div>;
    }


    if (!ingredients || ingredients.length === 0) {
        return <div className="text-center p-5">냉장고에 재료가 없습니다.</div>;
    }
    
    return (
        <div className="fridge-list">
            <div className="list-group pt-2 w-75 mx-auto" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                {ingredients.map(ingredient => (
                    // 3. 각 버튼의 onClick 이벤트에 스토어에서 가져온 액션을 직접 연결합니다.
                    editOrShow ? (
                        // 편집 모드
                        <div key={ingredient.fridgeIngredientId} className="list-group-item list-group-item-action">
                            <div className="d-flex w-100 justify-content-between align-items-center">
                                <div>
                                    <h5 className="mb-1">{ingredient.ingredientName}</h5>
                                    <small className="text-muted">{ingredient.storagePeriod} days ago</small>
                                    <br />
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="memo장"
                                        defaultValue={ingredient.memo}
                                        // onBlur 이벤트로 메모 수정 API 호출 가능
                                        onBlur={(e) => updateIngredient(ingredient.fridgeIngredientId, { memo: e.target.value })}
                                    />
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <div className="input-group" style={{ width: '110px' }}>
                                        <button onClick={() => updateIngredient(ingredient.fridgeIngredientId, { count: ingredient.count - 1 })} className="btn btn-outline-secondary" type="button">−</button>
                                        <input type="text" className="form-control text-center" value={ingredient.count} readOnly />
                                        <button onClick={() => updateIngredient(ingredient.fridgeIngredientId, { count: ingredient.count + 1 })} className="btn btn-outline-secondary" type="button">+</button>
                                    </div>
                                    <button onClick={() => deleteIngredient(ingredient.fridgeIngredientId)} className="btn btn-outline-danger" type="button">삭제</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // 보기 모드
                        <div key={ingredient.fridgeIngredientId} className="list-group-item">
                            <div className="d-flex w-100 justify-content-between align-items-center">
                                <div>
                                    <h5 className="mb-1">{ingredient.ingredientName}</h5>
                                    <small className="text-muted">{ingredient.storagePeriod} days ago</small>
                                    <div className="mt-2 text-body-secondary">
                                        {ingredient.memo}
                                    </div>
                                </div>
                                <div>
                                    <span className="badge bg-transparent fs-3 text-dark">{ingredient.count}</span>
                                </div>
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}
// <div className="fridge-list-item">
// </div>


//Edit 창 활성화 시에
// <div class="list-group">
// <a href="#" class="list-group-item list-group-item-action">
//     <div class="d-flex w-100 justify-content-between align-items-center">
//         <div>
//             <h5 class="mb-1">재료명 </h5>
//             <small class="text-muted">3 days ago</small>
//             <br>
//                 <input type="text" class="form-control" placeholder="memo장">
//                 </div>
//                 <div class="d-flex align-items-center gap-2">
//                     <div class="input-group" style="width: 110px;">
//                         <button class="btn btn-outline-secondary btn-decrease" type="button">−</button>
//                         <input type="text" class="form-control text-center qty-value" value="1" readonly>
//                             <button class="btn btn-outline-secondary btn-increase" type="button">+</button>
//                     </div>
//                     <button class="btn btn-outline-danger btn-delete" type="button">삭제</button>
//                 </div>
//         </div>
// </a>
// </div>











//냉장고 메뉴 속 식재료 추가 섬색창(버튼 클릭)
export function SearchListInFridge() {

    const [isShowAddIngredientPopUp, showAddIngredientPopUpFunction] = useState(false);

    const handleShowPopUp = () => {
        if (!isShowAddIngredientPopUp) {
            showAddIngredientPopUpFunction(nowstate => !nowstate);
        }
    };



    return (
        <>
            <div className="search-list-in-fridge">
                <div className="list-group w-75 mx-auto " style={{ minWidth: "300px", maxHeight: "400px", overflowY: 'auto' }}>
                  
                    <button
                        onClick={handleShowPopUp}
                        type="button"
                        className="list-group-item list-group-item-action rounded-3 shadow-sm border-0 my-1"
                    >
                        감
                    </button>
                    <button
                        onClick={handleShowPopUp}
                        type="button"
                        className="list-group-item list-group-item-action rounded-3 shadow-sm border-0 my-1"
                    >
                        감
                    </button>
                    <button
                        onClick={handleShowPopUp}
                        type="button"
                        className="list-group-item list-group-item-action rounded-3 shadow-sm border-0 my-1"
                    >
                        감
                    </button>
                </div>
            </div>
            {isShowAddIngredientPopUp && <AddIngredientPopUp isShowAddIngredientPopUp={isShowAddIngredientPopUp}
                showAddIngredientPopUpFunction={showAddIngredientPopUpFunction} />}
        </>

    );
}



//     <div class="search-result-in-fridge-item">
//     예시 1
//     <span class="checkbox-area"><input type="checkbox" /></span>
// </div>
//     <div class="search-result-in-fridge-item">
//     예시 2
//     <span class="checkbox-area"><input type="checkbox" /></span>
// </div>



//검색창에서 냉장고(체크)
export function SearchListInRecipeNav() {
    return (
        <div className="search-list-in-nav ">
            <ul className="list-group ">
            <li className="list-group-item">
                <input className="form-check-input me-1" type="checkbox" value="" aria-label="..." />
              fsddddddddddddddddd
            </li>
            <li className="list-group-item">
                <input className="form-check-input me-1" type="checkbox" value="" aria-label="..." />
                감귤
            </li>
                <li className="list-group-item">
                    <input className="form-check-input me-1" type="checkbox" value="" aria-label="..." />
                    감자
                </li>
                <li className="list-group-item">
                    <input className="form-check-input me-1" type="checkbox" value="" aria-label="..." />
                    감자
                </li>
            <li className="list-group-item">
                <input className="form-check-input me-1" type="checkbox" value="" aria-label="..." />
                감자
            </li>
            <li className="list-group-item">
                <input className="form-check-input me-1" type="checkbox" value="" aria-label="..." />
                감바스
            </li>
            <li className="list-group-item">
                <input className="form-check-input me-1" type="checkbox" value="" aria-label="..." />
                감스트
            </li>
            <li className="list-group-item">
                <input className="form-check-input me-1" type="checkbox" value="" aria-label="..." />
                감스트
            </li>
            <li className="list-group-item">
                <input className="form-check-input me-1" type="checkbox" value="" aria-label="..." />
                감스트
            </li>
            <li className="list-group-item">
                <input className="form-check-input me-1" type="checkbox" value="" aria-label="..." />
                감스트
            </li>
            <li className="list-group-item">
                <input className="form-check-input me-1" type="checkbox" value="" aria-label="..." />
                감스트
            </li>
            <li className="list-group-item">
                <input className="form-check-input me-1" type="checkbox" value="" aria-label="..." />
                감스트
            </li>
            <li className="list-group-item">
                <input className="form-check-input me-1" type="checkbox" value="" aria-label="..." />
                감스트
            </li>

            <li className="list-group-item">
                <input className="form-check-input me-1" type="checkbox" value="" aria-label="..." />
                감스트
            </li>
            <li className="list-group-item">
                <input className="form-check-input me-1" type="checkbox" value="" aria-label="..." />
                감스트
            </li>

            </ul>

        </div>
    );
}

// <div class="search-list-in-nav-item">
//     예시 1
//     <span class="checkbox-area"><input type="checkbox" /></span>
// </div>
// <div class="search-list-in-nav-item">
//     예시 2
//     <span class="checkbox-area"><input type="checkbox" /></span>
// </div>







export function MyFridgeListInNav() {

    return (
        <ul className="list-group">
            <li className="list-group-item d-flex">
                감
                <input className="form-check-input ms-auto" type="checkbox" value="" aria-label="..." />
            </li>
        </ul>
    );

}
// <div className="fridge-list-in-nav-item">

// </div>



export function RecipeList() {

    const [isShowRecipeDetailPopUp, showRecipeDetailPopUpFunction] = useState(false);
    const [isBookMark, isBookMarkFunction] = useState(false);
    const handleShowPopUp = () => {
        if (!isShowRecipeDetailPopUp) {
            showRecipeDetailPopUpFunction(nowstate => !nowstate);
        }
    };

    const handleBookMark =  () => {
        isBookMarkFunction(nowstate => !nowstate);
    }

    return (
        <>
            <div className="custom-list">
                <div className="card-container">
                    <button onClick={handleShowPopUp} className="card-button-wrapper">
                        <div className="card">
                            <ul className="list-group">
                            <li className=" list-group-item list-group-item-action">
                                    <img src="https://via.placeholder.com/286x160" className="card-img-top" alt="샘플이미지" />
                                    <div className="card-body">
                                        <h5 className="card-title">메뉴명 1</h5>
                                        <p className="card-text">재료 설명 들어가는 부분.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    
                    </button>
                    <button onClick={handleBookMark} className={`bookmark-btn p-4 mx-auto d-block ${isBookMark ? 'active' : ''}`}>
                        <i className={`fa-bookmark ${isBookMark ? 'fa-solid' : 'fa-regular'}`}></i>
                    </button>
                    
                </div>
            </div>
            {isShowRecipeDetailPopUp &&
                <ShowRecipeDetailPopUp isBookMark={isBookMark} isShowRecipeDetailPopUp={isShowRecipeDetailPopUp}
                    showRecipeDetailPopUpFunction={showRecipeDetailPopUpFunction} />
            }
        </>
    );

}
// <div className="recipe-list-item">

// </div>




//아이콘, 삭제 버튼, 체크박스 
export function CartList() {
    return (
        <div className="cart-list">
            <ul className="list-group">
                {/* 장바구니 속 내 냉장고에서 꺼낸 재료들 */}
                <li className="list-group-item d-flex align-items-center">
                    감
                    <span className="ms-auto d-flex align-items-center">
                        <img className="nav-icon align-self-center" src={RefrigeratorIcon} alt="Refrigerator Icon" />
                        <input className="form-check-input ms-auto" type="checkbox" value="" aria-label="..." />
                    </span>
                </li>
                {/* 장바구니 속 서치해서 추가한 재료들 */}
                <li className="list-group-item d-flex align-items-center">
                    감
                    <span className="ms-auto d-flex align-items-center">
                        <img className="nav-icon align-self-center" src={SearchIcon} alt="Search Icon" />
                        <input className="form-check-input ms-auto" type="checkbox" value="" aria-label="..." />
                    </span>
                </li>

            </ul>
        </div>
    );
}

// // 북마크 토글 기능
// document.querySelectorAll('.bookmark-btn').forEach((btn) => {
//   const icon = btn.querySelector('.fa-bookmark');
//   btn.addEventListener('click', (event) => {
//     event.preventDefault();
// btn.classList.toggle('active');
// if (btn.classList.contains('active')) {
//     icon.classList.remove('fa-regular');
// icon.classList.add('fa-solid');
//     } else {
//     icon.classList.remove('fa-solid');
// icon.classList.add('fa-regular');
//     }
//   });
// });













// <div class="cart-list-item">
// 예시 1
// <span class="checkbox-area">
//     <button class="delete-btn" aria-label="삭제">
//         <i class="fa-solid fa-circle-minus"></i>
//     </button>
//     <input type="checkbox" />
// </span>
// </div>
// <div class="cart-list-item">
// 예시 2
// <span class="checkbox-area">
//     <button class="delete-btn" aria-label="삭제">
//         <i class="fa-solid fa-circle-minus"></i>
//     </button>
//     <input type="checkbox"/>
// </span>
// </div>

//param: isShowFridgeSyncPopUp 설명: 리스트 내부 요소에서 동기화 버튼을 클릭하면
//                                  팝업이 뜨도록 설정하기 위해 isShowFridgeSyncPopUp 전달
//

export function HistoryList() {

    const [isShowSyncFridgePopUp, showSyncFridgePopUpFunction] = useState(false);

    const handleShowSyncPopUp = () => {
        console.log("sdfs");
        if (!isShowSyncFridgePopUp) {
            showSyncFridgePopUpFunction(nowstate => !nowstate);
        }
    };
    return (
        <>
        <div className="custom-list">
            <div className="card-container">
                <div className="card">
                    <img src="https://via.placeholder.com/286x160" className="card-img-top" alt="샘플이미지" />
                    <div className="card-body">
                        <h5 className="card-title">메뉴명 1</h5>
                        <p className="card-text">재료 설명 들어가는 부분.</p>
                    </div>
                </div>
                <button className="bookmark-btn">
                    <i className="fa-regular fa-bookmark"></i>
                </button>
                    <button onClick={handleShowSyncPopUp} id="refresh-button" className="circle-btn">
                    <i className="fa-solid fa-arrows-rotate"></i>
                </button>
            </div>
        </div>
            
        {isShowSyncFridgePopUp && <SyncFridgePopUp 
                isShowSyncFridgePopUp={isShowSyncFridgePopUp} showSyncFridgePopUpFunction={showSyncFridgePopUpFunction}/>}
        </>
    );
}




export default function SelectList({ type, editOrShow, isShowSyncFridgePopUp }) {

    // 순서 잘 보기
    const renderList = (type, editOrShow, isShowSyncFridgePopUp) => {
        switch (type) {
            case 'myFridge':
                return <MyFridgeList
                    editOrShow={editOrShow}
                />;
            case 'searchInFridge':
                return <SearchListInFridge />;
            case 'searchInRecipeNav':
                return <SearchListInRecipeNav />;
            case 'myFridgeInNav':
                return  <MyFridgeListInNav />;
            case 'recipe':
                return <RecipeList />;
            case 'cart':
                return <CartList />;
            case 'history':
                return <HistoryList isShowSyncFridgePopUp={isShowSyncFridgePopUp} />;
            default:
                return <div>리스트 타입을 지정해주세요.</div>;
        }
    };

    // 순서 잘 보기
    return <>{renderList(type, editOrShow, isShowSyncFridgePopUp)}</>;

}



